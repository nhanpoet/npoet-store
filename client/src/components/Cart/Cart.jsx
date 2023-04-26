import React from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../../makeRequest";

const Cart = () => {
  const products = useSelector((item) => item.cart.products);

  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };
  const stripePromise = loadStripe(
    "pk_test_51M8cQDGDwh8YJrC7i5z1Bie7R7KzWb3axyWxCC6ijPYU2kKHcjBObijpkpGMsM3NCEV5JyEo6es8ipWcfdan630v00cjpIiJSX"
  );

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      const res = await makeRequest.post("/orders", {
        products,
      });

      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
      dispatch(resetCart());
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products?.map((items) => (
        <div className="item" key={items.id}>
          <div className="left">
            <img src={process.env.REACT_APP_UPLOAD_URL + items.img} alt="" />
            <div className="details">
              <h1>{items.title}</h1>
              <p>{items.desc?.substring(0, 30)}...</p>
              <div className="price">
                {items.quantity} x ${items.price}
              </div>
            </div>
          </div>

          <DeleteOutlinedIcon
            className="delete"
            onClick={() => dispatch(removeItem(items.id))}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${totalPrice()}</span>
      </div>
      <div className="button">
        <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
        <span className="reset" onClick={() => dispatch(resetCart())}>
          Reset Cart
        </span>
      </div>
    </div>
  );
};

export default Cart;
