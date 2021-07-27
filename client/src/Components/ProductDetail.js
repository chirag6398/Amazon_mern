import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { StateValue } from "../StateProvider/StateProvider";
import { getProduct } from "../services/product";

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
  return <div>{product.title}</div>;
}
