import React from "react";
import Product from "./Product";
import homeStyle from "../../styles/home.module.css";
import Himg from "../../assets/images/H1.jpg";
import { StateValue } from "../../StateProvider/StateProvider";

// import { StateValue } from "../../StateProvider/StateProvider";
export default function Home() {
  const [state] = StateValue();
  // console.log(state.products.products);
  return (
    <div className={homeStyle.home_container}>
      <img className={homeStyle.home_img1} src={Himg} alt="..." />
      <div className={homeStyle.home_products}>
        <div className={homeStyle.home_product}>
          {state.products?.products?.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
