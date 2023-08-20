import { Modal, Button } from "react-bootstrap"

export default function PopupCheckout(props) {
  const { show, handleClose, handlePayNow } = props

  return (
    <Modal centered size="sm" show={show} onHide={handleClose}>
      <Modal.Body className="text-center p-4">
        <h5 className="sub__heading__3">Information</h5>
        <p className="text__5">Please make this payment via bank transfer or digital wallet by sending valid proof of transfer.</p>
        
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handlePayNow}>
            Pay Now
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}