import { Row, Col } from "react-bootstrap"

import ABreadCrumb from "../components/ABreadCrumb";
import AListGroup from "../components/AListGroup";
import CardAddress from "../components/Customer/CardAddress";

export default function Address() {
  const options = [
    {
      href: "/",
      name: "Landing Page",
      active: false,
    },
    {
      href: "/address",
      name: "Address",
      active: true,
    },
  ];

  const menus = [
    {
      link: "/profile",
      title: "Profile",
    },
    {
      link: "/address",
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
        <CardAddress />
      </Col>
    </Row>
  )
}