import React, { useEffect, useState } from "react";
import * as Icons from "react-icons/bs";

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [slidesArr, setSlidesArr] = useState([]);
  useEffect(() => {
    if (slides.length > 10) {
      //chech how many photos there are in the product's database
      setSlidesArr([slides]); //if only 1 - make it array
    } else {
      setSlidesArr(slides); //if there are more than 1 - it is already an array, leave as is
    }
  }, []);
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };
  const handleTouchMove = (e) => {
    const touchDown = touchPosition;
    if (touchDown === null) {
      return;
    }
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      goToNext();
    }
    if (diff < -5) {
      goToPrevious();
    }
    setTouchPosition(null);
  };
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <div
      className="slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {slidesArr.length > 1 && (
        <Icons.BsChevronCompactLeft
          className="slider_arrow_left"
          onClick={goToPrevious}
        />
      )}
      <div
        className="slider_slide"
        style={{ backgroundImage: `url(${slidesArr[currentIndex]})` }}
        onClick={goToNext}
      ></div>
      {slidesArr.length > 1 && (
        <Icons.BsChevronCompactRight
          className="slider_arrow_right"
          onClick={goToNext}
        />
      )}

      <div className="slider_dots">
        {slidesArr.map((slide, slideIndex) => (
          <img
            key={slideIndex}
            src={slide}
            style={{
              width: 30,
              margin: 5,
              aspectRatio: 1 / 1,
              border:
                slideIndex === currentIndex ? "1px solid #9D9D9D " : "none",
            }}
            onClick={() => goToSlide(slideIndex)}
          />
        ))}
      </div>
    </div>
  );
};
export default Slider;
