import React from "react";
import * as Styles from "./index.sc";
import PropTypes from "prop-types";
import { useTheme } from "../../hooks/Theme";

const Button = ({
  title,
  type,
  btnStyle,
  backgroundColor,
  disableStyle,
  borderColor,
  disable,
  icon,
  iconPosition,
  onClick,
}) => {
  const theme = useTheme();
  return (
    <Styles.ButtonComp
      theme={theme}
      className="button-amxbutton"
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      disableStyle={disableStyle} // disable style
      type={type}
      btnStyle={btnStyle} // this represent style property of the button which some additional style like disable={color,background,border},hoverBg and focusBg useful to give background color for onhover and onfocus.
      iconPosition={iconPosition} // icon position added to specify the position of the icon
      onClick={!disable ? onClick : undefined} // callback event when users clicks on the button. note: will only trigger only if disable property is false or not given.
      disable={disable} // disable property to specify disable state
    >
      {icon ? (
        <Styles.IconContainer
          theme={theme}
          type={type}
          disable={disable}
          disableStyle={disableStyle}
        >
          {icon}
        </Styles.IconContainer> // icon which can be passed as a react component which should be SVG image only
      ) : (
        ""
      )}

      {title ? <span>{title}</span> : ""}
    </Styles.ButtonComp>
  );
};

export { Button };

Button.propTypes = {
  title: PropTypes.string,
  disable: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  type: PropTypes.string,
  iconPosition: PropTypes.string,
  btnStyle: PropTypes.object,
  disableStyle: PropTypes.object,
  onClick: PropTypes.func,
};
Button.defaultProps = {
  // props default values
  iconPosition: "left",
  disable: false,
  type: "primary",
  backgroundColor: "#fff",
  borderColor: "#e20074",
  disableStyle: {
    color: "#D9D9D9",
    background: "#fff",
    border: "1px solid #D9D9D9",
  },
};
