import { Row, Col } from "react-bootstrap"

import ABreadCrumb from "../../ABreadCrumb";
import AListGroup from "../../AListGroup";
import FormAddress from "./Forms"

export default function FormAddressCreate() {
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
      href: "/address/create",
      name: "Create",
      active: true,
    },
  ];

  const menus = [
    {
      link: "/profile",
      title: "Profile",
    },
    {
      link: "/address/create",
      title: "Address",
    },
    {
      link: "/history",
      title: "History",
    }
  ]

  return (
    <Row>
      <Col xs="12">
        <ABreadCrumb options={options} />
      </Col>
      
      <Col md="3">
        <AListGroup menus={menus} />
      </Col>

      <Col md="9">
        <FormAddress />
      </Col>
    </Row>
  )
}