import { Row, Col } from "react-bootstrap";
import ABreadCrumb from "../components/ABreadCrumb";
import ItemCart from "../components/Cart/Item";
import { useSelector } from "react-redux";

export default function Cart() {
  const options = [
    {
      href: "/",
      name: "Landing Page",
      active: false,
    },
    {
      href: "/cart",
      name: "Cart",
      active: true,
    },
  ];

  const storeCarts = useSelector((state) => state.carts);
  return (
    <>
      <Row>
        <Col xs="12">
          <ABreadCrumb options={options} />
        </Col>
        <Col md="8">
          {storeCarts.dataCart.length ? (
            storeCarts.dataCart.map((cart, index) => (
              <ItemCart
                key={`item-cart-${cart._id}`}
                index={index}
                cart={cart}
              />
            ))
          ) : (
            <h4>Cart list empty</h4>
          )}
        </Col>
        <Col md="4">KANAN</Col>
      </Row>
    </>
  );
}
