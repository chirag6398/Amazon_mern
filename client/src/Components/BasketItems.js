import React, { useState } from "react";
import basketStyle from "../styles/basketItem.module.css";
import { StateValue } from "../StateProvider/StateProvider";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { arrayBufferToBase64 } from "../util/getImgBuffer";
import { removeitemFromCart } from "../services/user";
export default function BasketItems({ data, quantity, id, img, convertImg }) {
  
  const [isRemoving, setIsRemoving] = useState(false)
  let imgData = null;
  if (convertImg) {
    imgData = arrayBufferToBase64(img);
  } else {
    imgData = img;
  }

  const [{}, dispatch] = StateValue();
  const removeItem = async () => {
    try {
      setIsRemoving(true);
      
      const status = await removeitemFromCart(id);
      setIsRemoving(false);
      if (status) {
        dispatch({ type: "InitialBasket", payload: status.data.cart.items });
        alert("item remove successfully")
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={basketStyle.basket_container}>
      <div className={basketStyle.left}>
        <img
          className="card-img-top"
          src={`data:image/png;base64,${imgData}`}
          alt="current item has been out of stock"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <div className={basketStyle.right}>
        <div>
          <b>{data?.desc}</b>
          <hr />
          <h5 className="card-title">{data?.title}</h5>
          <strong>Rs.{data?.price}</strong>
          <p>Quantity:<b>{quantity}</b></p>
          <div
            style={{
              display: "flex",
              flex: "1",
              justifyContent: "center",
            }}
          >
            {convertImg ? (
              <button
                type="button"
                style={{
                  width: "200px",
                  backgroundColor: "#f0c14b",
                  borderColor: "#a88734 #9c7e31 #846a29",
                  marginBottom: "10px",
                }}
                disabled={isRemoving}
                className="btn  btn-outline"
                onClick={removeItem}
              >
                {isRemoving?"removing...":"Remove"}
              </button>
              
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
