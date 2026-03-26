/* global TALLEST_BUILDINGS */
var TALLEST_BUILDINGS = {
  id: "tallest-buildings",
  title: "World's Tallest Buildings",
  vizType: "ranking",
  itemLabel: "Building",
  valueLabel: "Height (m)",
  note: "Height to architectural top. World record holder highlighted.",
  frames: [
    {
      year: 1885, label: "1885",
      items: [
        { rank: 1, name: "Home Insurance Building", sublabel: "Chicago, USA", value: 55, color: "#4878d0", note: "First skyscraper with steel frame" },
        { rank: 2, name: "Pulitzer Building", sublabel: "New York, USA", value: 94, color: "#4878d0", note: "Completed 1890" },
        { rank: 3, name: "Wainwright Building", sublabel: "St. Louis, USA", value: 57, color: "#4878d0", note: "" }
      ]
    },
    {
      year: 1890, label: "1890",
      items: [
        { rank: 1, name: "Pulitzer Building", sublabel: "New York, USA", value: 94, color: "#4878d0", note: "World's tallest 1890–1894" },
        { rank: 2, name: "Home Insurance Building", sublabel: "Chicago, USA", value: 55, color: "#4878d0", note: "" },
        { rank: 3, name: "Rand McNally Building", sublabel: "Chicago, USA", value: 54, color: "#4878d0", note: "" }
      ]
    },
    {
      year: 1895, label: "1895",
      items: [
        { rank: 1, name: "Manhattan Life Bldg", sublabel: "New York, USA", value: 106, color: "#4878d0", note: "World's tallest 1894–1895" },
        { rank: 2, name: "American Surety Bldg", sublabel: "New York, USA", value: 95, color: "#4878d0", note: "" },
        { rank: 3, name: "Pulitzer Building", sublabel: "New York, USA", value: 94, color: "#4878d0", note: "" }
      ]
    },
    {
      year: 1900, label: "1900",
      items: [
        { rank: 1, name: "Park Row Building", sublabel: "New York, USA", value: 119, color: "#4878d0", note: "World's tallest 1899–1908" },
        { rank: 2, name: "St. Paul Building", sublabel: "New York, USA", value: 94, color: "#4878d0", note: "" },
        { rank: 3, name: "American Surety Bldg", sublabel: "New York, USA", value: 95, color: "#4878d0", note: "" },
        { rank: 4, name: "Pulitzer Building", sublabel: "New York, USA", value: 94, color: "#4878d0", note: "" },
        { rank: 5, name: "Masonic Temple", sublabel: "Chicago, USA", value: 92, color: "#6b94d6", note: "" }
      ]
    },
    {
      year: 1909, label: "1909",
      items: [
        { rank: 1, name: "Singer Building", sublabel: "New York, USA", value: 186, color: "#c04040", note: "World's tallest 1908–1909" },
        { rank: 2, name: "Park Row Building", sublabel: "New York, USA", value: 119, color: "#4878d0", note: "" },
        { rank: 3, name: "Metropolitan Life Tower", sublabel: "New York, USA", value: 213, color: "#c04040", note: "Under construction" },
        { rank: 4, name: "St. Paul Building", sublabel: "New York, USA", value: 94, color: "#4878d0", note: "" }
      ]
    },
    {
      year: 1913, label: "1913",
      items: [
        { rank: 1, name: "Woolworth Building", sublabel: "New York, USA", value: 241, color: "#c04040", note: "Cathedral of Commerce — world's tallest 1913–1930" },
        { rank: 2, name: "Metropolitan Life Tower", sublabel: "New York, USA", value: 213, color: "#4878d0", note: "" },
        { rank: 3, name: "Singer Building", sublabel: "New York, USA", value: 186, color: "#4878d0", note: "" },
        { rank: 4, name: "Park Row Building", sublabel: "New York, USA", value: 119, color: "#4878d0", note: "" },
        { rank: 5, name: "City Investing Building", sublabel: "New York, USA", value: 126, color: "#4878d0", note: "" }
      ]
    },
    {
      year: 1930, label: "1930",
      items: [
        { rank: 1, name: "Chrysler Building", sublabel: "New York, USA", value: 319, color: "#c04040", note: "World's tallest for just 11 months" },
        { rank: 2, name: "40 Wall Street", sublabel: "New York, USA", value: 283, color: "#4878d0", note: "" },
        { rank: 3, name: "Woolworth Building", sublabel: "New York, USA", value: 241, color: "#4878d0", note: "" },
        { rank: 4, name: "Metropolitan Life Tower", sublabel: "New York, USA", value: 213, color: "#4878d0", note: "" },
        { rank: 5, name: "Singer Building", sublabel: "New York, USA", value: 186, color: "#4878d0", note: "" }
      ]
    },
    {
      year: 1931, label: "1931",
      items: [
        { rank: 1, name: "Empire State Building", sublabel: "New York, USA", value: 443, color: "#c04040", note: "Held world record for 40 years (1931–1971)" },
        { rank: 2, name: "Chrysler Building", sublabel: "New York, USA", value: 319, color: "#4878d0", note: "" },
        { rank: 3, name: "40 Wall Street", sublabel: "New York, USA", value: 283, color: "#4878d0", note: "" },
        { rank: 4, name: "Woolworth Building", sublabel: "New York, USA", value: 241, color: "#4878d0", note: "" },
        { rank: 5, name: "Metropolitan Life Tower", sublabel: "New York, USA", value: 213, color: "#4878d0", note: "" }
      ]
    },
    {
      year: 1972, label: "1972",
      items: [
        { rank: 1, name: "World Trade Center (N)", sublabel: "New York, USA", value: 417, color: "#c04040", note: "Twin towers — world's tallest 1972–1973" },
        { rank: 2, name: "Empire State Building", sublabel: "New York, USA", value: 443, color: "#4878d0", note: "Still taller by 26m!" },
        { rank: 3, name: "Chrysler Building", sublabel: "New York, USA", value: 319, color: "#4878d0", note: "" },
        { rank: 4, name: "40 Wall Street", sublabel: "New York, USA", value: 283, color: "#4878d0", note: "" },
        { rank: 5, name: "Woolworth Building", sublabel: "New York, USA", value: 241, color: "#4878d0", note: "" }
      ]
    },
    {
      year: 1974, label: "1974",
      items: [
        { rank: 1, name: "Sears Tower (Willis)", sublabel: "Chicago, USA", value: 442, color: "#c04040", note: "World's tallest 1974–1998" },
        { rank: 2, name: "World Trade Center (N)", sublabel: "New York, USA", value: 417, color: "#4878d0", note: "" },
        { rank: 3, name: "Empire State Building", sublabel: "New York, USA", value: 381, color: "#4878d0", note: "" },
        { rank: 4, name: "John Hancock Center", sublabel: "Chicago, USA", value: 344, color: "#6b94d6", note: "" },
        { rank: 5, name: "Chrysler Building", sublabel: "New York, USA", value: 319, color: "#4878d0", note: "" }
      ]
    },
    {
      year: 1998, label: "1998",
      items: [
        { rank: 1, name: "Petronas Tower 1", sublabel: "Kuala Lumpur, Malaysia", value: 452, color: "#c04040", note: "First non-US building to hold world record" },
        { rank: 2, name: "Petronas Tower 2", sublabel: "Kuala Lumpur, Malaysia", value: 452, color: "#d05050", note: "Twin towers, same height" },
        { rank: 3, name: "Sears Tower (Willis)", sublabel: "Chicago, USA", value: 442, color: "#4878d0", note: "" },
        { rank: 4, name: "Jin Mao Tower", sublabel: "Shanghai, China", value: 421, color: "#c84040", note: "" },
        { rank: 5, name: "One World Trade", sublabel: "New York, USA", value: 417, color: "#4878d0", note: "" },
        { rank: 6, name: "Empire State Building", sublabel: "New York, USA", value: 381, color: "#4878d0", note: "" },
        { rank: 7, name: "T&C Tower", sublabel: "Kaohsiung, Taiwan", value: 348, color: "#c04040", note: "" },
        { rank: 8, name: "Aon Center", sublabel: "Chicago, USA", value: 346, color: "#4878d0", note: "" }
      ]
    },
    {
      year: 2004, label: "2004",
      items: [
        { rank: 1, name: "Taipei 101", sublabel: "Taipei, Taiwan", value: 508, color: "#c04040", note: "World's tallest 2004–2010" },
        { rank: 2, name: "Petronas Towers", sublabel: "Kuala Lumpur, Malaysia", value: 452, color: "#8b3a3a", note: "" },
        { rank: 3, name: "Sears Tower (Willis)", sublabel: "Chicago, USA", value: 442, color: "#4878d0", note: "" },
        { rank: 4, name: "Jin Mao Tower", sublabel: "Shanghai, China", value: 421, color: "#c84040", note: "" },
        { rank: 5, name: "Two IFC", sublabel: "Hong Kong, China", value: 415, color: "#c84040", note: "" },
        { rank: 6, name: "CITIC Plaza", sublabel: "Guangzhou, China", value: 391, color: "#c84040", note: "" },
        { rank: 7, name: "Shun Hing Square", sublabel: "Shenzhen, China", value: 384, color: "#c84040", note: "" },
        { rank: 8, name: "Empire State Building", sublabel: "New York, USA", value: 381, color: "#4878d0", note: "" }
      ]
    },
    {
      year: 2010, label: "2010",
      items: [
        { rank: 1, name: "Burj Khalifa", sublabel: "Dubai, UAE", value: 828, color: "#c04040", note: "World's tallest since 2010 — smashed all previous records" },
        { rank: 2, name: "Taipei 101", sublabel: "Taipei, Taiwan", value: 508, color: "#c84040", note: "" },
        { rank: 3, name: "Shanghai World Financial", sublabel: "Shanghai, China", value: 492, color: "#c84040", note: "" },
        { rank: 4, name: "International Commerce", sublabel: "Hong Kong, China", value: 484, color: "#c84040", note: "" },
        { rank: 5, name: "Petronas Towers", sublabel: "Kuala Lumpur, Malaysia", value: 452, color: "#8b3a3a", note: "" },
        { rank: 6, name: "Zifeng Tower", sublabel: "Nanjing, China", value: 450, color: "#c84040", note: "" },
        { rank: 7, name: "Willis Tower", sublabel: "Chicago, USA", value: 442, color: "#4878d0", note: "" },
        { rank: 8, name: "KK100", sublabel: "Shenzhen, China", value: 442, color: "#c84040", note: "" },
        { rank: 9, name: "Guangzhou IFC", sublabel: "Guangzhou, China", value: 440, color: "#c84040", note: "" },
        { rank: 10, name: "Trump Int'l Hotel", sublabel: "Chicago, USA", value: 423, color: "#4878d0", note: "" }
      ]
    },
    {
      year: 2016, label: "2016",
      items: [
        { rank: 1, name: "Burj Khalifa", sublabel: "Dubai, UAE", value: 828, color: "#c04040", note: "Still record holder" },
        { rank: 2, name: "Shanghai Tower", sublabel: "Shanghai, China", value: 632, color: "#c84040", note: "Completed 2015" },
        { rank: 3, name: "Makkah Clock Tower", sublabel: "Mecca, Saudi Arabia", value: 601, color: "#8b4040", note: "" },
        { rank: 4, name: "Ping An Finance", sublabel: "Shenzhen, China", value: 599, color: "#c84040", note: "" },
        { rank: 5, name: "Lotte World Tower", sublabel: "Seoul, South Korea", value: 555, color: "#b04040", note: "" },
        { rank: 6, name: "One World Trade", sublabel: "New York, USA", value: 541, color: "#4878d0", note: "" },
        { rank: 7, name: "Guangzhou CTF Finance", sublabel: "Guangzhou, China", value: 530, color: "#c84040", note: "" },
        { rank: 8, name: "Tianjin CTF Finance", sublabel: "Tianjin, China", value: 530, color: "#c84040", note: "" },
        { rank: 9, name: "CITIC Tower", sublabel: "Beijing, China", value: 528, color: "#c84040", note: "" },
        { rank: 10, name: "Taipei 101", sublabel: "Taipei, Taiwan", value: 508, color: "#c84040", note: "" }
      ]
    },
    {
      year: 2024, label: "2024",
      items: [
        { rank: 1, name: "Burj Khalifa", sublabel: "Dubai, UAE", value: 828, color: "#c04040", note: "Still tallest in the world — 14 years at #1" },
        { rank: 2, name: "Merdeka 118", sublabel: "Kuala Lumpur, Malaysia", value: 678, color: "#8b4040", note: "Completed 2023" },
        { rank: 3, name: "Shanghai Tower", sublabel: "Shanghai, China", value: 632, color: "#c84040", note: "" },
        { rank: 4, name: "Makkah Clock Tower", sublabel: "Mecca, Saudi Arabia", value: 601, color: "#8b4040", note: "" },
        { rank: 5, name: "Ping An Finance", sublabel: "Shenzhen, China", value: 599, color: "#c84040", note: "" },
        { rank: 6, name: "Goldin Finance 117", sublabel: "Tianjin, China", value: 597, color: "#c84040", note: "" },
        { rank: 7, name: "Lotte World Tower", sublabel: "Seoul, South Korea", value: 555, color: "#b04040", note: "" },
        { rank: 8, name: "One World Trade Center", sublabel: "New York, USA", value: 541, color: "#4878d0", note: "" },
        { rank: 9, name: "Guangzhou CTF Finance", sublabel: "Guangzhou, China", value: 530, color: "#c84040", note: "" },
        { rank: 10, name: "Tianjin CTF Finance", sublabel: "Tianjin, China", value: 530, color: "#c84040", note: "" }
      ]
    }
  ]
};
