/* ===== RANKING VISUALIZATION MODULE ===== */
/* Animated bar chart race for ranking-type topics */
/* global rankingViz, d3 */

const rankingViz = (function () {
  "use strict";

  let svg, g;
  let topicData = null;
  let containerEl = null;
  let width = 0, height = 0;
  let xScale, maxValue;
  const MARGIN = { top: 16, right: 90, bottom: 36, left: 160 };
  const BAR_HEIGHT = 32;
  const BAR_GAP = 8;
  const MAX_ITEMS = 10;

  function init(data, container) {
    topicData = data;
    containerEl = container;

    // Compute global max value across all frames for stable x-axis
    maxValue = 0;
    data.frames.forEach(f => {
      f.items.forEach(item => {
        if (item.value > maxValue) maxValue = item.value;
      });
    });

    // Create SVG
    const el = containerEl.querySelector(".ranking-svg");
    if (el) el.remove();

    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.classList.add("ranking-svg");
    containerEl.appendChild(svgEl);

    svg = d3.select(svgEl);
    g = svg.append("g").attr("class", "ranking-g");

    // Add axis label
    g.append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .attr("fill", "var(--color-text-faint)");

    resize();
    return Promise.resolve();
  }

  function resize() {
    if (!containerEl || !svg) return;
    const rect = containerEl.getBoundingClientRect();
    width = rect.width || 700;
    height = rect.height || 480;

    svg.attr("width", width).attr("height", height);

    const innerW = width - MARGIN.left - MARGIN.right;
    const innerH = height - MARGIN.top - MARGIN.bottom;
    const maxItems = Math.min(MAX_ITEMS, Math.floor(innerH / (BAR_HEIGHT + BAR_GAP)));

    xScale = d3.scaleLinear()
      .domain([0, maxValue * 1.08])
      .range([0, innerW]);

    g.attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

    // Update axis label position
    g.select(".axis-label")
      .attr("x", innerW / 2)
      .attr("y", innerH + 28)
      .text(topicData ? topicData.valueLabel : "");
  }

  function renderFrame(frameIndex) {
    if (!topicData || !svg) return;

    const frame = topicData.frames[frameIndex];
    if (!frame) return;

    resize();
    const innerW = width - MARGIN.left - MARGIN.right;
    const innerH = height - MARGIN.top - MARGIN.bottom;
    const items = frame.items.slice(0, MAX_ITEMS);
    const totalSlots = items.length;
    const slotH = Math.min(BAR_HEIGHT + BAR_GAP, innerH / totalSlots);
    const barH = slotH - BAR_GAP;

    // ===== DATA JOIN (keyed by name for smooth rank transitions) =====
    const bars = g.selectAll(".rank-row")
      .data(items, d => d.name);

    // ENTER
    const entered = bars.enter()
      .append("g")
      .attr("class", "rank-row")
      .attr("transform", d => `translate(0, ${(d.rank - 1) * slotH})`);

    entered.append("rect")
      .attr("class", "rank-bar")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", barH)
      .attr("rx", 3)
      .attr("width", 0)
      .attr("fill", d => d.color || "var(--color-primary)");

    // Rank number (left of bar, inside left margin)
    entered.append("text")
      .attr("class", "rank-number")
      .attr("x", -8)
      .attr("y", barH / 2)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle");

    // Item name label
    entered.append("text")
      .attr("class", "rank-label")
      .attr("x", -32)
      .attr("y", barH / 2 - (topicData.itemLabel === "Building" ? 6 : 0))
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle");

    // Sublabel (below name)
    entered.append("text")
      .attr("class", "rank-sublabel")
      .attr("x", -32)
      .attr("y", barH / 2 + 10)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle");

    // Value label (right of bar)
    entered.append("text")
      .attr("class", "rank-value")
      .attr("y", barH / 2)
      .attr("dominant-baseline", "middle");

    // UPDATE + ENTER merged
    const all = entered.merge(bars);

    // Interrupt any ongoing transitions before starting new ones
    all.interrupt();

    // Y position transition (rank change)
    all.transition()
      .duration(500)
      .ease(d3.easeQuadOut)
      .attr("transform", d => `translate(0, ${(d.rank - 1) * slotH})`);

    // Bar width + color transition
    all.select(".rank-bar")
      .interrupt()
      .attr("fill", d => d.color || "var(--color-primary)")
      .attr("height", barH)
      .transition()
      .duration(600)
      .ease(d3.easeCubicOut)
      .attr("width", d => Math.max(2, xScale(d.value)));

    // Rank number
    all.select(".rank-number")
      .attr("y", barH / 2)
      .text(d => `#${d.rank}`);

    // Label
    all.select(".rank-label")
      .attr("y", d => d.sublabel ? barH / 2 - 7 : barH / 2)
      .text(d => truncate(d.name, 22));

    // Sublabel
    all.select(".rank-sublabel")
      .attr("y", barH / 2 + 8)
      .text(d => truncate(d.sublabel || "", 20));

    // Value
    all.select(".rank-value")
      .attr("y", barH / 2)
      .attr("x", d => Math.max(2, xScale(d.value)) + 6)
      .text(d => formatValue(d.value, topicData.valueLabel));

    // EXIT — fade and shrink
    bars.exit()
      .interrupt()
      .transition()
      .duration(300)
      .attr("opacity", 0)
      .remove();
  }

  function truncate(str, maxLen) {
    if (!str) return "";
    return str.length > maxLen ? str.slice(0, maxLen - 1) + "…" : str;
  }

  function formatValue(val, label) {
    if (!label) return val;
    if (label.includes("Trillion") || label.includes("GDP")) {
      return val >= 1 ? `$${val.toFixed(1)}T` : `$${(val * 1000).toFixed(0)}B`;
    }
    if (label.includes("m)") || label.includes("meters") || label.includes("Height")) {
      return `${val}m`;
    }
    if (val >= 1000) return `${(val / 1000).toFixed(1)}B`;
    return val.toLocaleString();
  }

  function destroy() {
    if (svg) {
      svg.selectAll("*").interrupt();
    }
    topicData = null;
    svg = null;
    g = null;
  }

  return { init, renderFrame, destroy };
})();
