import React, { useCallback, useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";
import {
  CarouselBox,
  CarouselContainer,
  CarouselDotbox,
  Dots,
  SlideWrapper,
} from "./index.sc";

const Carousel = ({
  slides,
  dotSize = ".5rem",
  dotBgColor = "#675ef2",
  dotBorder = "#675ef2",
  backgroundColor = "#FFFFFF",
  handleClick = () => {},
  absoluteDots = false,
  Gap,
  interval = 3000,
  autoPlay = false,
  isOpen = true,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);

  const handleClickdot = useCallback(
    (index) => {
      const container = containerRef.current;
      if (index > currentSlide) {
        container.scrollLeft +=
          (index - currentSlide) * (container.clientWidth + 10);
      } else if (index < currentSlide) {
        container.scrollLeft -=
          (currentSlide - index) * (container.clientWidth + 10);
      }
      setCurrentSlide(index);
    },
    [currentSlide]
  );

  useEffect(() => {
    if (autoPlay) {
      const intervalId = setInterval(() => {
        // Increment the activeIndex to move to the next slide
        // setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
        const currentIndex = (currentSlide + 1) % slides.length;
        handleClickdot(currentIndex);
      }, interval);

      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [autoPlay, currentSlide, handleClickdot, interval, slides.length]);

  return (
    <CarouselContainer
      style={{
        // width,
        // borderRadius,
        background: backgroundColor,
        gap: Gap,
      }}
    >
      <CarouselBox
        onClick={handleClick}
        className="product-carousel"
        ref={containerRef}
      >
        {slides.map((slide, i) => (
          <SlideWrapper key={i}>{slide.component}</SlideWrapper>
        ))}
      </CarouselBox>
      {slides.length > 1 && isOpen && (
        <CarouselDotbox absoluteDots={absoluteDots}>
          {slides.map((_, index) => (
            <Dots
              style={{
                width: dotSize,
                border: `1px solid ${currentSlide ? dotBorder : dotBgColor}`,
                backgroundColor:
                  index === currentSlide ? dotBgColor : "transparent",
                opacity: 1,
              }}
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleClickdot(index);
              }}
            ></Dots>
          ))}
        </CarouselDotbox>
      )}
    </CarouselContainer>
  );
};

Carousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  dotSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dotBorder: PropTypes.string,
  dotBgColor: PropTypes.string,
  handleClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  absoluteDots: PropTypes.bool,
  Gap: PropTypes.string,
  interval: PropTypes.number,
  isOpen: PropTypes.bool,
};

export default Carousel;
