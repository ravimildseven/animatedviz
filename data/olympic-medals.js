/* global OLYMPIC_MEDALS */
var OLYMPIC_MEDALS = {
  id: "olympic-medals",
  title: "Olympic Medal Leaders (Cumulative)",
  vizType: "ranking",
  itemLabel: "Country",
  valueLabel: "Total Medals (Summer Games)",
  note: "Cumulative total medals through each Olympic Games.",
  frames: [
    {
      year: 1896, label: "1896 Athens",
      items: [
        { rank: 1, name: "Greece", sublabel: "Host nation", value: 47, color: "#1d8348", note: "Home advantage was enormous" },
        { rank: 2, name: "USA", sublabel: "United States", value: 19, color: "#1a5276", note: "" },
        { rank: 3, name: "Germany", sublabel: "", value: 13, color: "#922b21", note: "" },
        { rank: 4, name: "France", sublabel: "", value: 11, color: "#1a5276", note: "" },
        { rank: 5, name: "Great Britain", sublabel: "", value: 9, color: "#922b21", note: "" }
      ]
    },
    {
      year: 1912, label: "1912 Stockholm",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 130, color: "#1a5276", note: "Dominance established early" },
        { rank: 2, name: "Sweden", sublabel: "Host nation", value: 109, color: "#c0392b", note: "" },
        { rank: 3, name: "Great Britain", sublabel: "", value: 101, color: "#922b21", note: "" },
        { rank: 4, name: "Finland", sublabel: "", value: 44, color: "#c0392b", note: "" },
        { rank: 5, name: "France", sublabel: "", value: 42, color: "#1a5276", note: "" },
        { rank: 6, name: "Germany", sublabel: "", value: 37, color: "#922b21", note: "" },
        { rank: 7, name: "South Africa", sublabel: "", value: 18, color: "#1d8348", note: "" }
      ]
    },
    {
      year: 1936, label: "1936 Berlin",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 399, color: "#1a5276", note: "Jesse Owens won 4 golds in Nazi Germany" },
        { rank: 2, name: "Great Britain", sublabel: "", value: 202, color: "#922b21", note: "" },
        { rank: 3, name: "France", sublabel: "", value: 145, color: "#2980b9", note: "" },
        { rank: 4, name: "Sweden", sublabel: "", value: 143, color: "#c0392b", note: "" },
        { rank: 5, name: "Finland", sublabel: "", value: 123, color: "#c0392b", note: "" },
        { rank: 6, name: "Germany", sublabel: "Host nation", value: 89, color: "#922b21", note: "" },
        { rank: 7, name: "Italy", sublabel: "", value: 88, color: "#c0392b", note: "" },
        { rank: 8, name: "Hungary", sublabel: "", value: 67, color: "#c0392b", note: "" }
      ]
    },
    {
      year: 1956, label: "1956 Melbourne",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 690, color: "#1a5276", note: "" },
        { rank: 2, name: "Soviet Union", sublabel: "USSR", value: 280, color: "#c0392b", note: "First Olympics — dominated immediately" },
        { rank: 3, name: "Great Britain", sublabel: "", value: 330, color: "#922b21", note: "" },
        { rank: 4, name: "France", sublabel: "", value: 230, color: "#2980b9", note: "" },
        { rank: 5, name: "Sweden", sublabel: "", value: 225, color: "#c0392b", note: "" },
        { rank: 6, name: "Finland", sublabel: "", value: 198, color: "#c0392b", note: "" },
        { rank: 7, name: "Hungary", sublabel: "", value: 165, color: "#c0392b", note: "" },
        { rank: 8, name: "Italy", sublabel: "", value: 145, color: "#c0392b", note: "" }
      ]
    },
    {
      year: 1972, label: "1972 Munich",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 1191, color: "#1a5276", note: "Mark Spitz won 7 golds" },
        { rank: 2, name: "Soviet Union", sublabel: "USSR", value: 840, color: "#c0392b", note: "" },
        { rank: 3, name: "Great Britain", sublabel: "", value: 488, color: "#922b21", note: "" },
        { rank: 4, name: "France", sublabel: "", value: 350, color: "#2980b9", note: "" },
        { rank: 5, name: "Sweden", sublabel: "", value: 340, color: "#c0392b", note: "" },
        { rank: 6, name: "East Germany", sublabel: "GDR", value: 275, color: "#c0392b", note: "State-sponsored doping program" },
        { rank: 7, name: "Finland", sublabel: "", value: 268, color: "#c0392b", note: "" },
        { rank: 8, name: "Hungary", sublabel: "", value: 255, color: "#c0392b", note: "" },
        { rank: 9, name: "Japan", sublabel: "", value: 215, color: "#e74c3c", note: "" },
        { rank: 10, name: "Australia", sublabel: "", value: 195, color: "#e67e22", note: "" }
      ]
    },
    {
      year: 1992, label: "1992 Barcelona",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 1944, color: "#1a5276", note: "Dream Team basketball dominates" },
        { rank: 2, name: "Russia", sublabel: "Former Soviet", value: 1495, color: "#c0392b", note: "USSR dissolved 1991" },
        { rank: 3, name: "Germany", sublabel: "Reunited", value: 720, color: "#922b21", note: "" },
        { rank: 4, name: "Great Britain", sublabel: "", value: 680, color: "#922b21", note: "" },
        { rank: 5, name: "China", sublabel: "", value: 380, color: "#c0392b", note: "Rising force" },
        { rank: 6, name: "France", sublabel: "", value: 560, color: "#2980b9", note: "" },
        { rank: 7, name: "Australia", sublabel: "", value: 410, color: "#e67e22", note: "" },
        { rank: 8, name: "Hungary", sublabel: "", value: 395, color: "#c0392b", note: "" },
        { rank: 9, name: "South Korea", sublabel: "", value: 305, color: "#c0392b", note: "" },
        { rank: 10, name: "Cuba", sublabel: "", value: 295, color: "#c0392b", note: "" }
      ]
    },
    {
      year: 2004, label: "2004 Athens",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 2645, color: "#1a5276", note: "Michael Phelps emerges — 6 golds, 2 bronze" },
        { rank: 2, name: "Russia", sublabel: "", value: 1960, color: "#c0392b", note: "" },
        { rank: 3, name: "Germany", sublabel: "", value: 1050, color: "#922b21", note: "" },
        { rank: 4, name: "China", sublabel: "", value: 900, color: "#c0392b", note: "Surging fast" },
        { rank: 5, name: "Great Britain", sublabel: "", value: 830, color: "#922b21", note: "" },
        { rank: 6, name: "France", sublabel: "", value: 760, color: "#2980b9", note: "" },
        { rank: 7, name: "Australia", sublabel: "", value: 700, color: "#e67e22", note: "" },
        { rank: 8, name: "Hungary", sublabel: "", value: 570, color: "#c0392b", note: "" },
        { rank: 9, name: "Cuba", sublabel: "", value: 450, color: "#c0392b", note: "" },
        { rank: 10, name: "South Korea", sublabel: "", value: 430, color: "#c0392b", note: "" }
      ]
    },
    {
      year: 2016, label: "2016 Rio",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 3208, color: "#1a5276", note: "Simone Biles, Phelps farewell — 46 total golds" },
        { rank: 2, name: "Russia", sublabel: "", value: 2355, color: "#c0392b", note: "Partially banned due to doping scandal" },
        { rank: 3, name: "Germany", sublabel: "", value: 1285, color: "#922b21", note: "" },
        { rank: 4, name: "Great Britain", sublabel: "", value: 1080, color: "#922b21", note: "" },
        { rank: 5, name: "China", sublabel: "", value: 1060, color: "#c0392b", note: "" },
        { rank: 6, name: "France", sublabel: "", value: 940, color: "#2980b9", note: "" },
        { rank: 7, name: "Australia", sublabel: "", value: 895, color: "#e67e22", note: "" },
        { rank: 8, name: "Hungary", sublabel: "", value: 680, color: "#c0392b", note: "" },
        { rank: 9, name: "Japan", sublabel: "", value: 555, color: "#e74c3c", note: "" },
        { rank: 10, name: "South Korea", sublabel: "", value: 530, color: "#c0392b", note: "" }
      ]
    },
    {
      year: 2024, label: "2024 Paris",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 3420, color: "#1a5276", note: "126 total golds at Paris — unmatched Olympic dynasty" },
        { rank: 2, name: "Russia", sublabel: "ROC/AIN", value: 2380, color: "#c0392b", note: "Competing as neutrals" },
        { rank: 3, name: "Germany", sublabel: "", value: 1320, color: "#922b21", note: "" },
        { rank: 4, name: "Great Britain", sublabel: "", value: 1155, color: "#922b21", note: "" },
        { rank: 5, name: "China", sublabel: "", value: 1140, color: "#c0392b", note: "Close behind GB" },
        { rank: 6, name: "France", sublabel: "", value: 1010, color: "#2980b9", note: "" },
        { rank: 7, name: "Australia", sublabel: "", value: 960, color: "#e67e22", note: "" },
        { rank: 8, name: "Japan", sublabel: "", value: 660, color: "#e74c3c", note: "" },
        { rank: 9, name: "Hungary", sublabel: "", value: 695, color: "#c0392b", note: "" },
        { rank: 10, name: "South Korea", sublabel: "", value: 560, color: "#c0392b", note: "" }
      ]
    }
  ]
};
