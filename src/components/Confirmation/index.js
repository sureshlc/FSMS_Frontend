import React, { useEffect, useState } from "react";
import * as Styles from "./index.sc";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { Button } from "../CustomButton/index";
import Typography from "../Typography/index";
import { useTheme } from "../../hooks/Theme";

const Confirmation = ({
  isOpen,
  onClose,
  icon,
  headerText,
  content,
  width,
  popupPosition,
  buttonTitle,
  customBtn,
}) => {
  const handleOverlayClick = () => {
    onClose && onClose();
  };
  const theme = useTheme();
  const btnStyle = customBtn?.btnStyle || {
    height: "2rem",
    color: "#fff",
    hoverBg: `linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), ${theme.main}`,
    focusBg: `linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), ${theme.main}`,
  };
  const backgroundColor = customBtn?.backgroundColor || theme.main;
  return (
    <Portal>
      <Styles.ConfirmationOverlay
        isOpen={isOpen}
        onClick={handleOverlayClick}
      ></Styles.ConfirmationOverlay>
      <Styles.ConfirmationContainer
        isOpen={isOpen}
        width={width}
        popupPosition={popupPosition}
      >
        <Styles.ConfirmationHeader>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              gap: "1rem",
            }}
          >
            {icon}
            {headerText && (
              <Typography variant="h4" weight="bold">
                {headerText}
              </Typography>
            )}
          </div>
        </Styles.ConfirmationHeader>

        <Styles.MainContentContainer>{content}</Styles.MainContentContainer>

        <Button
          type="primary"
          btnStyle={btnStyle}
          backgroundColor={backgroundColor}
          title={buttonTitle || "Cancel "}
          onClick={handleOverlayClick}
        />
      </Styles.ConfirmationContainer>
    </Portal>
  );
};

export default Confirmation;

const Portal = ({ children }) => {
  const [portalContainer, setPortalContainer] = useState(null);

  useEffect(() => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    setPortalContainer(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  if (!portalContainer) {
    return null;
  }

  return createPortal(children, portalContainer);
};

export { Portal };

Confirmation.propTypes = {
  width: PropTypes.string,
  isOpen: PropTypes.bool,
  popupPosition: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string,
  }),
  onClose: PropTypes.func,
  // icon: PropTypes.element,
  headerText: PropTypes.string,
  content: PropTypes.element,
  buttonTitle: PropTypes.string,
  customBtn: PropTypes.shape({
    btnStyle: PropTypes.object,
    backgroundColor: PropTypes.string,
  }),
};

Confirmation.defaultProps = {
  isOpen: false,
  popupPosition: { top: "50%", left: "50%" },
};
