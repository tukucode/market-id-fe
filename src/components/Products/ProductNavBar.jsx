import "../../assets/css/custom-product-navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import handleErrorMessage from "../../utils/handleErrorMessage";

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
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogout() {
    const _id = user._id;

    dispatch({ type: "SET_LOADING", value: true });
    axios
      .post(`/users/${_id}/logout`)
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
  return (
    <Navbar bg="primary" expand="md" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="heading__4">
          Market.ID {token ? "TRUE" : "FALSE"}
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="w-100 d-flex justify-content-center align-items-center">
            <Form className="container__srearch my-md-0 mt-3">
              <InputGroup>
                <Form.Select className="select__search">
                  <option value="1">Sort By</option>
                  <option value="2">15</option>
                  <option value="3">20</option>
                </Form.Select>

                <Form.Control
                  placeholder="Search by product name"
                  className="input__search border-0"
                />
                <Button variant="light" className="d-flex align-items-center">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>
          </Nav>

          <Nav>
            {token ? (
              <>
                <Link
                  to="/cart"
                  className="me-md-3 my-md-0 my-3 me-0 btn btn-outline-light d-flex justify-content-center align-items-center"
                >
                  <i className="bi bi-cart-fill"></i>
                  <span className="sub__heading__5 ms-2">0</span>
                </Link>

                <Button variant="light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="me-md-3 my-md-0 my-3 me-0 btn btn-outline-light"
                >
                  Login
                </Link>

                <Link to="/register" className="text-primary btn btn-light">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;
