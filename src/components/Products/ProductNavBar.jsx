import "../../assets/css/custom-product-navbar.css";
import {
  Container,
  Button,
  Form,
  InputGroup,
  Navbar,
  Nav,
} from "react-bootstrap";

function TextLinkExample() {
  return (
    <Navbar bg="primary" expand="md" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="heading__4">
          Market.ID
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
            <Button
              variant="outline-light"
              className="me-md-3 my-md-0 my-3 me-0"
            >
              Login
            </Button>
            <Button variant="light" className="text-primary">
              Register
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;
