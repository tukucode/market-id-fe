import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, InputGroup, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import handleErrorMessage from "../utils/handleErrorMessage";

import { useFormik } from "formik";
import * as Yup from "yup";

import { axiosInstance as axios } from "../config/https";

const initialValues = {
  full_name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  full_name: Yup.string()
    .required("Field is required")
    .min(4, "Input must be at least 4 characters")
    .max(30, "Input must be at most 30 characters"),
  email: Yup.string().required("Field is required").email(),
  password: Yup.string().required("Field is required").min(8).max(12),
});

export default function Register() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function handleShowPassword() {
    setShow(!show);
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const form = values;
      axios
        .post("/users/new", form)
        .then((response) => {
          const message = response.data.message;

          toast(handleErrorMessage(message), {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.SUCCESS,
          });

          navigate("/login");
        })
        .catch((error) => {
          const message = error.response?.data?.message;

          toast(handleErrorMessage(message), {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.ERROR,
          });
        });
    },
  });

  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "24.5rem", padding: "2rem" }}>
        <Card.Body>
          <h4 className="heading__4 mb-4">Register</h4>

          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="full_name" className="mb-2">
                Full Name
              </Form.Label>
              <Form.Control
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Elon Musk"
                maxLength="32"
                value={formik.values.full_name}
                onChange={formik.handleChange}
                className={formik.errors.full_name && "border-danger"}
              />

              {formik.errors.full_name && (
                <small className="text-danger text__5">
                  {formik.errors.full_name}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label htmlFor="email" className="mb-2">
                Email
              </Form.Label>
              <Form.Control
                id="email"
                name="email"
                type="email"
                placeholder="example@market.id"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={formik.errors.email && "border-danger"}
              />

              {formik.errors.email && (
                <small className="text-danger text__5">
                  {formik.errors.email}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password" className="mb-2">
                Password
              </Form.Label>
              <InputGroup>
                <Form.Control
                  id="passowrd"
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className={formik.errors.email && "border-danger"}
                />
                <Button variant="light" onClick={handleShowPassword}>
                  {show ? (
                    <i className="bi bi-eye"></i>
                  ) : (
                    <i className="bi bi-eye-slash"></i>
                  )}
                </Button>
              </InputGroup>
              {formik.errors.password && (
                <small className="text-danger text__5">
                  {formik.errors.password}
                </small>
              )}
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 my-4">
              Register
            </Button>
          </Form>

          <p className="text__5 text-center mb-0">
            Already have an account? please <Link to="/login">login</Link>.
          </p>
        </Card.Body>
      </Card>
    </section>
  );
}
