/* global WORLD_POPULATION */
var WORLD_POPULATION = {
  id: "world-population",
  title: "World Population Top 10",
  vizType: "ranking",
  itemLabel: "Country",
  valueLabel: "Population (millions)",
  note: "Population in millions. Source: UN, Census Bureau.",
  frames: [
    {
      year: 1800, label: "1800",
      items: [
        { rank: 1, name: "China", sublabel: "Qing Dynasty", value: 330, color: "#c0392b", note: "Qing Dynasty at peak" },
        { rank: 2, name: "India", sublabel: "British India", value: 180, color: "#e67e22", note: "" },
        { rank: 3, name: "France", sublabel: "", value: 28, color: "#2980b9", note: "" },
        { rank: 4, name: "Holy Roman Empire", sublabel: "German states", value: 26, color: "#922b21", note: "" },
        { rank: 5, name: "Japan", sublabel: "Edo period", value: 25, color: "#e74c3c", note: "" },
        { rank: 6, name: "Russia", sublabel: "Russian Empire", value: 24, color: "#8e44ad", note: "" },
        { rank: 7, name: "Ottoman Empire", sublabel: "", value: 21, color: "#c0392b", note: "" },
        { rank: 8, name: "Italy", sublabel: "Italian states", value: 18, color: "#c0392b", note: "" },
        { rank: 9, name: "UK", sublabel: "Britain + Ireland", value: 16, color: "#922b21", note: "" },
        { rank: 10, name: "Spain", sublabel: "", value: 11, color: "#c0392b", note: "" }
      ]
    },
    {
      year: 1850, label: "1850",
      items: [
        { rank: 1, name: "China", sublabel: "", value: 420, color: "#c0392b", note: "Taiping Rebellion will kill millions" },
        { rank: 2, name: "India", sublabel: "British India", value: 220, color: "#e67e22", note: "" },
        { rank: 3, name: "Russia", sublabel: "", value: 59, color: "#8e44ad", note: "" },
        { rank: 4, name: "France", sublabel: "", value: 36, color: "#2980b9", note: "" },
        { rank: 5, name: "Germany", sublabel: "", value: 35, color: "#922b21", note: "" },
        { rank: 6, name: "Japan", sublabel: "", value: 32, color: "#e74c3c", note: "" },
        { rank: 7, name: "Ottoman Empire", sublabel: "", value: 28, color: "#c0392b", note: "" },
        { rank: 8, name: "UK", sublabel: "", value: 27, color: "#922b21", note: "" },
        { rank: 9, name: "Italy", sublabel: "", value: 25, color: "#c0392b", note: "" },
        { rank: 10, name: "USA", sublabel: "", value: 23, color: "#1a5276", note: "Rapid growth" }
      ]
    },
    {
      year: 1900, label: "1900",
      items: [
        { rank: 1, name: "China", sublabel: "", value: 400, color: "#c0392b", note: "Qing Dynasty collapsing" },
        { rank: 2, name: "India", sublabel: "British India", value: 285, color: "#e67e22", note: "" },
        { rank: 3, name: "Russia", sublabel: "", value: 133, color: "#8e44ad", note: "" },
        { rank: 4, name: "USA", sublabel: "", value: 76, color: "#1a5276", note: "Fastest growing major power" },
        { rank: 5, name: "Germany", sublabel: "", value: 56, color: "#922b21", note: "" },
        { rank: 6, name: "Austria-Hungary", sublabel: "", value: 47, color: "#c0392b", note: "" },
        { rank: 7, name: "Japan", sublabel: "", value: 44, color: "#e74c3c", note: "" },
        { rank: 8, name: "France", sublabel: "", value: 41, color: "#2980b9", note: "" },
        { rank: 9, name: "UK", sublabel: "", value: 38, color: "#922b21", note: "" },
        { rank: 10, name: "Italy", sublabel: "", value: 33, color: "#c0392b", note: "" }
      ]
    },
    {
      year: 1950, label: "1950",
      items: [
        { rank: 1, name: "China", sublabel: "PRC founded 1949", value: 554, color: "#c0392b", note: "Communist revolution just completed" },
        { rank: 2, name: "India", sublabel: "", value: 376, color: "#e67e22", note: "Independence 1947" },
        { rank: 3, name: "USA", sublabel: "", value: 157, color: "#1a5276", note: "" },
        { rank: 4, name: "Russia", sublabel: "USSR", value: 102, color: "#8e44ad", note: "" },
        { rank: 5, name: "Japan", sublabel: "", value: 84, color: "#e74c3c", note: "" },
        { rank: 6, name: "Germany", sublabel: "", value: 68, color: "#922b21", note: "" },
        { rank: 7, name: "Indonesia", sublabel: "", value: 79, color: "#e74c3c", note: "" },
        { rank: 8, name: "Brazil", sublabel: "", value: 54, color: "#27ae60", note: "" },
        { rank: 9, name: "UK", sublabel: "", value: 50, color: "#922b21", note: "" },
        { rank: 10, name: "Italy", sublabel: "", value: 47, color: "#c0392b", note: "" }
      ]
    },
    {
      year: 1975, label: "1975",
      items: [
        { rank: 1, name: "China", sublabel: "", value: 935, color: "#c0392b", note: "One-child policy introduced 1980" },
        { rank: 2, name: "India", sublabel: "", value: 623, color: "#e67e22", note: "Closing the gap with China" },
        { rank: 3, name: "USA", sublabel: "", value: 216, color: "#1a5276", note: "" },
        { rank: 4, name: "USSR", sublabel: "", value: 254, color: "#8e44ad", note: "" },
        { rank: 5, name: "Indonesia", sublabel: "", value: 135, color: "#e74c3c", note: "" },
        { rank: 6, name: "Brazil", sublabel: "", value: 108, color: "#27ae60", note: "" },
        { rank: 7, name: "Japan", sublabel: "", value: 111, color: "#e74c3c", note: "" },
        { rank: 8, name: "Bangladesh", sublabel: "", value: 77, color: "#27ae60", note: "" },
        { rank: 9, name: "Pakistan", sublabel: "", value: 72, color: "#27ae60", note: "" },
        { rank: 10, name: "Nigeria", sublabel: "", value: 58, color: "#e67e22", note: "African giant rising" }
      ]
    },
    {
      year: 2000, label: "2000",
      items: [
        { rank: 1, name: "China", sublabel: "", value: 1268, color: "#c0392b", note: "" },
        { rank: 2, name: "India", sublabel: "", value: 1053, color: "#e67e22", note: "Will overtake China by 2023" },
        { rank: 3, name: "USA", sublabel: "", value: 282, color: "#1a5276", note: "" },
        { rank: 4, name: "Indonesia", sublabel: "", value: 212, color: "#e74c3c", note: "" },
        { rank: 5, name: "Brazil", sublabel: "", value: 176, color: "#27ae60", note: "" },
        { rank: 6, name: "Pakistan", sublabel: "", value: 142, color: "#27ae60", note: "" },
        { rank: 7, name: "Russia", sublabel: "", value: 146, color: "#8e44ad", note: "" },
        { rank: 8, name: "Bangladesh", sublabel: "", value: 131, color: "#27ae60", note: "" },
        { rank: 9, name: "Japan", sublabel: "", value: 126, color: "#e74c3c", note: "" },
        { rank: 10, name: "Nigeria", sublabel: "", value: 114, color: "#e67e22", note: "" }
      ]
    },
    {
      year: 2024, label: "2024",
      items: [
        { rank: 1, name: "India", sublabel: "", value: 1441, color: "#e67e22", note: "Surpassed China in 2023!" },
        { rank: 2, name: "China", sublabel: "", value: 1408, color: "#c0392b", note: "Population declining" },
        { rank: 3, name: "USA", sublabel: "", value: 341, color: "#1a5276", note: "" },
        { rank: 4, name: "Indonesia", sublabel: "", value: 278, color: "#e74c3c", note: "" },
        { rank: 5, name: "Pakistan", sublabel: "", value: 245, color: "#27ae60", note: "" },
        { rank: 6, name: "Nigeria", sublabel: "", value: 232, color: "#e67e22", note: "Africa's most populous" },
        { rank: 7, name: "Brazil", sublabel: "", value: 218, color: "#27ae60", note: "" },
        { rank: 8, name: "Bangladesh", sublabel: "", value: 174, color: "#27ae60", note: "" },
        { rank: 9, name: "Ethiopia", sublabel: "", value: 132, color: "#e67e22", note: "" },
        { rank: 10, name: "Russia", sublabel: "", value: 144, color: "#8e44ad", note: "" }
      ]
    }
  ]
};
