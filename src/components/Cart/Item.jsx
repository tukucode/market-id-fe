import { Card, Image, Button } from "react-bootstrap";
import formatCurrency from "../../utils/currency";
import { useDispatch, useSelector } from "react-redux";

export default function Item(props) {
  const { cart, index } = props;
  const storeCarts = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  function handleRemovePerItem() {
    storeCarts.dataCart.forEach((item) => {
      if (item._id === cart._id) {
        item.qty -= 1;
      }
    });
    dispatch({ type: "SET_CARTS", value: storeCarts.dataCart });
  }

  function handleAddPerItem() {
    storeCarts.dataCart.forEach((item) => {
      if (item._id === cart._id) {
        item.qty += 1;
      }
    });
    dispatch({ type: "SET_CARTS", value: storeCarts.dataCart });
  }

  function handleDeleteByIndex() {
    storeCarts.dataCart.splice(index, 1);
    dispatch({ type: "SET_CARTS", value: storeCarts.dataCart });
  }
  return (
    <Card className="mb-2">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Image
            src={cart.image.url}
            alt={`product-${cart.name}`}
            className="object-fit-cover rounded"
            height="90"
            width="100"
          />

          <h6 className="ms-2">{cart.name}</h6>
        </div>
        <h6>{formatCurrency(cart.sub_total)}</h6>

        <div>
          <Button
            size="sm"
            disabled={cart.qty < 2}
            variant={cart.qty < 2 ? "secondary" : "primary"}
            onClick={handleRemovePerItem}
          >
            <i className="bi bi-dash"></i>
          </Button>

          <span className="mx-2 text-dark">{cart.qty}</span>

          <Button size="sm" variant="primary" onClick={handleAddPerItem}>
            <i className="bi bi-plus-lg"></i>
          </Button>

          <Button
            disabled={storeCarts.dataCart.length < 2}
            size="sm"
            variant="danger"
            className="ms-2"
            onClick={handleDeleteByIndex}
          >
            <i className="bi bi-trash-fill"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
