/* ===== MAP VISUALIZATION MODULE ===== */
/* World map and US map renderer for geographic topics */
/* global mapViz, d3, topojson */

const mapViz = (function () {
  "use strict";

  // ===== ISO alpha-3 to numeric country ID (world-atlas uses numeric) =====
  const ISO3_TO_NUM = {
    "AFG":4,"ALB":8,"DZA":12,"AND":20,"AGO":24,"ARG":32,"ARM":51,"AUS":36,"AUT":40,
    "AZE":31,"BHS":44,"BHR":48,"BGD":50,"BLR":112,"BEL":56,"BLZ":84,"BEN":204,
    "BTN":64,"BOL":68,"BIH":70,"BWA":72,"BRA":76,"BRN":96,"BGR":100,"BFA":854,
    "BDI":108,"CPV":132,"KHM":116,"CMR":120,"CAN":124,"CAF":140,"TCD":148,"CHL":152,
    "CHN":156,"COL":170,"COM":174,"COD":180,"COG":178,"CRI":188,"CIV":384,"HRV":191,
    "CUB":192,"CYP":196,"CZE":203,"DNK":208,"DJI":262,"DOM":214,"ECU":218,"EGY":818,
    "SLV":222,"GNQ":226,"ERI":232,"EST":233,"SWZ":748,"ETH":231,"FJI":242,"FIN":246,
    "FRA":250,"GAB":266,"GMB":270,"GEO":268,"DEU":276,"GHA":288,"GRC":300,"GTM":320,
    "GIN":324,"GNB":624,"GUY":328,"HTI":332,"HND":340,"HUN":348,"ISL":352,"IND":356,
    "IDN":360,"IRN":364,"IRQ":368,"IRL":372,"ISR":376,"ITA":380,"JAM":388,"JPN":392,
    "JOR":400,"KAZ":398,"KEN":404,"PRK":408,"KOR":410,"KWT":414,"KGZ":417,"LAO":418,
    "LVA":428,"LBN":422,"LSO":426,"LBR":430,"LBY":434,"LIE":438,"LTU":440,"LUX":442,
    "MDG":450,"MWI":454,"MYS":458,"MDV":462,"MLI":466,"MLT":470,"MRT":478,"MUS":480,
    "MEX":484,"MDA":498,"MNG":496,"MNE":499,"MAR":504,"MOZ":508,"MMR":104,"NAM":516,
    "NPL":524,"NLD":528,"NZL":554,"NIC":558,"NER":562,"NGA":566,"MKD":807,"NOR":578,
    "OMN":512,"PAK":586,"PAN":591,"PNG":598,"PRY":600,"PER":604,"PHL":608,"POL":616,
    "PRT":620,"QAT":634,"ROU":642,"RUS":643,"RWA":646,"SAU":682,"SEN":686,"SRB":688,
    "SLE":694,"SGP":702,"SVK":703,"SVN":705,"SOM":706,"ZAF":710,"ESP":724,"LKA":144,
    "SDN":729,"SUR":740,"SWE":752,"CHE":756,"SYR":760,"TWN":158,"TJK":762,"TZA":834,
    "THA":764,"TLS":626,"TGO":768,"TTO":780,"TUN":788,"TUR":792,"TKM":795,"UGA":800,
    "UKR":804,"ARE":784,"GBR":826,"USA":840,"URY":858,"UZB":860,"VEN":862,"VNM":704,
    "YEM":887,"ZMB":894,"ZWE":716,"SSD":728,"XKX":383,"BLK":826,
    // Historical / special
    "USSR": 643, "YUG": 688, "TCH": 203
  };

  // US State FIPS to abbreviation (same as elections app)
  const STATE_FIPS = {
    "01":"AL","02":"AK","04":"AZ","05":"AR","06":"CA","08":"CO","09":"CT","10":"DE",
    "11":"DC","12":"FL","13":"GA","15":"HI","16":"ID","17":"IL","18":"IN","19":"IA",
    "20":"KS","21":"KY","22":"LA","23":"ME","24":"MD","25":"MA","26":"MI","27":"MN",
    "28":"MS","29":"MO","30":"MT","31":"NE","32":"NV","33":"NH","34":"NJ","35":"NM",
    "36":"NY","37":"NC","38":"ND","39":"OH","40":"OK","41":"OR","42":"PA","44":"RI",
    "45":"SC","46":"SD","47":"TN","48":"TX","49":"UT","50":"VT","51":"VA","53":"WA",
    "54":"WV","55":"WI","56":"WY"
  };

  // Cached geo data
  let worldGeo = null;
  let usGeo = null;
  let usMesh = null;

  // Instance state
  let svg, mapGroup, projection, pathGen;
  let topicData = null;
  let mapType = "world";
  let containerEl = null;
  let tooltipEl = null;

  async function init(data, container, opts) {
    topicData = data;
    containerEl = container;
    mapType = (opts && opts.mapType) || "world";
    tooltipEl = document.getElementById("tooltip");

    // Load geo data if not cached
    if ((mapType === "world" || mapType === "world-map") && !worldGeo) {
      const raw = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
      worldGeo = {
        countries: topojson.feature(raw, raw.objects.countries),
        borders: topojson.mesh(raw, raw.objects.countries, (a, b) => a !== b)
      };
    } else if ((mapType === "us" || mapType === "us-map") && !usGeo) {
      const raw = await d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json");
      usGeo = topojson.feature(raw, raw.objects.states);
      usMesh = topojson.mesh(raw, raw.objects.states, (a, b) => a !== b);
    }

    // Create SVG
    const existing = containerEl.querySelector(".map-svg");
    if (existing) existing.remove();

    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.classList.add("map-svg");
    svgEl.style.cssText = "width:100%;height:100%;";
    containerEl.appendChild(svgEl);

    svg = d3.select(svgEl);
    mapGroup = svg.append("g").attr("class", "map-group");

    drawBase();
    return Promise.resolve();
  }

  function drawBase() {
    const rect = containerEl.getBoundingClientRect();
    const w = rect.width || 800;
    const h = rect.height || 500;

    svg.attr("viewBox", `0 0 ${w} ${h}`);

    if (mapType === "world" || mapType === "world-map") {
      projection = d3.geoNaturalEarth1()
        .fitSize([w - 20, h - 20], worldGeo.countries)
        .translate([w / 2, h / 2]);
    } else {
      projection = d3.geoAlbersUsa()
        .fitSize([w - 40, h - 20], usGeo);
    }

    pathGen = d3.geoPath().projection(projection);
    mapGroup.selectAll("*").remove();

    const geoFeatures = (mapType === "world" || mapType === "world-map") ? worldGeo.countries.features : usGeo.features;
    const borderMesh = (mapType === "world" || mapType === "world-map") ? worldGeo.borders : usMesh;

    // Draw paths
    mapGroup.selectAll(".geo-path")
      .data(geoFeatures)
      .enter()
      .append("path")
      .attr("class", "geo-path")
      .attr("d", pathGen)
      .attr("fill", "var(--color-surface-2)")
      .attr("id", d => `geo-${d.id}`)
      .on("mouseover", handleMouseover)
      .on("mousemove", handleMousemove)
      .on("mouseout", handleMouseout);

    // Draw borders
    mapGroup.append("path")
      .datum(borderMesh)
      .attr("class", "geo-border")
      .attr("d", pathGen);
  }

  function renderFrame(frameIndex) {
    if (!topicData || !mapGroup) return;
    const frame = topicData.frames[frameIndex];
    if (!frame) return;

    // Recompute dimensions in case of resize
    const rect = containerEl.getBoundingClientRect();
    const w = rect.width || 800;
    const h = rect.height || 500;
    svg.attr("viewBox", `0 0 ${w} ${h}`);
    if (mapType === "world" || mapType === "world-map") {
      projection.fitSize([w - 20, h - 20], worldGeo.countries).translate([w / 2, h / 2]);
    } else {
      projection.fitSize([w - 40, h - 20], usGeo);
    }
    pathGen = d3.geoPath().projection(projection);
    mapGroup.selectAll(".geo-path,.geo-border").attr("d", pathGen);

    const colorMap = buildColorMap(frame, frameIndex);

    mapGroup.selectAll(".geo-path")
      .interrupt()
      .transition()
      .duration(300)
      .attr("fill", d => colorMap[d.id] || "var(--color-surface-2)");

    updateLegend(frame, frameIndex);
  }

  function buildColorMap(frame, frameIndex) {
    const colorMap = {};

    if (topicData.vizType === "world-map") {
      if (topicData.id === "world-cup") {
        // Cumulative wins up to this frame
        const cumWins = frame.cumulativeWins || {};
        const maxWins = Math.max(...Object.values(cumWins), 1);
        Object.entries(cumWins).forEach(([iso3, wins]) => {
          const numId = ISO3_TO_NUM[iso3];
          if (numId) {
            const intensity = wins / maxWins;
            colorMap[numId] = d3.interpolateOranges(0.3 + intensity * 0.65);
          }
        });
        // Highlight current winner brighter
        const winnerNum = ISO3_TO_NUM[frame.winnerISO];
        if (winnerNum) colorMap[winnerNum] = "#c0392b";

      } else if (topicData.id === "space-missions") {
        const tierColors = topicData.tiers;
        Object.entries(frame.countries || {}).forEach(([iso3, info]) => {
          const numId = ISO3_TO_NUM[iso3];
          if (numId) colorMap[numId] = info.color || (tierColors[info.tier] && tierColors[info.tier].color) || "#888";
        });

      } else if (topicData.id === "nobel-prizes") {
        Object.entries(frame.countries || {}).forEach(([iso3, info]) => {
          const numId = ISO3_TO_NUM[iso3];
          if (numId) colorMap[numId] = info.color || "#f4a261";
        });
      }

    } else if (topicData.vizType === "us-map") {
      // US population map — sequential blue scale
      const statePops = frame.states || {};
      const maxPop = Math.max(...Object.values(statePops).map(s => s.population), 1);
      Object.entries(statePops).forEach(([abbr, s]) => {
        // Find FIPS for this state abbr
        const fips = Object.entries(STATE_FIPS).find(([, a]) => a === abbr);
        if (fips) {
          const intensity = Math.pow(s.population / maxPop, 0.4); // sqrt to spread the scale
          colorMap[parseInt(fips[0])] = d3.interpolateBlues(0.15 + intensity * 0.75);
        }
      });
    }

    return colorMap;
  }

  function handleMouseover(event, d) {
    if (!tooltipEl || !topicData) return;
    const content = getTooltipContent(d);
    if (!content) return;
    document.getElementById("tooltip-title").textContent = content.title;
    document.getElementById("tooltip-body").innerHTML = content.body;
    tooltipEl.style.display = "block";
    positionTooltip(event);
  }

  function handleMousemove(event) {
    positionTooltip(event);
  }

  function handleMouseout() {
    if (tooltipEl) tooltipEl.style.display = "none";
  }

  function positionTooltip(event) {
    if (!tooltipEl || !containerEl) return;
    const rect = containerEl.getBoundingClientRect();
    let x = event.clientX - rect.left + 14;
    let y = event.clientY - rect.top - 10;
    const tw = tooltipEl.offsetWidth;
    const th = tooltipEl.offsetHeight;
    if (x + tw > rect.width - 10) x = x - tw - 28;
    if (y + th > rect.height - 10) y = y - th;
    if (y < 10) y = 10;
    tooltipEl.style.left = x + "px";
    tooltipEl.style.top = y + "px";
  }

  function getTooltipContent(d) {
    if (!topicData) return null;
    const frame = topicData.frames ? topicData.currentFrame : null;

    if (topicData.vizType === "world-map") {
      if (topicData.id === "world-cup") {
        const wins = (topicData.frames[topicData._currentIndex || 0].cumulativeWins || {})[
          Object.keys(ISO3_TO_NUM).find(k => ISO3_TO_NUM[k] === d.id)
        ];
        if (!wins) return null;
        const iso3 = Object.keys(ISO3_TO_NUM).find(k => ISO3_TO_NUM[k] === d.id);
        return { title: iso3 || `Country ${d.id}`, body: `<b>${wins}</b> World Cup${wins > 1 ? "s" : ""}` };
      }
      if (topicData.id === "space-missions") {
        const iso3 = Object.keys(ISO3_TO_NUM).find(k => ISO3_TO_NUM[k] === d.id);
        if (!iso3) return null;
        const fi = topicData._currentIndex || 0;
        const info = (topicData.frames[fi].countries || {})[iso3];
        if (!info) return null;
        return { title: iso3, body: info.label || info.tier };
      }
      if (topicData.id === "nobel-prizes") {
        const iso3 = Object.keys(ISO3_TO_NUM).find(k => ISO3_TO_NUM[k] === d.id);
        if (!iso3) return null;
        const fi = topicData._currentIndex || 0;
        const info = (topicData.frames[fi].countries || {})[iso3];
        if (!info) return null;
        return { title: iso3, body: `<b>${info.count}</b> Nobel Prize laureates` };
      }
    }

    if (topicData.vizType === "us-map") {
      const fipsStr = String(d.id).padStart(2, "0");
      const abbr = STATE_FIPS[fipsStr];
      if (!abbr) return null;
      const fi = topicData._currentIndex || 0;
      const stateInfo = (topicData.frames[fi].states || {})[abbr];
      if (!stateInfo) return null;
      const pop = stateInfo.population;
      return {
        title: abbr,
        body: `Population: <b>${pop >= 1e6 ? (pop / 1e6).toFixed(1) + "M" : pop.toLocaleString()}</b><br>Rank: #${stateInfo.rank}`
      };
    }

    return null;
  }

  function updateLegend(frame, frameIndex) {
    const legendEl = document.getElementById("viz-legend");
    const itemsEl = document.getElementById("legend-items");
    if (!legendEl || !itemsEl) return;

    itemsEl.innerHTML = "";

    if (topicData.id === "world-cup") {
      const wins = frame.cumulativeWins || {};
      const maxW = Math.max(...Object.values(wins), 1);
      const steps = [1, 2, 3, 4, 5].filter(w => w <= maxW);
      steps.forEach(w => {
        const entry = document.createElement("div");
        entry.className = "legend-entry";
        const color = d3.interpolateOranges(0.3 + (w / maxW) * 0.65);
        entry.innerHTML = `<span class="legend-swatch" style="background:${color}"></span><span>${w} win${w > 1 ? "s" : ""}</span>`;
        itemsEl.appendChild(entry);
      });
      legendEl.style.display = "block";

    } else if (topicData.id === "space-missions") {
      Object.entries(topicData.tiers).forEach(([tier, info]) => {
        const entry = document.createElement("div");
        entry.className = "legend-entry";
        entry.innerHTML = `<span class="legend-swatch" style="background:${info.color}"></span><span>${info.label}</span>`;
        itemsEl.appendChild(entry);
      });
      legendEl.style.display = "block";

    } else if (topicData.id === "nobel-prizes") {
      [
        { label: "1–20", color: "#fce4d6" },
        { label: "20–60", color: "#f4a261" },
        { label: "60–150", color: "#e76f51" },
        { label: "150–250", color: "#c0392b" },
        { label: "250+", color: "#7b241c" }
      ].forEach(({ label, color }) => {
        const entry = document.createElement("div");
        entry.className = "legend-entry";
        entry.innerHTML = `<span class="legend-swatch" style="background:${color}"></span><span>${label}</span>`;
        itemsEl.appendChild(entry);
      });
      legendEl.style.display = "block";

    } else if (topicData.id === "us-population") {
      [
        { label: "Low", color: d3.interpolateBlues(0.15) },
        { label: "Medium", color: d3.interpolateBlues(0.45) },
        { label: "High", color: d3.interpolateBlues(0.75) },
        { label: "Very High", color: d3.interpolateBlues(0.9) }
      ].forEach(({ label, color }) => {
        const entry = document.createElement("div");
        entry.className = "legend-entry";
        entry.innerHTML = `<span class="legend-swatch" style="background:${color}"></span><span>${label}</span>`;
        itemsEl.appendChild(entry);
      });
      legendEl.style.display = "block";
    } else {
      legendEl.style.display = "none";
    }
  }

  function destroy() {
    if (svg) svg.selectAll(".geo-path").interrupt();
    topicData = null;
    svg = null;
    mapGroup = null;
    projection = null;
    pathGen = null;
    containerEl = null;
    const legendEl = document.getElementById("viz-legend");
    if (legendEl) legendEl.style.display = "none";
  }

  return { init, renderFrame, destroy };
})();
