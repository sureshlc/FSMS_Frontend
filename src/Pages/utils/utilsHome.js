export const countryColorObject = {
  Bahrain: "#33D0E3",
  Egypt: "#8BCE68",
  Iraq: "#8A7E95",
  Jordan: "#EF8471",
  Kuwait: "#E8BB5B",
  Lebanon: "#A190FF",
  Libya: "#5DD19D",
  Oman: "#EBD671",
  Qatar: "#594FA3",
  "Saudi Arabia": "#FF9481",
  Sudan: "#FB9F73",
  Palestine: "#DA89FD",
  "Syrian Arab Republic": "#695FB3",
  "United Arab Emirates": "#8489A1",
  Yemen: "#F2C565",
};

export const getRandomColor = () => {
  // this function we have to remove and make an object for this color pallete
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function convertInputToObjectArray(inputObject) {
  const color = "#434343"; // You can specify the color here

  const resultArray = [];

  for (const key in inputObject) {
    if (inputObject.hasOwnProperty(key)) {
      resultArray.push({
        label: key,
        value: inputObject[key],
        color: color,
      });
    }
  }

  return resultArray;
}

export function averageYearDataFn(data) {
  let result = {};
  let yearData = {};
  console.time("myCode");
  for (let country in data) {
    for (let entry of data[country]) {
      let year = entry.Year;
      let value = entry.Value;
      if (yearData[year]) {
        yearData[year].sum += value;
        yearData[year].count++;
      } else {
        yearData[year] = {
          sum: value,
          count: 1,
        };
      }
    }
  }
  // console.log(yearData)

  // Calculate the average for each year
  for (let year in yearData) {
    result[year] = yearData[year].sum / yearData[year].count;
  }

  // console.log(result);

  function mapValueToRange(value, fromMin, fromMax, toMin, toMax) {
    // First, map the value from the original range to a 0-1 range
    const normalizedValue = (value - fromMin) / (fromMax - fromMin);

    // Then, map the normalized value to the new range
    const result = toMin + normalizedValue * (toMax - toMin);

    return result;
  }

  // Example: Map the values in the result object to a range from 1 to 100
  const mappedResult = {};
  let resultArr = Object.values(result);
  const minValue = Math.min(...resultArr);
  const maxValue = Math.max(...resultArr);

  for (let year in result) {
    mappedResult[year] = mapValueToRange(
      result[year],
      minValue,
      maxValue,
      1,
      100
    );
  }

  console.timeEnd("myCode");
  // console.log(mappedResult);

  const fResult = convertInputToObjectArray(mappedResult);

  return fResult;
}
