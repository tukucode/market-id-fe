/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/Products/ProductCard";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import handleErrorMessage from "../utils/handleErrorMessage";

import { axiosInstance as axios } from "../config/https";

export default function Products() {
  const storeParamsProduct = useSelector((state) => state.product);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (storeParamsProduct) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });
      axios
        .get("/products", { params: { ...storeParamsProduct } })
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          const message = error.response?.data?.message;
          toast(handleErrorMessage(message), {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.ERROR,
          });
        })
        .finally(() => {
          // SET LOADING
          dispatch({ type: "SET_LOADING", value: false });
        });
    }
  }, [storeParamsProduct]);

  return (
    <Row>
      {data.map((product, index) => (
        <Col key={`product-${index}`} lg="3" md="4" sm="6" xs="12">
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
}
