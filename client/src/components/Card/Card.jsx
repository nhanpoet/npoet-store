import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";
const Card = ({ items }) => {
  return (
    <Link className="link" to={`/product/${items.id}`}>
      <div className="card">
        <div className="image">
          {items?.attributes.isNew && <span>New Season</span>}
          <img
            src={
              process.env.REACT_APP_UPLOAD_URL +
              items.attributes?.img?.data?.attributes?.url
            }
            alt=""
            className="mainImg"
          />
          <img
            src={
              process.env.REACT_APP_UPLOAD_URL +
              items.attributes?.img2?.data?.attributes?.url
            }
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{items?.attributes.title}</h2>
        <div className="prices">
          <h3>${items.oldPrice || items?.attributes.price + 20}</h3>
          <h3>${items?.attributes.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
