import { Button, Card } from "react-bootstrap";
import defaultImg from "../../assets/images/default.jpg";
import formatCurrency from "../../utils/currency";

export default function ProductCard(props) {
  const { product } = props;
  return (
    <Card className="w-100">
      <Card.Img
        variant="top"
        src={product.image ? product.image.url : defaultImg}
        alt={`product-${product.name}`}
        className="object-fit-cover"
        height="250"
      />
      <Card.Body>
        <Card.Subtitle className="text__2">{product.name}</Card.Subtitle>
        <Card.Text className="text__4 my-2">{product.category.name}</Card.Text>
        <Card.Title className="sub__heading__2 my-2">
          {formatCurrency(product.price)}
        </Card.Title>

        <Button variant="outline-primary" className="w-100">
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
