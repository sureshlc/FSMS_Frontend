export const transformDataArr = (data = [], xAxisKey) => {
    const transformedArr = data.slice(-10, data.length)?.map((item, idx) => ({
      ...item,
      label:
        xAxisKey === "month"
          ? item[xAxisKey].slice(0, 3) + "'" + item.year.slice(-2)
          : item.year,
      value: item?.value,
      isForecast: item?.isForecast,
    }));
  
    return transformedArr;
  };