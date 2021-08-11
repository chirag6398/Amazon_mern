import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { StateValue } from "../StateProvider/StateProvider";
import { getProduct } from "../services/product";
import prodtlStyle from "../styles/productDetail.module.css";

export default function ProductDetail() {
  const id = useParams();
  const [product, setProduct] = useState({
    price: null,
    desc: "",
    title: "",
    imgData: null,
  });
  const getData = async () => {
    try {
      const data = await getProduct(id.id);

      setProduct({
        price: data.price,
        title: data.title,
        desc: data.desc,
        imgData: data.productImg,
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return <div className={prodtlStyle.ext_div}></div>;
}
