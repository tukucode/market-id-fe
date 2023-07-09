/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ProductCard from "../components/Products/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Pagination } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";

import { toast } from "react-toastify";
import handleErrorMessage from "../utils/handleErrorMessage";

import { axiosInstance as axios } from "../config/https";

export default function Products() {
  const storeParamsProduct = useSelector((state) => state.product);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const dispatch = useDispatch();

  function handleChange(event) {
    dispatch({ type: "ACTION_PER_PAGE", value: event.target.value });
  }

  function handlePagination(page) {
    dispatch({ type: "ACTION_PAGE", value: page });
    setPagination({ ...pagination, page: page });
  }

  useEffect(() => {
    if (storeParamsProduct) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });
      axios
        .get("/products", { params: { ...storeParamsProduct } })
        .then((response) => {
          setData(response.data.data);
          setPagination(response.data.pagination);
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
    <>
      <Row>
        {data.map((product, index) => (
          <Col
            key={`product-${index}`}
            lg="3"
            md="4"
            sm="6"
            xs="12"
            className="mb-4"
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {data.length ? (
        <Row>
          <Col
            xs="12"
            className="d-flex justify-content-end align-items-center"
          >
            <Form.Select
              value={storeParamsProduct.per_page}
              onChange={handleChange}
              className="w-auto me-4 mb-3"
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </Form.Select>

            <PaginationControl
              page={pagination.page}
              total={pagination.total}
              limit={pagination.per_page}
              ellipsis={2}
              between={4}
              changePage={handlePagination}
            ></PaginationControl>
          </Col>
        </Row>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <h3>Product Not Found</h3>
        </div>
      )}
    </>
  );
}
