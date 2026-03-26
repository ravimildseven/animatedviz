/* global US_POPULATION */
// Color scale: darker = more populous
var US_POPULATION = {
  id: "us-population",
  title: "US States by Population",
  vizType: "us-map",
  legendTitle: "Population (millions)",
  note: "US Census data every 10 years. Color intensity = relative population.",
  frames: [
    {
      year: 1790, label: "1790 Census", totalPopulation: 3929214,
      states: {
        "VA": { population: 747610, rank: 1 }, "PA": { population: 434373, rank: 2 },
        "NC": { population: 393751, rank: 3 }, "MA": { population: 378787, rank: 4 },
        "NY": { population: 340120, rank: 5 }, "MD": { population: 319728, rank: 6 },
        "SC": { population: 249073, rank: 7 }, "CT": { population: 237946, rank: 8 },
        "NJ": { population: 184139, rank: 9 }, "NH": { population: 141885, rank: 10 },
        "GA": { population: 82548, rank: 11 }, "VT": { population: 85425, rank: 12 },
        "RI": { population: 68825, rank: 13 }, "DE": { population: 59094, rank: 14 }
      }
    },
    {
      year: 1820, label: "1820 Census", totalPopulation: 9638453,
      states: {
        "NY": { population: 1372812, rank: 1 }, "PA": { population: 1049458, rank: 2 },
        "VA": { population: 938261, rank: 3 }, "OH": { population: 581434, rank: 4 },
        "NC": { population: 638829, rank: 5 }, "KY": { population: 564317, rank: 6 },
        "SC": { population: 502741, rank: 7 }, "TN": { population: 422813, rank: 8 },
        "MA": { population: 523287, rank: 9 }, "MD": { population: 407350, rank: 10 },
        "GA": { population: 340989, rank: 11 }, "CT": { population: 275248, rank: 12 },
        "NJ": { population: 277575, rank: 13 }, "IN": { population: 147178, rank: 14 },
        "IL": { population: 55211, rank: 15 }, "ME": { population: 298335, rank: 16 },
        "VT": { population: 235981, rank: 17 }, "AL": { population: 127901, rank: 18 }
      }
    },
    {
      year: 1860, label: "1860 Census", totalPopulation: 31443321,
      states: {
        "NY": { population: 3880735, rank: 1 }, "PA": { population: 2906215, rank: 2 },
        "OH": { population: 2339511, rank: 3 }, "IL": { population: 1711951, rank: 4 },
        "VA": { population: 1596318, rank: 5 }, "IN": { population: 1350428, rank: 6 },
        "MO": { population: 1182012, rank: 7 }, "KY": { population: 1155684, rank: 8 },
        "TN": { population: 1109801, rank: 9 }, "MA": { population: 1231066, rank: 10 },
        "GA": { population: 1057286, rank: 11 }, "NC": { population: 992622, rank: 12 },
        "WI": { population: 775881, rank: 13 }, "MI": { population: 749113, rank: 14 },
        "AL": { population: 964201, rank: 15 }, "TX": { population: 604215, rank: 16 },
        "SC": { population: 703708, rank: 17 }, "MD": { population: 687049, rank: 18 },
        "IA": { population: 674913, rank: 19 }, "MS": { population: 791305, rank: 20 },
        "NJ": { population: 672035, rank: 21 }, "AR": { population: 435450, rank: 22 },
        "CT": { population: 460147, rank: 23 }, "LA": { population: 708002, rank: 24 },
        "ME": { population: 628279, rank: 25 }, "MN": { population: 172023, rank: 26 }
      }
    },
    {
      year: 1900, label: "1900 Census", totalPopulation: 76212168,
      states: {
        "NY": { population: 7268894, rank: 1 }, "PA": { population: 6302115, rank: 2 },
        "IL": { population: 4821550, rank: 3 }, "OH": { population: 4157545, rank: 4 },
        "MO": { population: 3106665, rank: 5 }, "TX": { population: 3048710, rank: 6 },
        "IN": { population: 2516462, rank: 7 }, "MA": { population: 2805346, rank: 8 },
        "MI": { population: 2420982, rank: 9 }, "IA": { population: 2231853, rank: 10 },
        "GA": { population: 2216331, rank: 11 }, "TN": { population: 2020616, rank: 12 },
        "VA": { population: 1854184, rank: 13 }, "KY": { population: 2147174, rank: 14 },
        "WI": { population: 2069042, rank: 15 }, "KS": { population: 1470495, rank: 16 },
        "NC": { population: 1893810, rank: 17 }, "AL": { population: 1828697, rank: 18 },
        "NJ": { population: 1883669, rank: 19 }, "MN": { population: 1751394, rank: 20 },
        "CA": { population: 1485053, rank: 21 }, "MS": { population: 1551270, rank: 22 },
        "AR": { population: 1311564, rank: 23 }, "LA": { population: 1381625, rank: 24 },
        "NE": { population: 1066300, rank: 25 }
      }
    },
    {
      year: 1950, label: "1950 Census", totalPopulation: 151325798,
      states: {
        "NY": { population: 14830192, rank: 1 }, "CA": { population: 10586223, rank: 2 },
        "PA": { population: 10498012, rank: 3 }, "IL": { population: 8712176, rank: 4 },
        "OH": { population: 7946627, rank: 5 }, "TX": { population: 7711194, rank: 6 },
        "MI": { population: 6371766, rank: 7 }, "NJ": { population: 4835329, rank: 8 },
        "MA": { population: 4690514, rank: 9 }, "MO": { population: 3954653, rank: 10 },
        "IN": { population: 3934224, rank: 11 }, "NC": { population: 4061929, rank: 12 },
        "WI": { population: 3434575, rank: 13 }, "GA": { population: 3444578, rank: 14 },
        "MN": { population: 2982483, rank: 15 }, "TN": { population: 3291718, rank: 16 },
        "VA": { population: 3318680, rank: 17 }, "AL": { population: 3061743, rank: 18 },
        "KY": { population: 2944806, rank: 19 }, "LA": { population: 2683516, rank: 20 },
        "WA": { population: 2378963, rank: 21 }, "FL": { population: 2771305, rank: 22 }
      }
    },
    {
      year: 1980, label: "1980 Census", totalPopulation: 226545805,
      states: {
        "CA": { population: 23667902, rank: 1 }, "NY": { population: 17558072, rank: 2 },
        "TX": { population: 14229191, rank: 3 }, "PA": { population: 11863895, rank: 4 },
        "IL": { population: 11426518, rank: 5 }, "OH": { population: 10797630, rank: 6 },
        "FL": { population: 9746961, rank: 7 }, "MI": { population: 9262078, rank: 8 },
        "NJ": { population: 7364823, rank: 9 }, "NC": { population: 5881766, rank: 10 },
        "GA": { population: 5463105, rank: 11 }, "VA": { population: 5346818, rank: 12 },
        "MA": { population: 5737037, rank: 13 }, "IN": { population: 5490224, rank: 14 },
        "MO": { population: 4916686, rank: 15 }, "WI": { population: 4705767, rank: 16 },
        "TN": { population: 4591120, rank: 17 }, "WA": { population: 4132156, rank: 18 },
        "MN": { population: 4075970, rank: 19 }, "MD": { population: 4216975, rank: 20 },
        "LA": { population: 4205900, rank: 21 }, "AL": { population: 3893888, rank: 22 }
      }
    },
    {
      year: 2010, label: "2010 Census", totalPopulation: 308745538,
      states: {
        "CA": { population: 37253956, rank: 1 }, "TX": { population: 25145561, rank: 2 },
        "NY": { population: 19378102, rank: 3 }, "FL": { population: 18801310, rank: 4 },
        "IL": { population: 12830632, rank: 5 }, "PA": { population: 12702379, rank: 6 },
        "OH": { population: 11536504, rank: 7 }, "MI": { population: 9883640, rank: 8 },
        "GA": { population: 9687653, rank: 9 }, "NC": { population: 9535483, rank: 10 },
        "NJ": { population: 8791894, rank: 11 }, "VA": { population: 8001024, rank: 12 },
        "WA": { population: 6724540, rank: 13 }, "AZ": { population: 6392017, rank: 14 },
        "MA": { population: 6547629, rank: 15 }, "IN": { population: 6483802, rank: 16 },
        "TN": { population: 6346105, rank: 17 }, "MO": { population: 5988927, rank: 18 },
        "MD": { population: 5773552, rank: 19 }, "WI": { population: 5686986, rank: 20 },
        "MN": { population: 5303925, rank: 21 }, "CO": { population: 5029196, rank: 22 },
        "AL": { population: 4779736, rank: 23 }, "SC": { population: 4625364, rank: 24 },
        "LA": { population: 4533372, rank: 25 }
      }
    },
    {
      year: 2020, label: "2020 Census", totalPopulation: 331449281,
      states: {
        "CA": { population: 39538223, rank: 1 }, "TX": { population: 29145505, rank: 2 },
        "FL": { population: 21538187, rank: 3 }, "NY": { population: 20201249, rank: 4 },
        "PA": { population: 13002700, rank: 5 }, "IL": { population: 12812508, rank: 6 },
        "OH": { population: 11799448, rank: 7 }, "GA": { population: 10711908, rank: 8 },
        "NC": { population: 10439388, rank: 9 }, "MI": { population: 10077331, rank: 10 },
        "NJ": { population: 9288994, rank: 11 }, "VA": { population: 8631393, rank: 12 },
        "WA": { population: 7705281, rank: 13 }, "AZ": { population: 7151502, rank: 14 },
        "TN": { population: 6910840, rank: 15 }, "MA": { population: 7029917, rank: 16 },
        "IN": { population: 6785528, rank: 17 }, "MO": { population: 6154913, rank: 18 },
        "MD": { population: 6177224, rank: 19 }, "CO": { population: 5773714, rank: 20 },
        "WI": { population: 5893718, rank: 21 }, "MN": { population: 5706494, rank: 22 },
        "SC": { population: 5118425, rank: 23 }, "AL": { population: 5024279, rank: 24 },
        "LA": { population: 4657757, rank: 25 }, "KY": { population: 4505836, rank: 26 },
        "OR": { population: 4237256, rank: 27 }, "OK": { population: 3959353, rank: 28 },
        "CT": { population: 3605944, rank: 29 }, "UT": { population: 3271616, rank: 30 },
        "IA": { population: 3190369, rank: 31 }, "NV": { population: 3104614, rank: 32 },
        "AR": { population: 3011524, rank: 33 }, "MS": { population: 2961279, rank: 34 },
        "KS": { population: 2937880, rank: 35 }, "NM": { population: 2117522, rank: 36 },
        "NE": { population: 1961504, rank: 37 }, "ID": { population: 1839106, rank: 38 },
        "WV": { population: 1793716, rank: 39 }, "HI": { population: 1455271, rank: 40 },
        "NH": { population: 1377529, rank: 41 }, "ME": { population: 1362359, rank: 42 },
        "MT": { population: 1084225, rank: 43 }, "RI": { population: 1097379, rank: 44 },
        "DE": { population: 989948, rank: 45 }, "SD": { population: 886667, rank: 46 },
        "ND": { population: 779094, rank: 47 }, "AK": { population: 733391, rank: 48 },
        "DC": { population: 689545, rank: 49 }, "VT": { population: 643077, rank: 50 },
        "WY": { population: 576851, rank: 51 }
      }
    }
  ]
};
