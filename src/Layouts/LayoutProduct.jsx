import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import ProductNavBar from "../components/Products/ProductNavBar";

export default function LayoutProduct() {
  return (
    <>
      <ProductNavBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
