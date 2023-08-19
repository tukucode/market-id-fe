import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import handleErrorMessage from "../../utils/handleErrorMessage";
import "../../assets/css/custom-product-navbar.css";

import { axiosInstance as axios } from "../../config/https";

import {
  Container,
  Button,
  Form,
  InputGroup,
  Navbar,
  Nav,
} from "react-bootstrap";

function TextLinkExample() {
  // STORE AUTH
  const { user } = useSelector((state) => state.auth);
  const { q, sort_by } = useSelector((state) => state.product);
  const { dataCart } = useSelector((state) => state.carts);

  const dispatch = useDispatch();

  // item qty & countQty
  const itemQty = dataCart.map((item) => item.qty);
  const countQty = itemQty.reduce((a, b) => a + b, 0);

  // STATE
  const [params, setParams] = useState({
    q,
    sort_by,
  });

  function handleOnChange(event) {
    setParams({ ...params, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // SET VALUE PARAMS Q & SORTBY TO STORE PRODUCT
    dispatch({ type: "ACTION_PAGE", value: 1 });
    dispatch({ type: "ACTION_SEARCH", value: params.q });
    dispatch({ type: "ACTION_SORT_BY", value: params.sort_by });
  }

  function handleLogout() {
    const _id = user._id;

    dispatch({ type: "SET_LOADING", value: true });
    axios
      .post(`/api/users/${_id}/logout`)
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // to page login
        window.location.href = "/login";
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
      });
  }

  const navigate = useNavigate();
  function handleProfile () {
    navigate("/profile")
  }
  function handleToPageCart() {
    navigate("/cart");
  }
  return (
    <Navbar bg="primary" expand="md" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="heading__4">
          Market.ID
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="w-100 d-flex justify-content-center align-items-center">
            <Form
              className="container__srearch my-md-0 mt-3"
              onSubmit={handleSubmit}
            >
              <InputGroup>
                <Form.Select
                  className="select__search"
                  name="sort_by"
                  value={params.sort_by}
                  onChange={handleOnChange}
                >
                  <option value="asc">ASC</option>
                  <option value="desc">DESC</option>
                </Form.Select>

                <Form.Control
                  placeholder="Search by product name"
                  className="input__search border-0"
                  name="q"
                  value={params.q}
                  onChange={handleOnChange}
                />
                <Button
                  type="submit"
                  variant="light"
                  className="d-flex align-items-center"
                >
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>
          </Nav>
          <Nav>
            <Button
              disabled={countQty === 0}
              className="me-md-3 my-md-0 my-3 me-0 btn btn-outline-light d-flex justify-content-center align-items-center"
              onClick={handleToPageCart}
            >
              <i className="bi bi-cart-fill"></i>
              <span className="sub__heading__5">{countQty}</span>
            </Button>

            <Button variant="outline-light" className="mx-md-2 mx-0" onClick={handleProfile}>
              Profile
            </Button>

            <Button variant="light" className="my-md-0 my-3" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;
