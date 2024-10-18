import PropTypes from "prop-types";
import React from "react";
import { ReactComponent as Delete } from "./icons/Delete.svg";
import * as Styles from "./index.sc";

const Chip = ({
  title,
  style,
  icon,
  onCloseClick,
  box,
  onChipClick,
  customCloseButton,
  type = ["large", "small", "status"],
}) => {
  return (
    <Styles.ChipBox
      type={type}
      style={style}
      box={box}
      onClick={(e) => {
        if (onChipClick) {
          e.preventDefault();
          e.stopPropagation();
          onChipClick(e);
        }
      }}
    >
      <Styles.ContentContainer type={type}>
        {/* <Styles.TitleContainer> */}

        {icon && <Styles.Badge>{icon}</Styles.Badge>}
        <Styles.TitleSpanText title={title}>{title}</Styles.TitleSpanText>
        {/* </Styles.TitleContainer> */}
        {onCloseClick && (
          <Styles.Badge
            type={type}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCloseClick(e);
            }}
          >
            {customCloseButton || <Delete />}
          </Styles.Badge>
        )}
      </Styles.ContentContainer>
    </Styles.ChipBox>
  );
};
export default Chip;

Chip.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  customCloseButton: PropTypes.node,
  iconPosition: PropTypes.string,
  style: PropTypes.object,
  onCloseClick: PropTypes.func,
  onChipClick: PropTypes.func,
  type: PropTypes.oneOf(["small", "large", "status"]),
};
