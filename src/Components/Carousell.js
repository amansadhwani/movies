import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
const Carousell = (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {props.carouselData.map((item, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={item} alt="First slide" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Carousell;
