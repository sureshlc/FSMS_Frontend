export const unitsMap = (unit) => {
  const maps = {
    T: "Tonnes",
  };
  if (maps[unit]) {
    return maps[unit];
  }
  return unit;
};

export const unitMapping = {
  "kcal/pc/d": "kcal",
  "%": "%",
  "kcal/cap/day": "kcal",
  "kcal/capita/day": "kcal",
  "g/cap/day": "g/cap/day", //Modified : 2024_10_01
  ha: "ha",
  t: "T",
  usd: "$",
  "100 g/h": "g",
  "million usd": "M$",
  "usd/tonne": "$/T",
  "usd/m3": (
    <div>
      $/m <sup>3</sup>
    </div>
  ),
  "tonnes/person/year": "T",
  kg: "kg",
  tonnes: "T",
  "constant 2014-2016 thousand int$": "I$",
  "2015 = 100": " ",
  "2014-2016 = 100": " ",
  "million tonnes co2eq": "MT",
  "million tonnes": "T",
  "1000 tonnes": "KT",
};
