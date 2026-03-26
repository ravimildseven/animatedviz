/* global GLOBAL_GDP */
var GLOBAL_GDP = {
  id: "global-gdp",
  title: "Top 10 Economies by GDP",
  vizType: "ranking",
  itemLabel: "Country",
  valueLabel: "GDP (US$ Trillion)",
  note: "Nominal GDP in current US dollars. Source: World Bank / IMF.",
  frames: [
    {
      year: 1960, label: "1960",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 0.54, color: "#1a5276", note: "Dominant postwar economy" },
        { rank: 2, name: "UK", sublabel: "United Kingdom", value: 0.14, color: "#922b21", note: "" },
        { rank: 3, name: "France", sublabel: "", value: 0.12, color: "#2980b9", note: "" },
        { rank: 4, name: "West Germany", sublabel: "", value: 0.11, color: "#922b21", note: "" },
        { rank: 5, name: "Japan", sublabel: "", value: 0.04, color: "#e74c3c", note: "Recovery underway" }
      ]
    },
    {
      year: 1970, label: "1970",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 1.07, color: "#1a5276", note: "" },
        { rank: 2, name: "West Germany", sublabel: "", value: 0.21, color: "#922b21", note: "" },
        { rank: 3, name: "Japan", sublabel: "", value: 0.21, color: "#e74c3c", note: "Economic miracle" },
        { rank: 4, name: "France", sublabel: "", value: 0.15, color: "#2980b9", note: "" },
        { rank: 5, name: "UK", sublabel: "United Kingdom", value: 0.13, color: "#922b21", note: "" },
        { rank: 6, name: "Italy", sublabel: "", value: 0.11, color: "#c0392b", note: "" },
        { rank: 7, name: "Canada", sublabel: "", value: 0.09, color: "#e67e22", note: "" }
      ]
    },
    {
      year: 1980, label: "1980",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 2.86, color: "#1a5276", note: "" },
        { rank: 2, name: "Japan", sublabel: "", value: 1.09, color: "#e74c3c", note: "Near US dominance" },
        { rank: 3, name: "West Germany", sublabel: "", value: 0.95, color: "#922b21", note: "" },
        { rank: 4, name: "France", sublabel: "", value: 0.70, color: "#2980b9", note: "" },
        { rank: 5, name: "UK", sublabel: "United Kingdom", value: 0.56, color: "#922b21", note: "" },
        { rank: 6, name: "Italy", sublabel: "", value: 0.48, color: "#c0392b", note: "" },
        { rank: 7, name: "Canada", sublabel: "", value: 0.28, color: "#e67e22", note: "" },
        { rank: 8, name: "Brazil", sublabel: "", value: 0.24, color: "#27ae60", note: "" },
        { rank: 9, name: "China", sublabel: "", value: 0.19, color: "#c0392b", note: "Still quite small" },
        { rank: 10, name: "Spain", sublabel: "", value: 0.23, color: "#c0392b", note: "" }
      ]
    },
    {
      year: 1990, label: "1990",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 5.96, color: "#1a5276", note: "" },
        { rank: 2, name: "Japan", sublabel: "", value: 3.17, color: "#e74c3c", note: "Asset bubble peak" },
        { rank: 3, name: "Germany", sublabel: "Reunified 1990", value: 1.77, color: "#922b21", note: "" },
        { rank: 4, name: "France", sublabel: "", value: 1.27, color: "#2980b9", note: "" },
        { rank: 5, name: "Italy", sublabel: "", value: 1.17, color: "#c0392b", note: "" },
        { rank: 6, name: "UK", sublabel: "United Kingdom", value: 1.09, color: "#922b21", note: "" },
        { rank: 7, name: "Canada", sublabel: "", value: 0.59, color: "#e67e22", note: "" },
        { rank: 8, name: "Spain", sublabel: "", value: 0.53, color: "#c0392b", note: "" },
        { rank: 9, name: "Brazil", sublabel: "", value: 0.46, color: "#27ae60", note: "" },
        { rank: 10, name: "China", sublabel: "", value: 0.36, color: "#c0392b", note: "Accelerating" }
      ]
    },
    {
      year: 2000, label: "2000",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 10.25, color: "#1a5276", note: "Dot-com boom" },
        { rank: 2, name: "Japan", sublabel: "", value: 4.97, color: "#e74c3c", note: "Lost decade" },
        { rank: 3, name: "Germany", sublabel: "", value: 1.95, color: "#922b21", note: "" },
        { rank: 4, name: "UK", sublabel: "United Kingdom", value: 1.65, color: "#922b21", note: "" },
        { rank: 5, name: "France", sublabel: "", value: 1.36, color: "#2980b9", note: "" },
        { rank: 6, name: "China", sublabel: "", value: 1.21, color: "#c0392b", note: "Rapid growth begins" },
        { rank: 7, name: "Italy", sublabel: "", value: 1.14, color: "#c0392b", note: "" },
        { rank: 8, name: "Canada", sublabel: "", value: 0.74, color: "#e67e22", note: "" },
        { rank: 9, name: "Brazil", sublabel: "", value: 0.65, color: "#27ae60", note: "" },
        { rank: 10, name: "Mexico", sublabel: "", value: 0.63, color: "#27ae60", note: "" }
      ]
    },
    {
      year: 2007, label: "2007",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 14.48, color: "#1a5276", note: "Pre-financial crisis peak" },
        { rank: 2, name: "Japan", sublabel: "", value: 4.52, color: "#e74c3c", note: "" },
        { rank: 3, name: "China", sublabel: "", value: 3.55, color: "#c0392b", note: "Surging — nearly at Japan" },
        { rank: 4, name: "Germany", sublabel: "", value: 3.44, color: "#922b21", note: "" },
        { rank: 5, name: "UK", sublabel: "United Kingdom", value: 3.08, color: "#922b21", note: "" },
        { rank: 6, name: "France", sublabel: "", value: 2.66, color: "#2980b9", note: "" },
        { rank: 7, name: "Italy", sublabel: "", value: 2.20, color: "#c0392b", note: "" },
        { rank: 8, name: "Canada", sublabel: "", value: 1.47, color: "#e67e22", note: "" },
        { rank: 9, name: "Spain", sublabel: "", value: 1.47, color: "#c0392b", note: "" },
        { rank: 10, name: "Brazil", sublabel: "", value: 1.40, color: "#27ae60", note: "" }
      ]
    },
    {
      year: 2010, label: "2010",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 14.99, color: "#1a5276", note: "" },
        { rank: 2, name: "China", sublabel: "", value: 6.09, color: "#c0392b", note: "Overtook Japan as #2!" },
        { rank: 3, name: "Japan", sublabel: "", value: 5.70, color: "#e74c3c", note: "Dropped to #3" },
        { rank: 4, name: "Germany", sublabel: "", value: 3.42, color: "#922b21", note: "" },
        { rank: 5, name: "France", sublabel: "", value: 2.65, color: "#2980b9", note: "" },
        { rank: 6, name: "UK", sublabel: "United Kingdom", value: 2.47, color: "#922b21", note: "" },
        { rank: 7, name: "Brazil", sublabel: "", value: 2.21, color: "#27ae60", note: "BRIC momentum" },
        { rank: 8, name: "Italy", sublabel: "", value: 2.13, color: "#c0392b", note: "" },
        { rank: 9, name: "India", sublabel: "", value: 1.71, color: "#e67e22", note: "" },
        { rank: 10, name: "Canada", sublabel: "", value: 1.61, color: "#e67e22", note: "" }
      ]
    },
    {
      year: 2015, label: "2015",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 18.21, color: "#1a5276", note: "" },
        { rank: 2, name: "China", sublabel: "", value: 11.06, color: "#c0392b", note: "Closing the gap" },
        { rank: 3, name: "Japan", sublabel: "", value: 4.38, color: "#e74c3c", note: "" },
        { rank: 4, name: "Germany", sublabel: "", value: 3.36, color: "#922b21", note: "" },
        { rank: 5, name: "UK", sublabel: "United Kingdom", value: 2.86, color: "#922b21", note: "" },
        { rank: 6, name: "France", sublabel: "", value: 2.42, color: "#2980b9", note: "" },
        { rank: 7, name: "India", sublabel: "", value: 2.10, color: "#e67e22", note: "Rapidly growing" },
        { rank: 8, name: "Italy", sublabel: "", value: 1.82, color: "#c0392b", note: "" },
        { rank: 9, name: "Brazil", sublabel: "", value: 1.80, color: "#27ae60", note: "" },
        { rank: 10, name: "Canada", sublabel: "", value: 1.55, color: "#e67e22", note: "" }
      ]
    },
    {
      year: 2020, label: "2020",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 20.89, color: "#1a5276", note: "COVID-19 recession absorbed" },
        { rank: 2, name: "China", sublabel: "", value: 14.72, color: "#c0392b", note: "Only major economy to grow in 2020" },
        { rank: 3, name: "Japan", sublabel: "", value: 5.04, color: "#e74c3c", note: "" },
        { rank: 4, name: "Germany", sublabel: "", value: 3.85, color: "#922b21", note: "" },
        { rank: 5, name: "UK", sublabel: "United Kingdom", value: 2.76, color: "#922b21", note: "" },
        { rank: 6, name: "India", sublabel: "", value: 2.66, color: "#e67e22", note: "" },
        { rank: 7, name: "France", sublabel: "", value: 2.63, color: "#2980b9", note: "" },
        { rank: 8, name: "Italy", sublabel: "", value: 1.89, color: "#c0392b", note: "" },
        { rank: 9, name: "Canada", sublabel: "", value: 1.64, color: "#e67e22", note: "" },
        { rank: 10, name: "South Korea", sublabel: "", value: 1.63, color: "#e74c3c", note: "" }
      ]
    },
    {
      year: 2023, label: "2023",
      items: [
        { rank: 1, name: "USA", sublabel: "United States", value: 27.36, color: "#1a5276", note: "AI boom drives growth" },
        { rank: 2, name: "China", sublabel: "", value: 17.79, color: "#c0392b", note: "Property sector slowing" },
        { rank: 3, name: "Germany", sublabel: "", value: 4.46, color: "#922b21", note: "" },
        { rank: 4, name: "Japan", sublabel: "", value: 4.21, color: "#e74c3c", note: "Yen weakness" },
        { rank: 5, name: "India", sublabel: "", value: 3.73, color: "#e67e22", note: "5th largest — passed UK & France" },
        { rank: 6, name: "UK", sublabel: "United Kingdom", value: 3.08, color: "#922b21", note: "" },
        { rank: 7, name: "France", sublabel: "", value: 2.92, color: "#2980b9", note: "" },
        { rank: 8, name: "Italy", sublabel: "", value: 2.19, color: "#c0392b", note: "" },
        { rank: 9, name: "Brazil", sublabel: "", value: 2.13, color: "#27ae60", note: "" },
        { rank: 10, name: "Canada", sublabel: "", value: 2.09, color: "#e67e22", note: "" }
      ]
    }
  ]
};
