/* global SPACE_MISSIONS */
var SPACE_MISSIONS = {
  id: "space-missions",
  title: "Countries in Space",
  vizType: "world-map",
  legendTitle: "Space capability level",
  note: "Cumulative space achievements by country through each year shown.",
  tiers: {
    "crewed":    { label: "Crewed spaceflight", color: "#6c3483" },
    "lunar":     { label: "Moon mission", color: "#c0392b" },
    "satellite": { label: "Own satellite", color: "#2471a3" },
    "orbital":   { label: "Orbital launch", color: "#117a65" }
  },
  frames: [
    {
      year: 1957, label: "1957",
      milestone: "Sputnik 1 — first satellite in orbit",
      note: "The Space Age begins. The USSR stuns the world.",
      countries: {
        "RUS": { tier: "satellite", label: "Sputnik 1 (1957)", color: "#6c3483", note: "First satellite ever" }
      }
    },
    {
      year: 1958, label: "1958",
      milestone: "USA launches Explorer 1",
      note: "The space race between superpowers intensifies.",
      countries: {
        "RUS": { tier: "satellite", label: "Sputnik series", color: "#6c3483" },
        "USA": { tier: "satellite", label: "Explorer 1 (1958)", color: "#2471a3", note: "First US satellite" }
      }
    },
    {
      year: 1961, label: "1961",
      milestone: "Yuri Gagarin — first human in space",
      note: "USSR puts a man in orbit. Kennedy launches Moon program.",
      countries: {
        "RUS": { tier: "crewed", label: "Vostok 1 — Gagarin (1961)", color: "#6c3483", note: "First human in space" },
        "USA": { tier: "crewed", label: "Freedom 7 — Shepard (1961)", color: "#c0392b", note: "First American in space" }
      }
    },
    {
      year: 1965, label: "1965",
      milestone: "Leonov spacewalk. France launches Astérix.",
      note: "Third country enters space independently.",
      countries: {
        "RUS": { tier: "crewed", label: "Voskhod 2 — spacewalk (1965)", color: "#6c3483" },
        "USA": { tier: "crewed", label: "Gemini program", color: "#c0392b" },
        "FRA": { tier: "satellite", label: "Astérix satellite (1965)", color: "#2471a3", note: "Third country in space" }
      }
    },
    {
      year: 1969, label: "1969",
      milestone: "Apollo 11 — humans walk on the Moon",
      note: "Armstrong: 'One small step for man…' The defining achievement of the 20th century.",
      countries: {
        "RUS": { tier: "crewed", label: "Soyuz program", color: "#6c3483" },
        "USA": { tier: "lunar", label: "Apollo 11 Moon landing (1969)", color: "#c0392b", note: "First humans on the Moon" },
        "FRA": { tier: "satellite", label: "FR satellites", color: "#2471a3" },
        "AUS": { tier: "satellite", label: "WRESAT (1967)", color: "#2471a3", note: "" },
        "JPN": { tier: "satellite", label: "Osumi satellite (1970)", color: "#2471a3", note: "" }
      }
    },
    {
      year: 1975, label: "1975",
      milestone: "Apollo-Soyuz — US-USSR handshake in orbit",
      note: "Détente reaches space. China launches independently.",
      countries: {
        "RUS": { tier: "crewed", label: "Soyuz program", color: "#6c3483" },
        "USA": { tier: "lunar", label: "Apollo-Soyuz docking (1975)", color: "#c0392b" },
        "FRA": { tier: "satellite", label: "FR satellites", color: "#2471a3" },
        "CHN": { tier: "satellite", label: "Dong Fang Hong (1970)", color: "#2471a3", note: "5th country in space" },
        "GBR": { tier: "satellite", label: "Prospero (1971)", color: "#2471a3", note: "" },
        "JPN": { tier: "satellite", label: "NASDA formed", color: "#2471a3" },
        "IND": { tier: "satellite", label: "Aryabhata (1975)", color: "#117a65", note: "India's first satellite" }
      }
    },
    {
      year: 1981, label: "1981",
      milestone: "NASA Space Shuttle — first reusable spacecraft",
      note: "Columbia's maiden flight redefines spaceflight.",
      countries: {
        "RUS": { tier: "crewed", label: "Mir space station planned", color: "#6c3483" },
        "USA": { tier: "lunar", label: "Space Shuttle Columbia (1981)", color: "#c0392b", note: "First reusable spacecraft" },
        "FRA": { tier: "orbital", label: "Ariane rocket (1979)", color: "#117a65", note: "Independent launch capability" },
        "CHN": { tier: "satellite", label: "CZ-2 rockets", color: "#2471a3" },
        "JPN": { tier: "orbital", label: "N-II rocket (1981)", color: "#117a65" },
        "IND": { tier: "satellite", label: "ISRO grows", color: "#2471a3" },
        "GBR": { tier: "satellite", label: "UK satellites", color: "#2471a3" }
      }
    },
    {
      year: 1994, label: "1994",
      milestone: "International Space Station planning begins",
      note: "Post-Cold War — Russia and USA plan joint station.",
      countries: {
        "RUS": { tier: "crewed", label: "Mir space station (1986)", color: "#6c3483", note: "First modular space station" },
        "USA": { tier: "lunar", label: "ISS planning with Russia", color: "#c0392b" },
        "FRA": { tier: "orbital", label: "Ariane 4 dominates commercial market", color: "#117a65" },
        "CHN": { tier: "satellite", label: "Long March rockets", color: "#2471a3" },
        "JPN": { tier: "orbital", label: "H-II rocket", color: "#117a65" },
        "IND": { tier: "orbital", label: "PSLV rocket (1993)", color: "#117a65", note: "Own launch vehicle" },
        "ISR": { tier: "satellite", label: "Ofeq-3 (1992)", color: "#2471a3" },
        "BRA": { tier: "satellite", label: "INPE satellites", color: "#2471a3" }
      }
    },
    {
      year: 2003, label: "2003",
      milestone: "China sends Yang Liwei to orbit — 3rd crewed nation",
      note: "The space club of crewed spaceflight grows to three. Colombia shuttle disaster.",
      countries: {
        "RUS": { tier: "crewed", label: "Soyuz — ISS ferry", color: "#6c3483" },
        "USA": { tier: "lunar", label: "ISS + Shuttle program", color: "#c0392b" },
        "CHN": { tier: "crewed", label: "Shenzhou 5 — Yang Liwei (2003)", color: "#6c3483", note: "3rd crewed spaceflight nation" },
        "FRA": { tier: "orbital", label: "Ariane 5 dominant", color: "#117a65" },
        "JPN": { tier: "orbital", label: "H-IIA rocket", color: "#117a65" },
        "IND": { tier: "orbital", label: "PSLV maturing", color: "#117a65" },
        "ISR": { tier: "satellite", label: "Ofeq series", color: "#2471a3" },
        "BRA": { tier: "satellite", label: "VLS rocket (failed)", color: "#2471a3" },
        "IRN": { tier: "satellite", label: "Sina-1 (2005)", color: "#2471a3" }
      }
    },
    {
      year: 2013, label: "2013",
      milestone: "India's Mars Orbiter Mission. SpaceX disrupts industry.",
      note: "Commercial spaceflight arrives. India reaches Mars on first attempt.",
      countries: {
        "RUS": { tier: "crewed", label: "ISS partner", color: "#6c3483" },
        "USA": { tier: "lunar", label: "SpaceX Falcon 9 commercial launches", color: "#c0392b" },
        "CHN": { tier: "crewed", label: "Tiangong-1 space lab", color: "#6c3483" },
        "FRA": { tier: "orbital", label: "Arianespace", color: "#117a65" },
        "JPN": { tier: "orbital", label: "HTV cargo to ISS", color: "#117a65" },
        "IND": { tier: "orbital", label: "Mangalyaan Mars mission (2013)", color: "#c0392b", note: "First Asian country to reach Mars" },
        "ISR": { tier: "satellite", label: "Reconnaissance sats", color: "#2471a3" },
        "IRN": { tier: "orbital", label: "Safir rocket", color: "#117a65" },
        "NKO": { tier: "orbital", label: "Kwangmyŏngsŏng-3 (2012)", color: "#2471a3", note: "" },
        "PRK": { tier: "orbital", label: "Unha rocket (2012)", color: "#117a65" }
      }
    },
    {
      year: 2020, label: "2020",
      milestone: "SpaceX Dragon — private crewed spaceflight begins",
      note: "Commercial era transforms access to space. UAE, China reach Mars.",
      countries: {
        "RUS": { tier: "crewed", label: "Soyuz, ISS", color: "#6c3483" },
        "USA": { tier: "lunar", label: "SpaceX Crew Dragon (2020)", color: "#c0392b", note: "First commercial crewed flight" },
        "CHN": { tier: "crewed", label: "Tianhe space station begun", color: "#6c3483" },
        "FRA": { tier: "orbital", label: "Ariane 5 / Vega", color: "#117a65" },
        "JPN": { tier: "orbital", label: "H3 rocket in development", color: "#117a65" },
        "IND": { tier: "orbital", label: "Chandrayaan-2 / Gaganyaan planned", color: "#c0392b" },
        "ARE": { tier: "orbital", label: "Hope Mars Mission (2020)", color: "#2471a3", note: "First Arab country to Mars" },
        "ISR": { tier: "satellite", label: "Beresheet Moon attempt (2019)", color: "#2471a3" },
        "NZL": { tier: "orbital", label: "Rocket Lab launches", color: "#117a65" },
        "KOR": { tier: "orbital", label: "Nuri rocket (2021)", color: "#117a65" }
      }
    },
    {
      year: 2024, label: "2024",
      milestone: "India lands on Moon's south pole. Artemis era begins.",
      note: "India becomes 4th nation to land on the Moon. Commercial space booms.",
      countries: {
        "RUS": { tier: "crewed", label: "Soyuz, Lunar 25 (crashed)", color: "#6c3483" },
        "USA": { tier: "lunar", label: "Artemis program, Orion", color: "#c0392b", note: "Return to Moon planned" },
        "CHN": { tier: "crewed", label: "Tiangong CSS station operational", color: "#6c3483" },
        "FRA": { tier: "orbital", label: "Ariane 6 debut", color: "#117a65" },
        "JPN": { tier: "lunar", label: "SLIM lunar lander (2024)", color: "#c0392b", note: "Precision landing demonstration" },
        "IND": { tier: "lunar", label: "Chandrayaan-3 — South Pole (2023)", color: "#c0392b", note: "First Moon south pole landing" },
        "ARE": { tier: "orbital", label: "Rashid 2 moon rover planned", color: "#2471a3" },
        "NZL": { tier: "orbital", label: "Rocket Lab Electron commercial", color: "#117a65" },
        "KOR": { tier: "orbital", label: "Nuri launches", color: "#117a65" },
        "SAU": { tier: "crewed", label: "AX-2 ISS mission (2023)", color: "#2471a3" }
      }
    }
  ]
};
