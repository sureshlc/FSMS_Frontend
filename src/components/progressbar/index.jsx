import React from 'react';
import { ProgressBarContainer } from './index.sc';

const convertToNumber = (value, unit) => {
  const unitMap = {
    'k': 1000,
    'M': 1000000,
    'B': 1000000000,
    'T': 1000000000000,
    // Add more units if needed
  };
  const multiplier = unitMap[unit] || 1;
  return parseFloat(value) * multiplier;
};

const Progressbar = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    // Handle the case where data is not an array or an empty array
    return null; // or any fallback UI you want
  }

  const maxValue = Math.max(...data.map(ele => convertToNumber(ele?.value, ele?.units)));

  return (
    <ProgressBarContainer>
      {data.map((ele, i) => {
        const convertedValue = convertToNumber(ele?.value, ele?.units);
        const widthPercentage = `${(convertedValue / maxValue) * 100}%`;

        return (
          <span
            key={i}
            style={{
              backgroundColor: ele?.color,
              width: widthPercentage,
              height: '2vh',
              verticalAlign: 'middle',
            }}
          ></span>
        );
      })}
    </ProgressBarContainer>
  );
};

export default Progressbar;
