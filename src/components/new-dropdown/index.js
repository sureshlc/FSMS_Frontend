import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import {
  DropdownInputSearch,
  DropdownList,
  DropdownListItem,
  FilterBody,
  ListWrp,
  OptionTitle,
  // Title,
} from "./index.sc";
import { Arrow } from "../../assets/icons";
// import { ReactComponent as WorldIcon } from "../../assets/imgs/world.svg";

import {
  DropdownButton,
  DropdownContainer,
  IconContainer,
  Title,
  CountIconWrapper,
} from "./index.sc";
import WorldIcon from "../../assets/icons/components/WorldIcon";
import SyriaFlag from "../../assets/icons/components/flags/Syria";
import EgyptFlag from "../../assets/icons/components/flags/Egypt.js";
import IraqFlag from "../../assets/icons/components/flags/Iraq.js";
import JordanFlag from "../../assets/icons/components/flags/Jordan.js";
import LebanonFlag from "../../assets/icons/components/flags/Lebanon.js";
import PalestineFlag from "../../assets/icons/components/flags/Palestine.js";
import MASHFlag from "../../assets/icons/components/flags/Mash.js";
import useQueryParams from "../../hooks/useQueryParams";

const NewDropdown = ({
  newWidth,
  borderWidth = 1,
  title = "",
  name = "",
  dropdownListHeight = 10.5,
  options = [],
  handleSelectFilter,
  value,
  icon = "",
  arrow = true,
  disabled = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([...options]);
  const { getAllQueryParams } = useQueryParams();
  const { countryId } = getAllQueryParams();
  const isoFlagMapping = {
    SYR: <SyriaFlag size={18} />,
    EGY: <EgyptFlag />,
    IRQ: <IraqFlag />,
    JOR: <JordanFlag />,
    LBN: <LebanonFlag />,
    PSE: <PalestineFlag />,
    MASH: <MASHFlag />,
  };

  const dropdownRef = useRef();
  const [selectedOption, setSelectedOption] = useState(
    options.length > 0 ? options[0] : null
  );

  //   const [ddWidth, setDdwidth] = useState();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOption = (option) => {
    setSelectedOption(option);
    let value = option;
    handleSelectFilter && handleSelectFilter(name, value);
    toggleDropdown();
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleSearchDropdown = (query) => {
    setSearchText(query);
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  useEffect(() => {
    if (options.length > 0) {
      const valueOption = options.find((option) => option.value === value);
      setSelectedOption(valueOption || options[0]);
    } else {
      setSelectedOption(null);
    }
  }, [options, value]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const getSelectedLabel = () => {
    if (selectedOption) {
      return selectedOption?.label;
    } else {
      return title;
    }
  };

  useEffect(() => {
    if (selectedOption) {
      const filteredOptions = options.filter(
        (option) => selectedOption?.value !== option.value
      );
      setFilteredOptions(filteredOptions);
    }
  }, [options, selectedOption]);

  return (
    <DropdownContainer
      ref={dropdownRef}
      newWidth={newWidth}
      onMouseOver={() => setDropdownOpen(true)}
      onMouseOut={() => setDropdownOpen(false)}
    >
      <IconContainer>
        {isoFlagMapping[countryId] || <WorldIcon />}
      </IconContainer>

      {/* <WorldIcon /> */}
      <DropdownButton
        className="dropdown-btn"
        active={dropdownOpen}
        borderWidth={borderWidth}
        disabled={disabled}
      >
        {title && <Title>{getSelectedLabel()}</Title>}
        {arrow && (
          <CountIconWrapper>
            <Arrow
              fill="#fff"
              className={"dropdown-arrow-icon"}
              isOpen={dropdownOpen}
            />
          </CountIconWrapper>
        )}
      </DropdownButton>
      <ListWrp
        onMouseOver={() => setDropdownOpen(true)}

        // className={selectedOption?.value === "custom_range" ? "custom" : ""}
      >
        <FilterBody>
          <DropdownList
            open={dropdownOpen}
            dropdownListHeight={dropdownListHeight}
            newWidth={newWidth}
            // newWidth={ddWidth || newWidth}
          >
            {/* <DropdownListItem className="dropdown-search">
              <DropdownInputSearch
                placeholder="Search"
                value={searchText}
                onChange={(e) => handleSearchDropdown(e.target.value)}
              />
            </DropdownListItem> */}
            {filteredOptions.map((option, i) => (
              <DropdownListItem
                key={i}
                // className={
                //   selectedOption?.value === option?.value ? "selected" : ""
                // }
                onClick={() => handleOption(option)}
              >
                {option.iso3_code ? (
                  isoFlagMapping[option?.iso3_code]
                ) : (
                  <WorldIcon />
                )}
                <OptionTitle>{option.label}</OptionTitle>
              </DropdownListItem>
            ))}
          </DropdownList>
        </FilterBody>
      </ListWrp>
    </DropdownContainer>
  );
};

export default NewDropdown;

NewDropdown.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  newWidth: PropTypes.string,
  borderWidth: PropTypes.string,
  count: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  dropdownListHeight: PropTypes.string,
  handleSelectFilter: PropTypes.func,
  selected: PropTypes.array,
  value: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  arrow: PropTypes.bool,
  disabled: PropTypes.bool,
};
