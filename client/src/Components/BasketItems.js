import React, { useState } from "react";
import basketStyle from "../styles/basketItem.module.css";
import { StateValue } from "../StateProvider/StateProvider";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function BasketItems() {
  const [state, dispatch] = StateValue();

  const itemDeleteHandler = (e, id) => {
    dispatch({
      type: "Remove Item From Cart",
      item: {
        id: id,
      },
    });
  };

  return (
    <div>
      {state.basket?.map((val, i) => {
        return (
          <div className={basketStyle.basket_container} key={i}>
            <div
              className="card mb-3"
              style={{ border: "none", flexDirection: "row" }}
            >
              <img
                className="card-img-top"
                src={val.imgUrl}
                alt="Card image cap"
                style={{
                  width: "50%",
                  objectFit: "contain",
                  height: "auto",
                  maxHeight: "20vh",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{val.title}</h5>
                <strong>Rs.{val.price}</strong>
                <div
                  style={{
                    display: "flex",
                    flex: "1",
                    justifyContent: "center",
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      itemDeleteHandler(e, val.id);
                    }}
                    style={{
                      width: "200px",
                      backgroundColor: "#f0c14b",
                      borderColor: "#a88734 #9c7e31 #846a29",
                      marginBottom: "10px",
                    }}
                    className="btn  btn-outline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
