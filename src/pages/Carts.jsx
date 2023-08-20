import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import ABreadCrumb from "../components/ABreadCrumb";
import ItemCart from "../components/Cart/Item";
import CardCheckout from "../components/Cart/CardCheckout";

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
        <Col md="8" sm="12" xs="12">
          <div style={{ maxHeight: 'calc(100vh - 14rem)', overflowY: 'auto' }}>
            {storeCarts.dataCart.length ? (
              storeCarts.dataCart.map((cart, index) => (
                <ItemCart
                  key={`item-cart-${cart._id}`}
                  index={index}
                  cart={cart}
                  isAction
                />
              ))
            ) : (
              <h4>Cart list empty</h4>
            )}
          </div>
        </Col>
        <Col md="4" sm="12" xs="12">
          <CardCheckout isCheckout />
        </Col>
      </Row>
    </>
  );
}
