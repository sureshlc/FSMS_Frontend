import React from "react";
import {
  AddCountry,
  BorderDiv,
  CloseModalCon,
  CountryChip,
  CountryChipContainer,
  Icon,
  Icons,
  L3HeaderContainer,
  L3HeaderSubTitle,
  L3HeaderTitle,
  L3HeaderTitleCon,
} from "./index.sc";
import { Add, Close, Column, Timeline } from "../../../assets/icons";
import NewDropdown from "../../new-dropdown";
import { countryData } from "../../../mock-data";

const L3Header = ({
  selectedCountries = [],
  activeGraph,
  handleSelectGraph = () => {},
  handleCloseL3 = () => {},
  handleSelectFilter = () => {},
  handleUpdateCountries = () => {},
  widgetName,
}) => {
  const handleClearCountry = (index) => {
    const countriesAfterClear = selectedCountries.filter(
      (ele, i) => i !== index
    );
    handleUpdateCountries(countriesAfterClear);
  };
  return (
    <L3HeaderContainer>
      <L3HeaderTitleCon>
        <L3HeaderTitle>{widgetName?.label}</L3HeaderTitle>
        <L3HeaderSubTitle>3 Years Average</L3HeaderSubTitle>
      </L3HeaderTitleCon>
      <BorderDiv></BorderDiv>
      <CountryChipContainer>
        {selectedCountries.map((country, i) => (
          <CountryChip key={i} className={i !== 0 ? "secondary" : ""}>
            <span>{country.label}</span>
            {i !== 0 && (
              <CloseModalCon onClick={() => handleClearCountry(i)}>
                <Close color="#fff" />
              </CloseModalCon>
            )}
          </CountryChip>
        ))}
        <AddCountry>
          <NewDropdown
            name="country"
            newWidth="14"
            dropdownListHeight={"15"}
            options={countryData}
            selected={selectedCountries}
            handleSelectFilter={handleSelectFilter}
            icon={<Add />}
            arrow={false}
            borderWidth="0"
            disabled={selectedCountries.length === 3}
          />
        </AddCountry>
      </CountryChipContainer>
      <Icons>
        <Icon
          className={activeGraph === 0 ? "active" : ""}
          onClick={() => handleSelectGraph(0)}
        >
          <Column color={activeGraph === 0 ? "#fff" : "#7B8092"} />
        </Icon>
        <Icon
          className={activeGraph === 1 ? "active" : ""}
          onClick={() => handleSelectGraph(1)}
        >
          <Timeline color={activeGraph === 1 ? "#fff" : "#7B8092"} />
        </Icon>
      </Icons>
      <CloseModalCon onClick={handleCloseL3}>
        <Close />
      </CloseModalCon>
    </L3HeaderContainer>
  );
};

export default L3Header;
