/* global SPOKEN_LANGUAGES */
var SPOKEN_LANGUAGES = {
  id: "spoken-languages",
  title: "Most Spoken Languages",
  vizType: "ranking",
  itemLabel: "Language",
  valueLabel: "Native speakers (millions)",
  note: "Native speakers only. English has ~1.5B total speakers including L2.",
  frames: [
    {
      year: 1900, label: "1900",
      items: [
        { rank: 1, name: "Mandarin Chinese", sublabel: "China", value: 350, color: "#c0392b", note: "Qing Dynasty era" },
        { rank: 2, name: "Hindi", sublabel: "British India", value: 200, color: "#e67e22", note: "" },
        { rank: 3, name: "Spanish", sublabel: "Spain + Americas", value: 100, color: "#c0392b", note: "" },
        { rank: 4, name: "Russian", sublabel: "Russian Empire", value: 85, color: "#8e44ad", note: "" },
        { rank: 5, name: "English", sublabel: "UK + colonies", value: 80, color: "#1a5276", note: "" },
        { rank: 6, name: "German", sublabel: "Germany + Austria", value: 75, color: "#922b21", note: "" },
        { rank: 7, name: "French", sublabel: "France + colonies", value: 50, color: "#2980b9", note: "" },
        { rank: 8, name: "Bengali", sublabel: "Bengal region", value: 45, color: "#e67e22", note: "" },
        { rank: 9, name: "Arabic", sublabel: "MENA region", value: 38, color: "#27ae60", note: "" },
        { rank: 10, name: "Portuguese", sublabel: "Portugal + Brazil", value: 30, color: "#27ae60", note: "" }
      ]
    },
    {
      year: 1950, label: "1950",
      items: [
        { rank: 1, name: "Mandarin Chinese", sublabel: "China", value: 450, color: "#c0392b", note: "PRC founded 1949 — unifying language" },
        { rank: 2, name: "Hindi", sublabel: "India", value: 280, color: "#e67e22", note: "Post-independence India" },
        { rank: 3, name: "Spanish", sublabel: "Spain + Latin America", value: 160, color: "#c0392b", note: "" },
        { rank: 4, name: "Russian", sublabel: "USSR", value: 140, color: "#8e44ad", note: "" },
        { rank: 5, name: "English", sublabel: "US, UK, Commonwealth", value: 130, color: "#1a5276", note: "" },
        { rank: 6, name: "Arabic", sublabel: "Arab world", value: 70, color: "#27ae60", note: "" },
        { rank: 7, name: "German", sublabel: "", value: 80, color: "#922b21", note: "" },
        { rank: 8, name: "Bengali", sublabel: "India/Pakistan", value: 65, color: "#e67e22", note: "" },
        { rank: 9, name: "Portuguese", sublabel: "Portugal + Brazil", value: 60, color: "#27ae60", note: "" },
        { rank: 10, name: "French", sublabel: "France + colonies", value: 55, color: "#2980b9", note: "" }
      ]
    },
    {
      year: 1980, label: "1980",
      items: [
        { rank: 1, name: "Mandarin Chinese", sublabel: "China", value: 730, color: "#c0392b", note: "Reform era opens China" },
        { rank: 2, name: "Hindi", sublabel: "India", value: 380, color: "#e67e22", note: "" },
        { rank: 3, name: "Spanish", sublabel: "Spain + Latin America", value: 250, color: "#c0392b", note: "" },
        { rank: 4, name: "English", sublabel: "", value: 220, color: "#1a5276", note: "" },
        { rank: 5, name: "Russian", sublabel: "USSR", value: 160, color: "#8e44ad", note: "" },
        { rank: 6, name: "Arabic", sublabel: "", value: 130, color: "#27ae60", note: "" },
        { rank: 7, name: "Bengali", sublabel: "Bangladesh + India", value: 110, color: "#e67e22", note: "" },
        { rank: 8, name: "Portuguese", sublabel: "Brazil is huge", value: 110, color: "#27ae60", note: "" },
        { rank: 9, name: "German", sublabel: "", value: 100, color: "#922b21", note: "" },
        { rank: 10, name: "Japanese", sublabel: "Japan", value: 110, color: "#e74c3c", note: "" }
      ]
    },
    {
      year: 2000, label: "2000",
      items: [
        { rank: 1, name: "Mandarin Chinese", sublabel: "China", value: 880, color: "#c0392b", note: "China's rise changes everything" },
        { rank: 2, name: "Hindi", sublabel: "India", value: 490, color: "#e67e22", note: "" },
        { rank: 3, name: "Spanish", sublabel: "", value: 360, color: "#c0392b", note: "Latin American boom" },
        { rank: 4, name: "English", sublabel: "", value: 330, color: "#1a5276", note: "" },
        { rank: 5, name: "Arabic", sublabel: "", value: 205, color: "#27ae60", note: "" },
        { rank: 6, name: "Bengali", sublabel: "", value: 210, color: "#e67e22", note: "" },
        { rank: 7, name: "Portuguese", sublabel: "Brazil's boom", value: 195, color: "#27ae60", note: "" },
        { rank: 8, name: "Russian", sublabel: "Post-USSR decline", value: 155, color: "#8e44ad", note: "" },
        { rank: 9, name: "Japanese", sublabel: "", value: 125, color: "#e74c3c", note: "" },
        { rank: 10, name: "German", sublabel: "", value: 95, color: "#922b21", note: "" }
      ]
    },
    {
      year: 2024, label: "2024",
      items: [
        { rank: 1, name: "Mandarin Chinese", sublabel: "China", value: 940, color: "#c0392b", note: "Still dominant but growth slowing with China's demographics" },
        { rank: 2, name: "Spanish", sublabel: "", value: 490, color: "#c0392b", note: "Rising fast — Latin America growth" },
        { rank: 3, name: "English", sublabel: "", value: 400, color: "#1a5276", note: "Global lingua franca" },
        { rank: 4, name: "Hindi", sublabel: "India", value: 600, color: "#e67e22", note: "India now world's most populous country" },
        { rank: 5, name: "Arabic", sublabel: "", value: 270, color: "#27ae60", note: "" },
        { rank: 6, name: "Bengali", sublabel: "Bangladesh + India", value: 235, color: "#e67e22", note: "" },
        { rank: 7, name: "Portuguese", sublabel: "Brazil", value: 230, color: "#27ae60", note: "" },
        { rank: 8, name: "Russian", sublabel: "", value: 150, color: "#8e44ad", note: "" },
        { rank: 9, name: "Japanese", sublabel: "", value: 123, color: "#e74c3c", note: "Aging Japan — declining" },
        { rank: 10, name: "Punjabi", sublabel: "Pakistan + India", value: 113, color: "#e67e22", note: "" }
      ]
    }
  ]
};
