import React from "react";
import Product from "./Product";
import homeStyle from "../../styles/home.module.css";
import Himg from "../../assets/images/H1.jpg";
import { StateValue } from "../../StateProvider/StateProvider";
// import { StateValue } from "../../StateProvider/StateProvider";
export default function Home() {
  const [state] = StateValue();
  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  var imgData = null;
  if (state.user?.avatar.data) {
    imgData = arrayBufferToBase64(state.user?.avatar.data);
    // console.log(imgData);
    // imgData = "data:image/jpeg;base64," + imgData;
  }
  return (
    <div className={homeStyle.home_container}>
      <img className={homeStyle.home_img1} src={Himg} alt="..." />
      <div className={homeStyle.home_products}>
        {imgData != null ? (
          <img src={`data:image/png;base64,${imgData}`} alt="..." />
        ) : null}
        <Product
          title=" Some quick example text to build on the card title and make up the
          bulk of the card's content."
          imgUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"
          id={0}
          price={500}
        />
        <Product
          title=" Some quick example text to build on the card title and make up the
          bulk of the card's content."
          imgUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"
          id={1}
          price={500}
        />
        <Product
          title=" Some quick example text to build on the card title and make up the
          bulk of the card's content."
          imgUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"
          id={2}
          price={500}
        />
        <Product
          title=" Some quick example text to build on the card title and make up the
          bulk of the card's content."
          imgUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"
          id={3}
          price={500}
        />
        <Product
          title=" Some quick example text to build on the card title and make up the
          bulk of the card's content."
          imgUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"
          id={4}
          price={500}
        />

        <Product
          title=" Some quick example text to build on the card title and make up the
          bulk of the card's content."
          imgUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"
          id={5}
          price={500}
        />
        <Product
          title=" Some quick example text to build on the card title and make up the
          bulk of the card's content."
          imgUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"
          id={6}
          price={500}
        />
        <Product
          title=" Some quick example text to build on the card title and make up the
          bulk of the card's content."
          imgUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"
          id={7}
          price={500}
        />
        <Product
          title=" Some quick example text to build on the card title and make up the
          bulk of the card's content."
          imgUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"
          id={8}
          price={500}
        />
        <Product
          title=" Some quick example text to build on the card title and make up the
          bulk of the card's content."
          imgUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"
          id={9}
          price={500}
        />

        <Product
          title=" Some quick example text to build on the card title and make up the
          bulk of the card's content."
          imgUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"
          id={10}
          price={500}
        />
        <Product
          title=" Some quick example text to build on the card title and make up the
          bulk of the card's content."
          imgUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"
          id={11}
          price={500}
        />
        <Product
          title=" Some quick example text to build on the card title and make up the
          bulk of the card's content."
          imgUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"
          id={12}
          price={500}
        />
        <Product
          title=" Some quick example text to build on the card title and make up the
          bulk of the card's content."
          imgUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"
          id={13}
          price={500}
        />
        <Product
          title=" Some quick example text to build on the card title and make up the
          bulk of the card's content."
          imgUrl="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/Chocolates_PC_CC_379x304_V2._SY304_CB404777310_.jpg"
          id={14}
          price={500}
        />
      </div>
    </div>
  );
}
