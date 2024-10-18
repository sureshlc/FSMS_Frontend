import PropTypes from "prop-types";
import React from "react";
import { getStyles } from "./utils";
import { useTheme } from "../../hooks/Theme";

const Typography = ({ children, variant, style, weight, ...rest }) => {
  const theme = useTheme();
  const { Element, styles } = getStyles(
    variant,
    weight,
    style,
    theme.contrastText
  );

  return (
    <Element className="asm-typography" style={styles} {...rest}>
      {children}
    </Element>
  );
};

export default Typography;

Typography.propTypes = {
  variant: PropTypes.string,
  style: PropTypes.object,
  weight: PropTypes.string,
};
