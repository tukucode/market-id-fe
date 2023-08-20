import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import CartNavbar from "../components/Cart/CartNavbar";

export default function LayoutCart() {
  return (
    <>
      <CartNavbar />

      <Container className="py-5">
        <Outlet />
      </Container>
    </>
  );
}
