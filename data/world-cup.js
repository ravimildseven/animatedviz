/* global WORLD_CUP */
var WORLD_CUP = {
  id: "world-cup",
  title: "FIFA World Cup Winners",
  vizType: "world-map",
  legendTitle: "Cumulative World Cup wins",
  note: "Map shows cumulative wins by each country through the selected tournament.",
  // Country colors by cumulative wins (computed at render time)
  winColors: {
    1: "#fdd835",
    2: "#f9a825",
    3: "#fb8c00",
    4: "#e65100",
    5: "#b71c1c"
  },
  // ISO alpha-3 country codes
  frames: [
    {
      year: 1930, label: "1930 — Uruguay",
      winner: "Uruguay", winnerISO: "URY",
      host: "Uruguay", hostISO: "URY",
      final: "Uruguay 4–2 Argentina",
      runnerUp: "Argentina", runnerUpISO: "ARG",
      teams: 13, note: "First ever World Cup. South American & European teams only.",
      cumulativeWins: { "URY": 1 }
    },
    {
      year: 1934, label: "1934 — Italy",
      winner: "Italy", winnerISO: "ITA",
      host: "Italy", hostISO: "ITA",
      final: "Italy 2–1 Czechoslovakia (AET)",
      runnerUp: "Czechoslovakia", runnerUpISO: "CZE",
      teams: 16, note: "Uruguay boycotted in retaliation for 1930.",
      cumulativeWins: { "URY": 1, "ITA": 1 }
    },
    {
      year: 1938, label: "1938 — Italy",
      winner: "Italy", winnerISO: "ITA",
      host: "France", hostISO: "FRA",
      final: "Italy 4–2 Hungary",
      runnerUp: "Hungary", runnerUpISO: "HUN",
      teams: 15, note: "Italy became first back-to-back champions.",
      cumulativeWins: { "URY": 1, "ITA": 2 }
    },
    {
      year: 1950, label: "1950 — Uruguay",
      winner: "Uruguay", winnerISO: "URY",
      host: "Brazil", hostISO: "BRA",
      final: "Round-robin final: Uruguay 2–1 Brazil",
      runnerUp: "Brazil", runnerUpISO: "BRA",
      teams: 13, note: "No 1942/1946 tournaments due to WWII. The 'Maracanazo' — Uruguay stunned host Brazil.",
      cumulativeWins: { "URY": 2, "ITA": 2 }
    },
    {
      year: 1954, label: "1954 — West Germany",
      winner: "West Germany", winnerISO: "DEU",
      host: "Switzerland", hostISO: "CHE",
      final: "West Germany 3–2 Hungary",
      runnerUp: "Hungary", runnerUpISO: "HUN",
      teams: 16, note: "The Miracle of Bern — Hungary was unbeaten in 4 years.",
      cumulativeWins: { "URY": 2, "ITA": 2, "DEU": 1 }
    },
    {
      year: 1958, label: "1958 — Brazil",
      winner: "Brazil", winnerISO: "BRA",
      host: "Sweden", hostISO: "SWE",
      final: "Brazil 5–2 Sweden",
      runnerUp: "Sweden", runnerUpISO: "SWE",
      teams: 16, note: "17-year-old Pelé scored twice in the final. Brazil's first title.",
      cumulativeWins: { "URY": 2, "ITA": 2, "DEU": 1, "BRA": 1 }
    },
    {
      year: 1962, label: "1962 — Brazil",
      winner: "Brazil", winnerISO: "BRA",
      host: "Chile", hostISO: "CHL",
      final: "Brazil 3–1 Czechoslovakia",
      runnerUp: "Czechoslovakia", runnerUpISO: "CZE",
      teams: 16, note: "Pelé injured early but Garrincha stepped up brilliantly.",
      cumulativeWins: { "URY": 2, "ITA": 2, "DEU": 1, "BRA": 2 }
    },
    {
      year: 1966, label: "1966 — England",
      winner: "England", winnerISO: "GBR",
      host: "England", hostISO: "GBR",
      final: "England 4–2 West Germany (AET)",
      runnerUp: "West Germany", runnerUpISO: "DEU",
      teams: 16, note: "Geoff Hurst scored a hat-trick. Still England's only title.",
      cumulativeWins: { "URY": 2, "ITA": 2, "DEU": 1, "BRA": 2, "GBR": 1 }
    },
    {
      year: 1970, label: "1970 — Brazil",
      winner: "Brazil", winnerISO: "BRA",
      host: "Mexico", hostISO: "MEX",
      final: "Brazil 4–1 Italy",
      runnerUp: "Italy", runnerUpISO: "ITA",
      teams: 16, note: "The greatest team ever assembled? Brazil kept the Jules Rimet Trophy permanently.",
      cumulativeWins: { "URY": 2, "ITA": 2, "DEU": 1, "BRA": 3, "GBR": 1 }
    },
    {
      year: 1974, label: "1974 — West Germany",
      winner: "West Germany", winnerISO: "DEU",
      host: "West Germany", hostISO: "DEU",
      final: "West Germany 2–1 Netherlands",
      runnerUp: "Netherlands", runnerUpISO: "NLD",
      teams: 16, note: "Dutch 'Total Football' was revolutionary. Cruyff was extraordinary.",
      cumulativeWins: { "URY": 2, "ITA": 2, "DEU": 2, "BRA": 3, "GBR": 1 }
    },
    {
      year: 1978, label: "1978 — Argentina",
      winner: "Argentina", winnerISO: "ARG",
      host: "Argentina", hostISO: "ARG",
      final: "Argentina 3–1 Netherlands (AET)",
      runnerUp: "Netherlands", runnerUpISO: "NLD",
      teams: 16, note: "Argentina's first title. Held during a military dictatorship.",
      cumulativeWins: { "URY": 2, "ITA": 2, "DEU": 2, "BRA": 3, "GBR": 1, "ARG": 1 }
    },
    {
      year: 1982, label: "1982 — Italy",
      winner: "Italy", winnerISO: "ITA",
      host: "Spain", hostISO: "ESP",
      final: "Italy 3–1 West Germany",
      runnerUp: "West Germany", runnerUpISO: "DEU",
      teams: 24, note: "Paolo Rossi was imperious. Italy's third title.",
      cumulativeWins: { "URY": 2, "ITA": 3, "DEU": 2, "BRA": 3, "GBR": 1, "ARG": 1 }
    },
    {
      year: 1986, label: "1986 — Argentina",
      winner: "Argentina", winnerISO: "ARG",
      host: "Mexico", hostISO: "MEX",
      final: "Argentina 3–2 West Germany",
      runnerUp: "West Germany", runnerUpISO: "DEU",
      teams: 24, note: "Maradona's tournament — the Hand of God and Goal of the Century in the same match.",
      cumulativeWins: { "URY": 2, "ITA": 3, "DEU": 2, "BRA": 3, "GBR": 1, "ARG": 2 }
    },
    {
      year: 1990, label: "1990 — West Germany",
      winner: "West Germany", winnerISO: "DEU",
      host: "Italy", hostISO: "ITA",
      final: "West Germany 1–0 Argentina",
      runnerUp: "Argentina", runnerUpISO: "ARG",
      teams: 24, note: "The most defensive World Cup in history. Last tournament as West Germany.",
      cumulativeWins: { "URY": 2, "ITA": 3, "DEU": 3, "BRA": 3, "GBR": 1, "ARG": 2 }
    },
    {
      year: 1994, label: "1994 — Brazil",
      winner: "Brazil", winnerISO: "BRA",
      host: "USA", hostISO: "USA",
      final: "Brazil 0–0 Italy (Brazil won on pens)",
      runnerUp: "Italy", runnerUpISO: "ITA",
      teams: 24, note: "Baggio's missed penalty. Brazil's record 4th title.",
      cumulativeWins: { "URY": 2, "ITA": 3, "DEU": 3, "BRA": 4, "GBR": 1, "ARG": 2 }
    },
    {
      year: 1998, label: "1998 — France",
      winner: "France", winnerISO: "FRA",
      host: "France", hostISO: "FRA",
      final: "France 3–0 Brazil",
      runnerUp: "Brazil", runnerUpISO: "BRA",
      teams: 32, note: "Zidane's two headers. France's first and host nation's finest moment.",
      cumulativeWins: { "URY": 2, "ITA": 3, "DEU": 3, "BRA": 4, "GBR": 1, "ARG": 2, "FRA": 1 }
    },
    {
      year: 2002, label: "2002 — Brazil",
      winner: "Brazil", winnerISO: "BRA",
      host: "Japan/South Korea",
      final: "Brazil 2–0 Germany",
      runnerUp: "Germany", runnerUpISO: "DEU",
      teams: 32, note: "Ronaldo redeemed himself 4 years after the 1998 final collapse. Brazil's record 5th title.",
      cumulativeWins: { "URY": 2, "ITA": 3, "DEU": 3, "BRA": 5, "GBR": 1, "ARG": 2, "FRA": 1 }
    },
    {
      year: 2006, label: "2006 — Italy",
      winner: "Italy", winnerISO: "ITA",
      host: "Germany", hostISO: "DEU",
      final: "Italy 1–1 France (Italy won on pens)",
      runnerUp: "France", runnerUpISO: "FRA",
      teams: 32, note: "Zidane's headbutt on Materazzi in extra time — one of football's most memorable moments.",
      cumulativeWins: { "URY": 2, "ITA": 4, "DEU": 3, "BRA": 5, "GBR": 1, "ARG": 2, "FRA": 1 }
    },
    {
      year: 2010, label: "2010 — Spain",
      winner: "Spain", winnerISO: "ESP",
      host: "South Africa", hostISO: "ZAF",
      final: "Spain 1–0 Netherlands (AET)",
      runnerUp: "Netherlands", runnerUpISO: "NLD",
      teams: 32, note: "First African World Cup. Spain's tiki-taka style dominated. Iniesta's final winner.",
      cumulativeWins: { "URY": 2, "ITA": 4, "DEU": 3, "BRA": 5, "GBR": 1, "ARG": 2, "FRA": 1, "ESP": 1 }
    },
    {
      year: 2014, label: "2014 — Germany",
      winner: "Germany", winnerISO: "DEU",
      host: "Brazil", hostISO: "BRA",
      final: "Germany 1–0 Argentina (AET)",
      runnerUp: "Argentina", runnerUpISO: "ARG",
      teams: 32, note: "7–1 against Brazil — the Mineirazo. Germany's 4th title.",
      cumulativeWins: { "URY": 2, "ITA": 4, "DEU": 4, "BRA": 5, "GBR": 1, "ARG": 2, "FRA": 1, "ESP": 1 }
    },
    {
      year: 2018, label: "2018 — France",
      winner: "France", winnerISO: "FRA",
      host: "Russia", hostISO: "RUS",
      final: "France 4–2 Croatia",
      runnerUp: "Croatia", runnerUpISO: "HRV",
      teams: 32, note: "France's young, diverse squad dominated. Mbappé became the second teenager to score in a WC final.",
      cumulativeWins: { "URY": 2, "ITA": 4, "DEU": 4, "BRA": 5, "GBR": 1, "ARG": 2, "FRA": 2, "ESP": 1 }
    },
    {
      year: 2022, label: "2022 — Argentina",
      winner: "Argentina", winnerISO: "ARG",
      host: "Qatar", hostISO: "QAT",
      final: "Argentina 3–3 France (Argentina won 4–2 on pens)",
      runnerUp: "France", runnerUpISO: "FRA",
      teams: 32, note: "Greatest World Cup final ever? Mbappe scored a hat-trick; Messi finally won the trophy he was destined for.",
      cumulativeWins: { "URY": 2, "ITA": 4, "DEU": 4, "BRA": 5, "GBR": 1, "ARG": 3, "FRA": 2, "ESP": 1 }
    }
  ]
};
