import CustomerNavBar from "../components/Customer/CustomerNavbar";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function LayoutCustomer() {
  return (
    <>
      <CustomerNavBar />
      
      <Container className="py-5">
        <Outlet />
      </Container>
    </>
  );
}
