import React from 'react';
import { BoxDataContainer,SmallBoxContainer } from './index.sc';
const BoxData = ({ numberOfBoxes, data }) => {
  return (
    <BoxDataContainer>
      {[...Array(numberOfBoxes)].map((_, index) => (
        <SmallBoxContainer key={index}>
          {data[index]}
        </SmallBoxContainer>
      ))}
    </BoxDataContainer>
  );
};

export default BoxData;

