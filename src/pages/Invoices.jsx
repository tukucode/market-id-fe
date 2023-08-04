import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import { Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import ABreadCrumb from "../components/ABreadCrumb";
import ItemCart from "../components/Cart/Item";
import CardCheckout from "../components/Cart/CardCheckout";

import { axiosInstance as axios } from "../config/https"
import handleErrorMessage from "../utils/handleErrorMessage";

export default function Invoices() {
  const { code } = useParams();
  const [isUpdate, setIsUpdate] = useState(true)
  const dispatch = useDispatch()

  const options = [
    {
      href: "/",
      name: "Landing Page",
      active: false,
    },
    {
      href: "/invoices",
      name: "Invoices",
      active: true,
    },
  ];

  const [data, setData] = useState({})
  const [carts, setCarts] = useState([])
  const [detailInvoice, setDetailInvoice] = useState({
    address_id: '',
    sub_total: 0,
    ppn: 0,
    total: 0
  })

  useEffect(() => {
    if (isUpdate) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });
      axios.get(`/checkout/${code}/detail`).then((response) => {
        setData(response.data.data)
        const carts = response.data.data.cart
        setCarts(carts)

        const address = response.data.data.address
        const dataSubTotal = carts.map((cart) => cart.sub_total)
        const subTotal = dataSubTotal.reduce((a, b) => a + b, 0)
        const ppn = subTotal * 0.1
        const total = subTotal + ppn
        
        setDetailInvoice({ address_id: address._id, sub_total: subTotal, ppn, total })
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
        setIsUpdate(false)
      });
    }
  }, [isUpdate, code, dispatch])

  function handleConfirmDone() {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axios.put(`/checkout/${code}/confirm`, { status: true }).then((response) => {
      toast('Confirm Success', {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.SUCCESS,
      });
      setIsUpdate(true)
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
      <Row>
        <Col xs="12">
          <ABreadCrumb options={options} />
        </Col>
        <Col xs="12">
          <Card className=" rounded-0 mb-4">
            <Card.Body>
              <Card.Title className="sub__heading__1 text-primary">Market.ID</Card.Title>
              
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 text__4">Nama Pemesan: { data.user ? data.user.full_name : '-' }</p>
                <h6 className="sub__heading__5">Invoices { data.invoice || '-'}</h6>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 text__4">Email Pemesan: { data.user ? data.user.email : '-'  }</p>
                {
                  data.status ? (
                    <h6 className="sub__heading__5 text-success">Status payment success</h6>
                  ) : (
                    <h6 className="sub__heading__5 text-warning">Status waiting payment</h6> 
                  )
                }
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md="8" sm="12" xs="12">
          <div style={{ height: '25rem', overflowY: 'auto' }}>
            {carts.length ? (
              carts.map((cart, index) => (
                <ItemCart
                  key={`item-checkout-${cart.name}`}
                  index={index}
                  cart={cart}
                />
              ))
            ) : (
              <h4>Cart list empty</h4>
            )}
          </div>
        </Col>
        <Col md="4" sm="12" xs="12">
          <CardCheckout detailInvoice={detailInvoice} isStatus={data.status} handleConfirmDone={handleConfirmDone} />
        </Col>
      </Row>
    </>
  )
}