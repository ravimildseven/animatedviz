/* global NOBEL_PRIZES */
var NOBEL_PRIZES = {
  id: "nobel-prizes",
  title: "Nobel Prize Winners by Country",
  vizType: "world-map",
  legendTitle: "Nobel Prize laureates (cumulative)",
  note: "Cumulative Nobel Prizes by country of birth/citizenship through selected year.",
  winColors: {
    low:    "#fce4d6",
    medium: "#f4a261",
    high:   "#e76f51",
    vhigh:  "#c0392b",
    dom:    "#7b241c"
  },
  frames: [
    {
      year: 1910, label: "1910",
      note: "First decade of Nobel Prizes. Germany and France lead science.",
      countries: {
        "DEU": { count: 8, color: "#c0392b", note: "Chemistry & Physics dominance" },
        "FRA": { count: 6, color: "#e76f51", note: "" },
        "GBR": { count: 5, color: "#f4a261", note: "" },
        "CHE": { count: 3, color: "#f4a261", note: "" },
        "SWE": { count: 3, color: "#f4a261", note: "" },
        "NLD": { count: 2, color: "#fce4d6", note: "" },
        "USA": { count: 1, color: "#fce4d6", note: "" }
      }
    },
    {
      year: 1930, label: "1930",
      note: "Europe still dominant. USA beginning to emerge in sciences.",
      countries: {
        "DEU": { count: 24, color: "#c0392b", note: "Einstein, Planck, Haber…" },
        "GBR": { count: 18, color: "#e76f51", note: "" },
        "FRA": { count: 14, color: "#e76f51", note: "" },
        "USA": { count: 8, color: "#f4a261", note: "Growing fast" },
        "CHE": { count: 7, color: "#f4a261", note: "" },
        "SWE": { count: 6, color: "#f4a261", note: "" },
        "NLD": { count: 5, color: "#f4a261", note: "" },
        "DNK": { count: 4, color: "#fce4d6", note: "Niels Bohr" },
        "AUT": { count: 4, color: "#fce4d6", note: "" }
      }
    },
    {
      year: 1950, label: "1950",
      note: "Post-WWII: US attracts European refugees. British Empire universities thrive.",
      countries: {
        "USA": { count: 34, color: "#c0392b", note: "Brain drain from war-torn Europe" },
        "GBR": { count: 32, color: "#c0392b", note: "" },
        "DEU": { count: 30, color: "#e76f51", note: "Despite war disruptions" },
        "FRA": { count: 22, color: "#e76f51", note: "" },
        "CHE": { count: 12, color: "#f4a261", note: "" },
        "SWE": { count: 10, color: "#f4a261", note: "" },
        "NLD": { count: 9, color: "#f4a261", note: "" },
        "DNK": { count: 7, color: "#f4a261", note: "" },
        "AUT": { count: 6, color: "#fce4d6", note: "" },
        "CAN": { count: 3, color: "#fce4d6", note: "" }
      }
    },
    {
      year: 1970, label: "1970",
      note: "USA surges ahead. Major research investment pays off.",
      countries: {
        "USA": { count: 88, color: "#7b241c", note: "Dominant — NIH, universities" },
        "GBR": { count: 52, color: "#c0392b", note: "" },
        "DEU": { count: 42, color: "#c0392b", note: "" },
        "FRA": { count: 32, color: "#e76f51", note: "" },
        "SWE": { count: 17, color: "#f4a261", note: "" },
        "CHE": { count: 15, color: "#f4a261", note: "" },
        "NLD": { count: 12, color: "#f4a261", note: "" },
        "USSR": { count: 8, color: "#f4a261", note: "" },
        "DNK": { count: 8, color: "#f4a261", note: "" },
        "JPN": { count: 3, color: "#fce4d6", note: "" }
      }
    },
    {
      year: 1990, label: "1990",
      note: "USA's commanding lead widens. Japan, Israel emerging.",
      countries: {
        "USA": { count: 183, color: "#7b241c", note: "Nearly 40% of all prizes" },
        "GBR": { count: 78, color: "#c0392b", note: "" },
        "DEU": { count: 59, color: "#c0392b", note: "" },
        "FRA": { count: 44, color: "#e76f51", note: "" },
        "SWE": { count: 25, color: "#f4a261", note: "" },
        "CHE": { count: 22, color: "#f4a261", note: "" },
        "JPN": { count: 12, color: "#f4a261", note: "Rising" },
        "USSR": { count: 11, color: "#f4a261", note: "" },
        "ISR": { count: 7, color: "#fce4d6", note: "" },
        "NLD": { count: 18, color: "#f4a261", note: "" }
      }
    },
    {
      year: 2010, label: "2010",
      note: "US dominance continues. Japan, Australia, Israel emerge strongly.",
      countries: {
        "USA": { count: 312, color: "#7b241c", note: "~45% of all Nobel Prizes" },
        "GBR": { count: 112, color: "#c0392b", note: "" },
        "DEU": { count: 82, color: "#c0392b", note: "" },
        "FRA": { count: 58, color: "#e76f51", note: "" },
        "CHE": { count: 28, color: "#f4a261", note: "" },
        "SWE": { count: 30, color: "#f4a261", note: "" },
        "JPN": { count: 26, color: "#f4a261", note: "12 since 2000!" },
        "ISR": { count: 12, color: "#f4a261", note: "" },
        "AUS": { count: 10, color: "#fce4d6", note: "" },
        "NLD": { count: 22, color: "#f4a261", note: "" }
      }
    },
    {
      year: 2024, label: "2024",
      note: "US leads by massive margin. AI researchers (Hinton, Hassabis) now win Nobel prizes.",
      countries: {
        "USA": { count: 418, color: "#7b241c", note: "~48% of all prizes — unmatched" },
        "GBR": { count: 140, color: "#c0392b", note: "" },
        "DEU": { count: 98, color: "#c0392b", note: "" },
        "FRA": { count: 72, color: "#e76f51", note: "" },
        "SWE": { count: 35, color: "#f4a261", note: "" },
        "CHE": { count: 30, color: "#f4a261", note: "" },
        "JPN": { count: 30, color: "#f4a261", note: "" },
        "CAN": { count: 22, color: "#fce4d6", note: "Hinton — AI Nobel" },
        "ISR": { count: 18, color: "#fce4d6", note: "" },
        "AUS": { count: 16, color: "#fce4d6", note: "" }
      }
    }
  ]
};
