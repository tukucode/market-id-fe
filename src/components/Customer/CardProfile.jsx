import { useEffect, useState, useRef } from "react"
import { Form, Card, Row, Col, Image, Button } from "react-bootstrap"

import { toast } from "react-toastify";
import handleErrorMessage from "../../utils/handleErrorMessage";
import { axiosInstance as axios } from "../../config/https"

import { useSelector, useDispatch } from "react-redux"

import { useFormik } from "formik";
import * as Yup from "yup";
import ImgProfile  from "../../assets/images/profile.png?url"

const initialValues = {
  full_name: "",
  email: "",
  file_name: "",
  status: false,
};

const validationSchema = Yup.object({
  full_name: Yup.string()
  .required("Field is required")
  .min(4, "Input must be at least 4 characters")
  .max(30, "Input must be at most 30 characters"),
  email: Yup.string().required("Field is required").email(),
  file_name: Yup.string().required("Field is required")
});

export default function CardProfile() {
  const { user } = useSelector((state) => state.auth)
  const _id = user._id
  const dispatch = useDispatch()

  // FORMIK
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleUpdateProfile,
  });

  const [isLoad, setIsLoad] = useState(true)
  const [urlImage, setUrlImage] = useState(null)
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (isLoad) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${_id}/detail`).then((response) => {
        const detail =  response.data.data

        // set urlImage
        setUrlImage(detail.image.url)

        formik.setFieldValue("full_name", detail.full_name);
        formik.setFieldValue("email", detail.email);
        formik.setFieldValue("status", detail.status);
      }).catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      }).finally(() => {
        // SET LOADING
        dispatch({ type: "SET_LOADING", value: false });
        setIsLoad(false)
      })
    }
  }, [isLoad, _id, dispatch, formik])

  function handleUpdateProfile(form) {
    const formData = new FormData()
    formData.append("full_name", form.full_name)
    formData.append("email", form.email)
    formData.append("image", image)
    formData.append("status", form.status)

    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axios.put(`${process.env.REACT_APP_API_BASE_URL}/users/${_id}/update`, formData).then((response) => {
      toast(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.SUCCESS,
      });
    }).catch((error) => {
      const message = error.response?.data?.message;
      toast(handleErrorMessage(message), {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.ERROR,
      });
    }).finally(() => {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: false });
      handleResetForm()
    })
  }

  function handleChangeImage(event) {
    const file = event.currentTarget.files[0]
    // set input file_name
    formik.setFieldValue("file_name", event.currentTarget.value);
    // set input image
    setImage(file)

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        // set url image
        setUrlImage(fileReader.result)
      }
    };

    fileReader.readAsDataURL(file);
  }
  
  const refImage = useRef()
  function handleResetForm() {
    // reset input image
    refImage.current.value = null;
    // reset formik
    formik.resetForm()
    setIsLoad(true)
  }
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Card className="p-4 mt-md-0 mt-3">
        <Card.Body>
          <Row>
            {/* IMG PROFILE */}
            <Col lg="3" xs="12" className=" text-center">
              <Image 
                rounded 
                src={urlImage ? urlImage : ImgProfile} 
                alt="image profile"
                className="w-full mx-auto"
                style={{ width: '100%', height: '180px', aspectRatio: '3/2', objectFit: 'contain'  }} 
              />
            </Col>

            {/* INPUT LEFT */}
            <Col lg="5" xs="12">
              <Form.Group className="mt-lg-0 mt-2 mb-2">
                <Form.Label htmlFor="full_name" className="mb-2">
                  Full Name
                </Form.Label>
                <Form.Control 
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="Full name"
                  value={formik.values.full_name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={
                    formik.touched.full_name &&
                    formik.errors.full_name &&
                    "border-danger"
                  }
                />

                {formik.touched.full_name && formik.errors.full_name && (
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
                  disabled
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Examople@market.id"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={
                    formik.touched.email &&
                    formik.errors.email &&
                    "border-danger"
                  }
                />

                {formik.touched.email && formik.errors.email && (
                  <small className="text-danger text__5">
                    {formik.errors.email}
                  </small>
                )}
              </Form.Group>
            </Col>

            {/* INPUT RIGHT */}
            <Col lg="4" xs="12">
              <Form.Group className="mb-2">
                <Form.Label htmlFor="file_name" className="mb-2">
                  Image
                </Form.Label>
                <Form.Control 
                  ref={refImage}
                  id="file_name"
                  name="file_name"
                  type="file"
                  accept="image/*"
                  placeholder="Choose File"
                  value={formik.values.file_name}
                  onBlur={formik.handleBlur}
                  onChange={handleChangeImage}
                  className={
                    formik.touched.file_name &&
                    formik.errors.file_name &&
                    "border-danger"
                  }
                />

                {formik.touched.file_name && formik.errors.file_name && (
                  <small className="text-danger text__5">
                    {formik.errors.file_name}
                  </small>
                )}
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label htmlFor="status" className="mb-2">
                  Status
                </Form.Label>
                <Form.Select
                  disabled
                  id="status"
                  name="status"
                  placeholder="Status"
                  value={formik.values.status}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={
                    formik.touched.status &&
                    formik.errors.status &&
                    "border-danger"
                  }
                >
                  <option value={false}>Non Active</option>
                  <option value={true}>Active</option>
                </Form.Select>

                {formik.touched.password && formik.errors.password && (
                  <small className="text-danger text__5">
                    {formik.errors.password}
                  </small>
                )}
              </Form.Group>
            </Col>

            {/* ACTION */}
            <Col className="mt-2 d-flex justify-content-end">
              <Button type="button" variant="light" className="me-2" onClick={handleResetForm}>Cancel</Button>
              <Button type="submit" variant="success">Update</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  )
}