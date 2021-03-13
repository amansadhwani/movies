import React, { useState, Fragment } from "react";
import { Button } from "react-bootstrap";

const ReusableButton = (props) => {
  const [count, setCount] = useState(0);
  const addToCart = () => {
    props.addToGlobalCart(count + 1);
    setCount(count + 1);
  };

  const onClickIncrementCount = () => {
    props.addToGlobalCart(count + 1);
    setCount(count + 1);
  };
  const onClickDecrementCount = () => {
    props.addToGlobalCart(count - 1);
    setCount(count - 1);
  };

  return (
    <Fragment>
      {count === 0 ? (
        <Button className="info" onClick={() => addToCart()}>
          Add To Cart
        </Button>
      ) : (
        <Fragment>
          <div className="container">
            <div className="row">
              <i
                className="fa fa-minus fa-2x mr-4"
                aria-hidden="true"
                onClick={() => onClickDecrementCount()}
              ></i>
              <h2>{count}</h2>
              <i
                className="fa fa-plus fa-2x ml-4"
                aria-hidden="true"
                onClick={() => onClickIncrementCount()}
              ></i>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ReusableButton;
