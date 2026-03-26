/* ===== TIMELINE VISUALIZATION MODULE ===== */
/* Sequential portrait + info panel for leader/event timelines */
/* global timelineViz */

const timelineViz = (function () {
  "use strict";

  let topicData = null;
  let containerEl = null;
  let mainEl = null;
  let stripEl = null;
  let onFrameChange = null; // callback to notify app of strip clicks

  function init(data, container, opts) {
    topicData = data;
    containerEl = container;
    onFrameChange = opts && opts.onFrameChange;

    // Clear container and build structure
    containerEl.innerHTML = `
      <div class="timeline-wrapper">
        <div class="timeline-main" id="timeline-main"></div>
        <div class="timeline-strip" id="timeline-strip"></div>
      </div>
    `;

    mainEl = containerEl.querySelector("#timeline-main");
    stripEl = containerEl.querySelector("#timeline-strip");

    buildStrip();
    return Promise.resolve();
  }

  function buildStrip() {
    if (!stripEl || !topicData) return;
    stripEl.innerHTML = "";

    topicData.frames.forEach((frame, i) => {
      const item = document.createElement("button");
      item.className = "strip-item";
      item.dataset.index = i;
      item.innerHTML = `
        <span class="strip-dot" style="background:${frame.color}"></span>
        <span>${frame.name.split(" ").slice(-1)[0]}</span>
      `;
      item.addEventListener("click", () => {
        if (onFrameChange) onFrameChange(i);
      });
      stripEl.appendChild(item);
    });
  }

  function renderFrame(frameIndex) {
    if (!topicData || !mainEl) return;
    const frame = topicData.frames[frameIndex];
    if (!frame) return;

    // Update strip active state
    stripEl.querySelectorAll(".strip-item").forEach((el, i) => {
      el.classList.toggle("active", i === frameIndex);
    });

    // Scroll strip to active item
    const activeItem = stripEl.querySelector(".strip-item.active");
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }

    // Build main card
    mainEl.innerHTML = `
      <div class="timeline-card" role="article">
        <div class="card-avatar" style="background:${frame.color}">
          ${frame.initials || frame.name.split(" ").map(n => n[0]).join("").slice(0, 3)}
        </div>
        <h2 class="card-name">${escHtml(frame.name)}</h2>
        <p class="card-title">${escHtml(frame.title || "")}</p>
        ${frame.partyShort ? `
          <div class="card-party-badge" style="background:${frame.color}">
            ${escHtml(frame.partyShort)} · ${escHtml(frame.party || "")}
          </div>
        ` : ""}
        <p class="card-term">${escHtml(frame.displayYear || String(frame.year))}</p>
        ${frame.bio ? `<p class="card-bio">${escHtml(frame.bio)}</p>` : ""}
      </div>
    `;
  }

  function escHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;");
  }

  function destroy() {
    topicData = null;
    containerEl = null;
    mainEl = null;
    stripEl = null;
    onFrameChange = null;
  }

  return { init, renderFrame, destroy };
})();
