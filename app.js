/* ===== ANIMATED HISTORY — App Orchestrator ===== */
/* global TOPIC_CONFIG, rankingViz, mapViz, timelineViz, d3 */

(function () {
  "use strict";

  // ===== APP STATE =====
  const state = {
    topicId: null,
    topicData: null,
    frameIndex: 0,
    isPlaying: false,
    playInterval: null,
    playSpeed: 1500,    // ms per frame
    speedMultiplier: 1, // 1 or 2
    currentViz: null    // { renderFrame, destroy }
  };

  // ===== TOPIC SELECTOR =====
  function buildTopicSelector() {
    const nav = document.getElementById("topic-nav");
    const sel = document.getElementById("topic-select-mobile");
    nav.innerHTML = "";
    sel.innerHTML = "";

    TOPIC_CONFIG.forEach(topic => {
      // Desktop pill
      const pill = document.createElement("button");
      pill.className = "topic-pill";
      pill.dataset.id = topic.id;
      pill.innerHTML = `<span class="topic-pill-icon">${topic.icon}</span><span class="topic-pill-label">${topic.title}</span>`;
      pill.addEventListener("click", () => selectTopic(topic.id));
      nav.appendChild(pill);

      // Mobile dropdown option
      const opt = document.createElement("option");
      opt.value = topic.id;
      opt.textContent = `${topic.icon} ${topic.title}`;
      sel.appendChild(opt);
    });

    sel.addEventListener("change", () => selectTopic(sel.value));
  }

  function setActiveTopic(id) {
    document.querySelectorAll(".topic-pill").forEach(p => {
      p.classList.toggle("active", p.dataset.id === id);
    });
    const sel = document.getElementById("topic-select-mobile");
    if (sel) sel.value = id;
  }

  // ===== LAZY DATA LOADING =====
  function loadTopicData(topic) {
    return new Promise((resolve, reject) => {
      if (topic.loaded) {
        resolve(window[topic.dataVar]);
        return;
      }
      const script = document.createElement("script");
      script.src = topic.dataFile;
      script.onload = () => {
        topic.loaded = true;
        resolve(window[topic.dataVar]);
      };
      script.onerror = () => reject(new Error(`Failed to load ${topic.dataFile}`));
      document.head.appendChild(script);
    });
  }

  // ===== TOPIC SELECTION =====
  async function selectTopic(topicId) {
    if (state.topicId === topicId && state.currentViz) return;

    stopPlay();
    const topic = TOPIC_CONFIG.find(t => t.id === topicId);
    if (!topic) return;

    showLoading(true);
    setActiveTopic(topicId);

    // Destroy previous viz
    if (state.currentViz) {
      state.currentViz.destroy();
      state.currentViz = null;
    }

    // Clear viz container (leave tooltip)
    const container = document.getElementById("viz-container");
    const tooltip = document.getElementById("tooltip");
    const loading = document.getElementById("viz-loading");
    // Remove everything except the tooltip and loading indicator
    Array.from(container.children).forEach(child => {
      if (child !== tooltip && child !== loading) child.remove();
    });

    // Load data
    let data;
    try {
      data = await loadTopicData(topic);
    } catch (e) {
      showLoading(false);
      console.error("Failed to load topic data:", e);
      return;
    }

    state.topicId = topicId;
    state.topicData = data;
    state.frameIndex = 0;

    // Track current frame index on the data object (for tooltip access in map-viz)
    data._currentIndex = 0;

    // Update slider
    const slider = document.getElementById("frame-slider");
    slider.max = data.frames.length - 1;
    slider.value = 0;

    // Initialize correct viz module
    const vizMap = {
      "ranking":   rankingViz,
      "world-map": mapViz,
      "us-map":    mapViz,
      "timeline":  timelineViz
    };
    const vizMod = vizMap[topic.vizType];
    if (!vizMod) { showLoading(false); return; }

    const opts = { mapType: topic.vizType };
    if (topic.vizType === "timeline") {
      opts.onFrameChange = (i) => {
        state.frameIndex = i;
        renderFrame(i);
        document.getElementById("frame-slider").value = i;
      };
    }

    await vizMod.init(data, container, opts);
    state.currentViz = vizMod;

    showLoading(false);
    renderFrame(0);
    updateSidebar();

    // Hash update for bookmarkability
    try { history.replaceState(null, "", `#${topicId}`); } catch(e) { /* ignore */ }
  }

  // ===== FRAME NAVIGATION =====
  function renderFrame(index) {
    state.frameIndex = index;
    if (state.topicData) state.topicData._currentIndex = index;

    const slider = document.getElementById("frame-slider");
    slider.value = index;

    const frame = state.topicData && state.topicData.frames[index];
    if (frame) {
      document.getElementById("current-year").textContent = frame.label || frame.year;
    }

    if (state.currentViz) state.currentViz.renderFrame(index);
    updateSidebar();
  }

  // ===== SIDEBAR =====
  function updateSidebar() {
    if (!state.topicData) return;
    const frame = state.topicData.frames[state.frameIndex];
    if (!frame) return;

    const topic = TOPIC_CONFIG.find(t => t.id === state.topicId);
    if (!topic) return;

    const el = document.getElementById("sidebar-content");

    if (topic.vizType === "timeline") {
      renderTimelineSidebar(el, frame, state.frameIndex);
    } else if (topic.vizType === "ranking") {
      renderRankingSidebar(el, frame, state.topicData);
    } else if (topic.vizType === "world-map" || topic.vizType === "us-map") {
      renderMapSidebar(el, frame, state.topicData, state.frameIndex);
    }
  }

  function renderTimelineSidebar(el, frame, index) {
    const totalFrames = state.topicData.frames.length;
    el.innerHTML = `
      <div class="sidebar-section">
        <div class="sb-portrait" style="background:${frame.color}">${frame.initials || ""}</div>
        <h2 class="sb-name">${escHtml(frame.name)}</h2>
        <p class="sb-subtitle">${escHtml(frame.title || "")}</p>
        <p class="sb-label">${escHtml(frame.displayYear || String(frame.year))}</p>
      </div>
      ${frame.partyShort ? `
      <div class="sidebar-section">
        <p class="section-title">Party</p>
        <div class="stat-row">
          <span class="stat-label">${escHtml(frame.party || "")}</span>
          <span class="stat-value" style="color:${frame.color}">${escHtml(frame.partyShort)}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Duration</span>
          <span class="stat-value">${escHtml(frame.termDuration || "")}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">In office</span>
          <span class="stat-value">${frame.startYear}–${frame.endYear}</span>
        </div>
      </div>
      ` : ""}
      ${frame.keyEvents && frame.keyEvents.length ? `
      <div class="sidebar-section">
        <p class="section-title">Key Events</p>
        <ul class="sb-events">
          ${frame.keyEvents.map(e => `<li>${escHtml(e)}</li>`).join("")}
        </ul>
      </div>
      ` : ""}
      ${frame.fact ? `
      <div class="sidebar-section">
        <p class="section-title">Did you know?</p>
        <div class="sb-fact">${escHtml(frame.fact)}</div>
      </div>
      ` : ""}
      <div class="sidebar-section">
        <div class="stat-row">
          <span class="stat-label">PM number</span>
          <span class="stat-value">${index + 1} of ${totalFrames}</span>
        </div>
      </div>
    `;
  }

  function renderRankingSidebar(el, frame, data) {
    const leader = frame.items[0];
    if (!leader) return;

    const rows = frame.items.slice(0, 5).map(item => `
      <div class="stat-row">
        <span class="stat-label" style="display:flex;align-items:center;gap:6px;">
          <span style="font-variant-numeric:tabular-nums;color:var(--color-text-faint);min-width:18px">#${item.rank}</span>
          ${escHtml(item.name)}
        </span>
        <span class="stat-value">${formatSidebarValue(item.value, data.valueLabel)}</span>
      </div>
    `).join("");

    el.innerHTML = `
      <div class="sidebar-section">
        <p class="section-title">🥇 Leading</p>
        <div class="sb-portrait" style="background:${leader.color || "var(--color-primary)"};font-size:14px">
          ${leader.name.split(" ").slice(0, 1).join("").slice(0, 4)}
        </div>
        <h2 class="sb-name">${escHtml(leader.name)}</h2>
        <p class="sb-subtitle">${escHtml(leader.sublabel || "")}</p>
        <p class="sb-label">${data.valueLabel}: ${formatSidebarValue(leader.value, data.valueLabel)}</p>
      </div>
      ${leader.note ? `
      <div class="sidebar-section">
        <div class="sb-fact">${escHtml(leader.note)}</div>
      </div>
      ` : ""}
      <div class="sidebar-section">
        <p class="section-title">Rankings</p>
        ${rows}
      </div>
      ${data.note ? `
      <div class="sidebar-section">
        <p class="sb-bio">${escHtml(data.note)}</p>
      </div>
      ` : ""}
    `;
  }

  function renderMapSidebar(el, frame, data, frameIndex) {
    let mainContent = "";
    let statsContent = "";

    if (data.id === "world-cup") {
      const wins = frame.cumulativeWins || {};
      const sorted = Object.entries(wins).sort((a, b) => b[1] - a[1]).slice(0, 5);
      mainContent = `
        <div class="sb-portrait" style="background:#c0392b;font-size:14px">⚽</div>
        <h2 class="sb-name">${escHtml(frame.winner)}</h2>
        <p class="sb-subtitle">${escHtml(frame.final)}</p>
        <p class="sb-label">Runner-up: ${escHtml(frame.runnerUp)}</p>
      `;
      statsContent = `
        <div class="sidebar-section">
          <p class="section-title">All-time leaders</p>
          ${sorted.map(([iso, w]) => `
            <div class="stat-row">
              <span class="stat-label">${iso}</span>
              <span class="stat-value">${w} title${w > 1 ? "s" : ""}</span>
            </div>
          `).join("")}
        </div>
        <div class="sidebar-section">
          <div class="stat-row"><span class="stat-label">Teams</span><span class="stat-value">${frame.teams || "—"}</span></div>
        </div>
      `;

    } else if (data.id === "space-missions") {
      const countries = Object.keys(frame.countries || {});
      mainContent = `
        <div class="sb-portrait" style="background:#6c3483;font-size:24px">🚀</div>
        <h2 class="sb-name">${countries.length} nations</h2>
        <p class="sb-subtitle">have space programs</p>
        <p class="sb-label">${escHtml(frame.milestone || "")}</p>
      `;
      statsContent = `
        ${frame.note ? `<div class="sidebar-section"><div class="sb-fact">${escHtml(frame.note)}</div></div>` : ""}
        <div class="sidebar-section">
          <p class="section-title">Active programs</p>
          ${countries.map(iso => {
            const info = frame.countries[iso];
            return `<div class="stat-row">
              <span class="stat-label" style="display:flex;align-items:center;gap:5px;">
                <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${info.color || "#888"}"></span>
                ${iso}
              </span>
              <span class="stat-value" style="font-size:10px;color:var(--color-text-faint)">${escHtml(info.tier)}</span>
            </div>`;
          }).join("")}
        </div>
      `;

    } else if (data.id === "nobel-prizes") {
      const ctries = Object.entries(frame.countries || {}).sort((a, b) => b[1].count - a[1].count).slice(0, 5);
      mainContent = `
        <div class="sb-portrait" style="background:#b7950b;font-size:24px">🏅</div>
        <h2 class="sb-name">Nobel Prizes</h2>
        <p class="sb-subtitle">by country through ${frame.year}</p>
        <p class="sb-label">${escHtml(frame.note || "")}</p>
      `;
      statsContent = `
        <div class="sidebar-section">
          <p class="section-title">Top countries</p>
          ${ctries.map(([iso, info]) => `
            <div class="stat-row">
              <span class="stat-label">${iso}</span>
              <span class="stat-value">${info.count} prizes</span>
            </div>
          `).join("")}
        </div>
      `;

    } else if (data.id === "us-population") {
      const states = frame.states || {};
      const sorted = Object.entries(states).sort((a, b) => a[1].rank - b[1].rank).slice(0, 5);
      mainContent = `
        <div class="sb-portrait" style="background:#1a5276;font-size:24px">🗺️</div>
        <h2 class="sb-name">US Census</h2>
        <p class="sb-subtitle">${frame.label}</p>
        <p class="sb-label">Total: ${(frame.totalPopulation / 1e6).toFixed(1)}M people</p>
      `;
      statsContent = `
        <div class="sidebar-section">
          <p class="section-title">Most populous states</p>
          ${sorted.map(([abbr, s]) => `
            <div class="stat-row">
              <span class="stat-label">${abbr}</span>
              <span class="stat-value">${s.population >= 1e6 ? (s.population / 1e6).toFixed(1) + "M" : s.population.toLocaleString()}</span>
            </div>
          `).join("")}
        </div>
      `;
    }

    el.innerHTML = `<div class="sidebar-section">${mainContent}</div>${statsContent}`;
  }

  function formatSidebarValue(val, label) {
    if (!label) return val;
    if (label.includes("Trillion") || label.includes("GDP")) {
      return val >= 1 ? `$${val.toFixed(1)}T` : `$${(val * 1000).toFixed(0)}B`;
    }
    if (label.includes("m)") || label.includes("Height")) return `${val}m`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}B`;
    return val.toLocaleString();
  }

  function escHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // ===== PLAY / PAUSE =====
  function togglePlay() {
    state.isPlaying = !state.isPlaying;
    const playBtn = document.getElementById("play-btn");

    if (state.isPlaying) {
      playBtn.classList.add("playing");
      playBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg><span class="btn-text">Pause</span>';

      if (!state.topicData) { stopPlay(); return; }
      if (state.frameIndex >= state.topicData.frames.length - 1) {
        state.frameIndex = 0;
      }

      const interval = Math.round(state.playSpeed / state.speedMultiplier);
      state.playInterval = setInterval(() => {
        if (!state.topicData) { stopPlay(); return; }
        if (state.frameIndex < state.topicData.frames.length - 1) {
          renderFrame(state.frameIndex + 1);
        } else {
          stopPlay();
        }
      }, interval);

    } else {
      stopPlay();
    }
  }

  function stopPlay() {
    state.isPlaying = false;
    clearInterval(state.playInterval);
    state.playInterval = null;
    const playBtn = document.getElementById("play-btn");
    if (playBtn) {
      playBtn.classList.remove("playing");
      playBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg><span class="btn-text">Play</span>';
    }
  }

  // ===== CONTROLS SETUP =====
  function setupControls() {
    const slider = document.getElementById("frame-slider");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const playBtn = document.getElementById("play-btn");
    const speedBtn = document.getElementById("speed-btn");

    slider.addEventListener("input", function () {
      const idx = parseInt(this.value);
      if (state.isPlaying) stopPlay();
      renderFrame(idx);
    });

    prevBtn.addEventListener("click", () => {
      if (state.frameIndex > 0) {
        if (state.isPlaying) stopPlay();
        renderFrame(state.frameIndex - 1);
      }
    });

    nextBtn.addEventListener("click", () => {
      if (!state.topicData) return;
      if (state.frameIndex < state.topicData.frames.length - 1) {
        if (state.isPlaying) stopPlay();
        renderFrame(state.frameIndex + 1);
      }
    });

    playBtn.addEventListener("click", togglePlay);

    speedBtn.addEventListener("click", () => {
      state.speedMultiplier = state.speedMultiplier === 1 ? 2 : 1;
      speedBtn.querySelector(".btn-text").textContent = state.speedMultiplier + "×";
      if (state.isPlaying) {
        stopPlay();
        togglePlay();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (state.frameIndex > 0) renderFrame(state.frameIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (state.topicData && state.frameIndex < state.topicData.frames.length - 1) {
          renderFrame(state.frameIndex + 1);
        }
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    });
  }

  // ===== THEME TOGGLE =====
  function setupThemeToggle() {
    const toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;
    const root = document.documentElement;
    let currentTheme = root.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    root.setAttribute("data-theme", currentTheme);
    updateToggleIcon(toggle, currentTheme);

    toggle.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", currentTheme);
      updateToggleIcon(toggle, currentTheme);
    });
  }

  function updateToggleIcon(btn, theme) {
    btn.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " mode");
    btn.innerHTML = theme === "dark"
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  // ===== LOADING STATE =====
  function showLoading(show) {
    const el = document.getElementById("viz-loading");
    if (el) el.classList.toggle("hidden", !show);
  }

  // ===== INIT =====
  function init() {
    buildTopicSelector();
    setupControls();
    setupThemeToggle();

    // Check URL hash for initial topic
    const hash = window.location.hash.slice(1);
    const initialTopic = TOPIC_CONFIG.find(t => t.id === hash) || TOPIC_CONFIG[0];
    selectTopic(initialTopic.id);
  }

  init();
})();
