import React from "react";
import { useHistory } from "react-router-dom";

const CheckoutPage = (props) => {
  const history = useHistory();
  const calcTotal = () => {
    let total = 0;
    for (let i = 0; i < props.cartData.length; i++) {
      total = total + props.cartData[i].price * props.cartData[i].qty;
    }
    return total;
  };
  const redirect = () => {
    props.clearCart();
    alert("Order placerd sucessfully");
    history.push("/");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 mt-5">
          <h6 className="text-muted">Your Orders</h6>
          <ul className="list-group">
            {props.cartData.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.Title} ({item.price} * {item.qty})
                <div className="rightF">${item.price * item.qty}</div>
              </li>
            ))}
            <li className="list-group-item">
              Total
              <div className="rightF">${calcTotal()}</div>
            </li>
          </ul>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary mt-5"
        onClick={() => redirect()}
      >
        Checkout and pay later
      </button>
    </div>
  );
};

export default CheckoutPage;
