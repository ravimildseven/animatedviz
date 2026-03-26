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
  function loadDataScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url + "?v=" + Date.now();
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${url}`));
      document.head.appendChild(script); // Use document.head as in original loadTopicData
    });
  }

  async function loadTopicData(topic) {
    if (topic.loaded) {
      return window[topic.dataVar];
    }
    try {
      await loadDataScript(topic.dataFile);
      topic.loaded = true;
      return window[topic.dataVar];
    } catch (e) {
      throw new Error(`Failed to load topic data for ${topic.id}: ${e.message}`);
    }
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

  const wikiImageCache = {};

  async function getWikipediaImageUrl(name) {
    if (wikiImageCache[name] !== undefined) return wikiImageCache[name];
    try {
      // Use Wikipedia's robust summary API to extract official thumbnails securely
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`);
      const data = await res.json();
      if (data.thumbnail && data.thumbnail.source) {
         wikiImageCache[name] = data.thumbnail.source;
         return data.thumbnail.source;
      }
    } catch(e) { console.warn("Wiki fetch failed for", name); }
    wikiImageCache[name] = null;
    return null;
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

    // Extract dynamic images for side-by-side perspective stack
    let topItems = [];
    if (state.topicData.vizType === "ranking" && frame.items) {
      let maxImages = 1;
      // For topics like Economics, Space, etc., a stack is visually richer
      const stackTopics = ['space-missions', 'olympic-medals', 'global-gdp', 'world-population', 'spoken-languages'];
      if (stackTopics.includes(state.topicData.id)) {
         maxImages = 3;
      }
      topItems = frame.items.slice(0, maxImages);
      
    } else if (state.topicData.id === "world-cup") {
      // Map visualizations don't have .items, so we explicitly map the top stats!
      topItems = [
         { name: frame.winner, imageUrl: "" },
         { name: frame.runnerUp, imageUrl: "" }
      ];
      
    } else if (state.topicData.vizType === "timeline") {
      topItems = [{ 
        // Use wikiSearchName for precise lookup, then actual name, then year as fallback
        name: frame.wikiSearchName || frame.name || frame.label || String(frame.year),
        imageUrl: frame.imageUrl || "",
        displayName: frame.name || frame.label || String(frame.year)
      }];
    }
    
    const body = document.body;
    if (body) { body.style.backgroundImage = "none"; }
    
    // Display dynamic images in the side panel
    const imgDisplay = document.getElementById("viz-image-display");
    if (imgDisplay) {
      const inner = imgDisplay.querySelector(".viz-image-inner");
      
      // We only want to rebuild the multi-image DOM if the top items actually CHANGED.
      // This totally prevents 60fps rendering jitter and eliminates abusive network API calls.
      const cacheSignature = topItems.map(i => i.name).join("|");
      
      if (inner.dataset.currentSignature !== cacheSignature) {
         inner.dataset.currentSignature = cacheSignature;
         inner.innerHTML = "";
         inner.className = topItems.length > 1 ? "viz-image-inner is-stack" : "viz-image-inner";
         
         topItems.forEach((item, idx) => {
           const wrapper = document.createElement("div");
           wrapper.className = topItems.length > 1 ? "stack-card" : "single-card";
           
           const placeholder = document.createElement("div");
           placeholder.className = "img-placeholder";
           placeholder.textContent = item.displayName
             ? item.displayName.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
             : (item.name ? item.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() : '??');
           
           const img = document.createElement("img");
           img.className = "dynamic-img";
           // Critical: must be block-level + fill the card before transition
           img.style.cssText = 'display:block; position:absolute; inset:0; width:100%; height:100%; object-fit:contain; opacity:0; transition:opacity 0.4s ease; border-radius:inherit;';
           
           const label = document.createElement("div");
           label.className = "stack-label";
           label.textContent = topItems.length > 1
             ? `#${idx+1} ${item.displayName || item.name}`
             : (item.displayName || item.name);
           
           wrapper.appendChild(placeholder);
           wrapper.appendChild(img);
           wrapper.appendChild(label);
           inner.appendChild(wrapper);
           
           // Fetch and Fade Logic
           const revealImg = (url) => {
              img.src = url;
              img.onload = () => {
                img.style.opacity = '1';
                placeholder.style.display = 'none';
              };
              img.onerror = () => { /* Keep placeholder visible on error */ };
           };

           if (item.imageUrl) {
              revealImg(item.imageUrl);
           } else if (item.name) {
              getWikipediaImageUrl(item.name).then(wikiUrl => {
                 if (inner.dataset.currentSignature !== cacheSignature) return;
                 if (wikiUrl) revealImg(wikiUrl);
              });
           }
         });
      }
    }
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
        <div class="sb-portrait" style="background:${frame.color}; ${frame.imageUrl ? `background-image: url('${frame.imageUrl}'); background-size: cover; background-position: center top; text-indent: -9999px; overflow: hidden;` : ''}">${frame.initials || ""}</div>
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
        <div class="sb-portrait" style="background:${leader.color || "var(--color-primary)"};font-size:14px; ${leader.imageUrl ? `background-image: url('${leader.imageUrl}'); background-size: cover; background-position: center top; text-indent: -9999px; overflow: hidden;` : ''}">
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

    // Mobile bottom sheet sidebar toggle
    const sidebarHandle = document.getElementById("sidebar-handle");
    const sidebar = document.getElementById("sidebar");
    if (sidebarHandle && sidebar) {
      sidebarHandle.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
          sidebar.classList.toggle("expanded");
        }
      });
    }
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

  // ===== VIDEO EXPORT =====
  function setupExportVideo() {
    const exportBtn = document.getElementById("export-video-btn");
    if (!exportBtn) return;

    exportBtn.addEventListener("click", async () => {
      if (!state.topicData) return;

      try {
        exportBtn.disabled = true;
        exportBtn.innerHTML = '<div class="loading-spinner" style="width:14px;height:14px;border-width:2px;border-top-color:#fff;"></div> Rendering...';

        const mainLayout = document.querySelector(".main-layout");
        const canvas = document.createElement("canvas");
        canvas.width = mainLayout.offsetWidth || 1280;
        canvas.height = mainLayout.offsetHeight || 720;
        const ctx = canvas.getContext("2d");
        
        // Use hidden captureStream directly without prompting user
        const stream = canvas.captureStream(30);
        // Attempt MP4 encoding if browser supports it, otherwise WebM
        let mime = 'video/mp4; codecs=avc1';
        let ext = 'mp4';
        if (!MediaRecorder.isTypeSupported(mime)) {
           mime = 'video/webm; codecs=vp9';
           ext = 'webm';
        }
        const recorder = new MediaRecorder(stream, { mimeType: mime });
        const chunks = [];

        recorder.ondataavailable = e => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: mime.split(';')[0] });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = `animated_history_${state.topicData.id}.${ext}`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 100);
          stream.getTracks().forEach(track => track.stop());
          
          exportBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Export Video';
          exportBtn.disabled = false;
        };

        recorder.start();

        if (state.isPlaying) stopPlay();
        state.frameIndex = 0;
        renderFrame(0);
        
        // Let it render first frame before playing
        setTimeout(() => {
          togglePlay();

          let isCapturing = true;
          const captureLoop = async () => {
             // Loop asynchronously, yielding to the main thread so D3 transitions process, 
             // and html2canvas doesn't freeze the browser totally
             while (isCapturing && (state.isPlaying || state.frameIndex < state.topicData.frames.length - 1)) {
                try {
                   // Background color set specifically for glassmorphism layout
                   const tempC = await html2canvas(mainLayout, { scale: 1, useCORS: true, backgroundColor: "#0f172a" });
                   ctx.clearRect(0, 0, canvas.width, canvas.height);
                   ctx.drawImage(tempC, 0, 0, canvas.width, canvas.height);
                } catch(e) { console.error("Canvas snap failed", e); }
                
                // Yield thread to let the next frame of the animation step forward
                await new Promise(r => setTimeout(r, 60));
             }
             
             // Stop recorder gracefully
             if (recorder.state === "recording") recorder.stop();
             isCapturing = false;
          };
          
          captureLoop();

        }, 500);

      } catch (err) {
        console.error("Video export cancelled or failed:", err);
        exportBtn.innerHTML = 'Export Failed';
        exportBtn.disabled = false;
      }
    });
  }

  // ===== INIT =====
  function init() {
    buildTopicSelector();
    setupControls();
    setupThemeToggle();
    setupExportVideo();

    // Check URL hash for initial topic
    const hash = window.location.hash.slice(1);
    const initialTopic = TOPIC_CONFIG.find(t => t.id === hash) || TOPIC_CONFIG[0];
    selectTopic(initialTopic.id);
  }

  init();
})();
