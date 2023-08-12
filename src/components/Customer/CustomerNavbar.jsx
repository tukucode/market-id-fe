import { Container, Navbar } from "react-bootstrap";

function CustomerNavBar() {
  return (
    <Navbar bg="primary" expand="md" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="heading__4">
          Market.ID
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default CustomerNavBar;
