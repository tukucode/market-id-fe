import { Row, Col } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ABreadCrumb from "../../ABreadCrumb";
import AListGroup from "../../AListGroup";
import FormAddress from "./Forms"

import { toast } from "react-toastify"
import handleErrorMessage from "../../../utils/handleErrorMessage";
import { axiosInstance as axios } from "../../../config/https"
import { useDispatch } from "react-redux"

export default function FormAddressEdit() {
  const dispatch = useDispatch()
  const { id } = useParams()

  const options = [
    {
      href: "/",
      name: "Landing Page",
      active: false,
    },
    {
      href: "/address",
      name: "Address",
      active: false,
    },
    {
      href: "/address/edit",
      name: "Edit",
      active: true,
    },
  ];

  const menus = [
    {
      link: "/profile",
      title: "Profile",
    },
    {
      link: `/address/edit/${id}`,
      title: "Address",
    },
    {
      link: "/history",
      title: "History",
    }
  ]

  const [detail, setDetail] = useState({})
  useEffect(() => {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/address/${id}/detail`)
      .then((response) => {
        setDetail(response.data.data)
      })
      .catch((error) => {
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
  }, [id, dispatch])

  return (
    <Row>
      <Col xs="12">
        <ABreadCrumb options={options} />
      </Col>
      
      <Col md="3">
        <AListGroup menus={menus} />
      </Col>

      <Col md="9">
        <FormAddress isEdit={true} detail={detail} />
      </Col>
    </Row>
  )
}