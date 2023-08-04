import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useSelector , useDispatch } from "react-redux"
import { Card, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import handleErrorMessage from "../../utils/handleErrorMessage";
import { axiosInstance as axios } from "../../config/https"
import formatCurrency from "../../utils/currency";
import PopupCheckout from "./PopupCheckout";

export default function CardCheckout() {
  const [optionsAddress, setOptionsAddress] = useState([])

  const dispatch = useDispatch()

  const { dataCart } = useSelector((state) => state.carts)
  const dataSubTotal = dataCart.map((cart) => cart.sub_total)
  const subTotal = dataSubTotal.reduce((a, b) => a + b, 0)
  const ppn = subTotal * 0.1
  const total = subTotal + ppn

  // for options address
  useEffect(() => {
    if (!optionsAddress.length) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });
      axios.get('/address/list').then((response) => {
        setOptionsAddress(response.data.data)
      }).catch((error) => {
        const message = error.response?.data?.message;
          toast(handleErrorMessage(message), {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.ERROR,
          });
      })
      .finally(() => {
        // SET LOADING
        dispatch({ type: "SET_LOADING", value: false });
      });
    }
  }, [optionsAddress, dispatch])


  const [fullAddress, setFullAddress] = useState('-')
  const [ address, setAddress ] = useState({
    _id: '',
    name: ''
  })

  function handleChangeAddress(event) {
    const _id = event.target.value

    const findAddressByID = optionsAddress.find((address) => address._id === _id)
    
    if (!findAddressByID) {
      setFullAddress("-")
      setAddress({ _id: '', name: '' })
    }
    else {
      setAddress({ _id: findAddressByID._id, name: findAddressByID.name })

      const address = findAddressByID.address
      const village = findAddressByID.village.name
      const district = findAddressByID.district.name
      const regency = findAddressByID.regency.name
      const province = findAddressByID.province.name
      const passcode = findAddressByID.passcode

      setFullAddress(`${address} ${village} ${district} ${regency} ${province} ${passcode}`)
    }
  }

  // popup checkout
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  function handlePayNow() {
    const cart = dataCart.map((cart) => {
      return {
        name: cart.name,
        price: cart.price,
        image: cart.image,
        category: cart.category,
        qty: cart.qty,
        sub_total: cart.sub_total
      }
    })

    const dataCheckout = {
      cart,
      address,
      total
    }

    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axios.post('/checkout/new', dataCheckout).then((response) => {
      const invoice = response.data.data.invoice
      
      toast('Checkout Success', {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.SUCCESS,
      });
            
      setShow(false)
      navigate(`/invoice/${invoice}`)

    }).catch((error) => {
      const message = error.response?.data?.message;
      toast(handleErrorMessage(message), {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.ERROR,
      });
    })
    .finally(() => {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: false });
    });
  }

  return (
    <>
      <Card className="w-100">
        <Card.Body>
          <Form.Label htmlFor="form-addres" className="fw-bold">Address</Form.Label>
          <Form.Select 
            id="form-addres"
            value={address._id}
            onChange={handleChangeAddress}
          >
            <option value=''>Select your address</option>
            {
              optionsAddress.map((address, index) => (
                <option key={`option-address-${index}`} value={address._id}>{address.name}</option>
              ))
            }
          </Form.Select>
          <Card.Text className="my-2">{fullAddress}</Card.Text>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <Card.Subtitle className="fw-medium">Sub Total</Card.Subtitle>
            <Card.Subtitle className="fw-medium">{formatCurrency(subTotal)}</Card.Subtitle>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <Card.Subtitle className="fw-medium">PPN (10%)</Card.Subtitle>
            <Card.Subtitle className="fw-medium">{formatCurrency(ppn)}</Card.Subtitle>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <Card.Subtitle className="fw-medium">Total</Card.Subtitle>
            <Card.Subtitle className="fw-medium">{formatCurrency(total)}</Card.Subtitle>
          </div>

          <Button disabled={address._id.length === 0} color="primary" className="w-100" onClick={() => setShow(true)}>Checkout</Button>
        </Card.Body>
      </Card>

      {/* POPUP CHECKOUT */}
      <PopupCheckout show={show} handleClose={() => setShow(false)} handlePayNow={handlePayNow} />
    </>
  )
}