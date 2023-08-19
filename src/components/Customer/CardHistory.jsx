import { Card, Image, Button } from "react-bootstrap"
import formatCurrency from "../../utils/currency"
import { useNavigate } from "react-router-dom"

export default function CardHistory({ detail }) {
  const navigate = useNavigate()
  function handleDetailInvoice(code_invoice) {
    navigate(`/invoice/${code_invoice}`)
  }
  return (
    <Card className="mb-4">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <Image 
          src={detail.cart[0].image.url}
          alt={detail.cart[0].name}
          style={{ width: '100px', height: '100px', aspectRatio: '3/2', objectFit: 'contain'  }}
        />
        <Card.Text className="m-0 sub__heading__5 text-truncate">{detail.invoice}</Card.Text>
        <Card.Text className="m-0 sub__heading__5">{ formatCurrency(detail.total) }</Card.Text>
        
        {
          detail.status ? (
            <Card.Text className="m-0 sub__heading__5 text-truncate text-success">Payment Success</Card.Text>
          ) : (
            <Card.Text className="m-0 sub__heading__5 text-truncate text-warning">Waiting Payment</Card.Text>
          )
        }
        
        <Button variant="success" size="sm" onClick={() => handleDetailInvoice(detail.invoice) }><i className="bi bi-eye-fill"></i></Button>
      </Card.Body>
    </Card>
  )
}
