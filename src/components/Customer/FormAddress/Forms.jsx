/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import { useEffect, useState } from "react"
import { Card, Row, Col, Form, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import handleErrorMessage from "../../../utils/handleErrorMessage"
import { axiosInstance as axios } from "../../../config/https"
import { useDispatch } from "react-redux"
import ASelect from "../../ASelect"

const initialValues = {
  name: "",
  province: {
    _id: '',
    name: ''
  },
  regency: {
    _id: '',
    name: ''
  },
  district: {
    _id: '',
    name: ''
  },
  village: {
    _id: '',
    name: ''
  },
  passcode: '',
  address: ""
};

const validationSchema = Yup.object({
  name: Yup.string().required('Field name is required').min(5),
  province: Yup.object().shape({
    _id: Yup.string().required('Field province is required')
  }),
  regency: Yup.object().shape({
    _id: Yup.string().required('Field regency is required')
  }),
  district: Yup.object().shape({
    _id: Yup.string().required('Field disctrict is required')
  }),
  village: Yup.object().shape({
    _id: Yup.string().required('Field disctrict is required')
  }),
  passcode: Yup.string().required('Field passcode is required'),
  address: Yup.string().required('Field address is required').min(10),
});

export default function FormAddress({ isEdit = false, detail = {} }) {
  // FORMIK
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  });

  // PROPS Detail
  useEffect(() => {
    if (isEdit && JSON.stringify(detail) !== "{}") {
      formik.setFieldValue('name', detail.name)
      formik.setFieldValue('passcode', detail.passcode)
      formik.setFieldValue('address', detail.address)

      setIsLoadProvince(true)
      getOptionsDistrict(detail.regency._id)
      getOptionsVillage(detail.district._id)

      handleChangeProvince({target: { name : 'province._id', value: detail.province._id }}, 'province.name')
      handleChangeRegency({target: { name : 'regency._id', value: detail.regency._id }}, 'regency.name')
      handleChangeDistirct({target: { name : 'district._id', value: detail.district._id }}, 'district.name')
      handleChangeVillage({target: { name : 'village._id', value: detail.village._id }}, 'village.name')
    }
  }, [isEdit, detail])
  

  const dispatch = useDispatch()
  const [isLoadProvince, setIsLoadProvince] = useState(true)
  const [dataProvince, setDataProvince] =  useState([])
  useEffect(() => {
    if (isLoadProvince) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });
      axios
        .get('/provinces.json')
        .then((response) => {
          setDataProvince(response.data)
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
          setIsLoadProvince(false)
        });
    }
  }, [isLoadProvince, dispatch])


  function handleIsError (key, sub_key) {
    if (sub_key) return (formik.touched[key] && formik.errors[key]) && formik.touched[key][sub_key] && formik.errors[key][sub_key]
    
    return formik.touched[key] && formik.errors[key]
  }

  function handleChangeProvince(event, key) {
    formik.setFieldValue(event.target.name, event.target.value);
    const findByID = dataProvince.find((province) => province.id === event.target.value)
    formik.setFieldValue(key, findByID ? findByID.name : '');

    if (findByID) getOptionsRegency(findByID.id)

    formik.setFieldValue("regency", { _id: '', name: ''});
    formik.setFieldValue("district", { _id: '', name: ''});
    formik.setFieldValue("village", { _id: '', name: ''});
  }

  // REGENCY
  const [dataRegency, setDataRegency] =  useState([])
  function getOptionsRegency (id) {
   // SET LOADING
   dispatch({ type: "SET_LOADING", value: true });
   axios
     .get(`/regencies/${id}.json`)
     .then((response) => {
        setDataRegency(response.data)
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
  }

  function handleChangeRegency(event, key) {
    formik.setFieldValue(event.target.name, event.target.value);
    const findByID = dataRegency.find((regency) => regency.id === event.target.value)
    formik.setFieldValue(key, findByID ? findByID.name : '');

    if (findByID) getOptionsDistrict(findByID.id)

    formik.setFieldValue("district", { _id: '', name: ''});
    formik.setFieldValue("village", { _id: '', name: ''});
  }

   // District
   const [dataDistrict, setDataDistrict] =  useState([])
   function getOptionsDistrict (id) {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .get(`/districts/${id}.json`)
      .then((response) => {
        setDataDistrict(response.data)
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
   }
   
   function handleChangeDistirct(event, key) {
      formik.setFieldValue(event.target.name, event.target.value);
      const findByID = dataDistrict.find((disctrict) => disctrict.id === event.target.value)
      formik.setFieldValue(key, findByID ? findByID.name : '');
     
      if (findByID) getOptionsVillage(findByID.id)

      formik.setFieldValue("village", { _id: '', name: ''});
    }
  
  // Village
  const [dataVillage, setDataVillage] =  useState([])
  // SET LOADING
  function getOptionsVillage (id) {
    dispatch({ type: "SET_LOADING", value: true });
    axios
    .get(`/villages/${id}.json`)
    .then((response) => {
      setDataVillage(response.data)
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
  }

  function handleChangeVillage(event, key) {
    formik.setFieldValue(event.target.name, event.target.value);
    const findByID = dataVillage.find((village) => village.id === event.target.value)

    formik.setFieldValue(key, findByID ? findByID.name : '');
   }

  const navigate = useNavigate()
  // SUBMIT
  function handleOnSubmit(values) {
    if (!isEdit) createAddress (values)
    else editeAddress(values)
  }

  function createAddress (payload) {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/address/new`, payload)
    .then((response) => {
      toast(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.SUCCESS,
      });
      navigate('/address')
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
  }

  function editeAddress (payload) {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axios
    .put(`${process.env.REACT_APP_API_BASE_URL}/address/${detail._id}/update`, payload)
    .then((response) => {
      toast(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.SUCCESS,
      });
      navigate('/address')
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
  }

  function handleCancel() {
    formik.resetForm()
    navigate('/address')
  }

  return (
    <Card className="p-4">
      <Card.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            {/* NAME */}
            <Col md="6"> 
              <Form.Group className="mt-lg-0 mt-2 mb-2">
                <Form.Label htmlFor="name" className="mb-2">
                  Name
                </Form.Label>
                <Form.Control 
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full name"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={
                    handleIsError('name') && "border-danger"
                  }
                />

                {formik.touched.name && formik.errors.name && (
                  <small className="text-danger text__5">
                    {formik.errors.name}
                  </small>
                )}
              </Form.Group>
            </Col>

            {/* PROVINCE */}
            <Col md="6"> 
              <ASelect 
                id="province"
                label="Province"
                name="province._id"
                value={formik.values.province._id}
                onBlur={formik.handleBlur}
                keyChange='province.name'
                handleChange={(event, keyChange) => handleChangeProvince(event, keyChange)}
                isError={handleIsError('province', '_id')}
                msgError={formik.errors.province && formik.errors.province._id}
                options={dataProvince}
              />
            </Col>

            {/* Region/City */}
            <Col md="6"> 
              <ASelect 
                id="regency"
                label="Region/City"
                name="regency._id"
                value={formik.values.regency._id}
                onBlur={formik.handleBlur}
                keyChange='regency.name'
                handleChange={(event, keyChange) => handleChangeRegency(event, keyChange)}
                isError={handleIsError('regency', '_id')}
                msgError={formik.errors.regency && formik.errors.regency._id}
                options={dataRegency}
              />
            </Col>

            {/* Disctrict */}
            <Col md="6"> 
              <ASelect 
                id="district"
                label="District"
                name="district._id"
                value={formik.values.district._id}
                onBlur={formik.handleBlur}
                keyChange='district.name'
                handleChange={(event, keyChange) => handleChangeDistirct(event, keyChange)}
                isError={handleIsError('district', '_id')}
                msgError={formik.errors.district && formik.errors.district._id}
                options={dataDistrict}
              />
            </Col>

            {/* Village */}
            <Col md="6"> 
              <ASelect 
                id="village"
                label="Village"
                name="village._id"
                value={formik.values.village._id}
                onBlur={formik.handleBlur}
                keyChange='village.name'
                handleChange={(event, keyChange) => handleChangeVillage(event, keyChange)}
                isError={handleIsError('village', '_id')}
                msgError={formik.errors.village && formik.errors.village._id}
                options={dataVillage}
              />
            </Col>

            {/* Passcode */}
            <Col md="6"> 
              <Form.Group className="mt-lg-0 mt-2 mb-2">
                <Form.Label htmlFor="passcode" className="mb-2">
                  Passcode
                </Form.Label>
                <Form.Control 
                  id="passcode"
                  name="passcode"
                  type="text"
                  placeholder="Passcode"
                  value={formik.values.passcode}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  maxLength="5"
                  className={
                    handleIsError('passcode') && "border-danger"
                  }
                />

                {formik.touched.passcode && formik.errors.passcode && (
                  <small className="text-danger text__5">
                    {formik.errors.passcode}
                  </small>
                )}
              </Form.Group>
            </Col>

            {/* Address */}
            <Col md="12"> 
              <Form.Group className="mt-lg-0 mt-2 mb-2">
                <Form.Label htmlFor="address" className="mb-2">
                  Address
                </Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3}
                  id="address"
                  name="address"
                  placeholder="Input your address"
                  value={formik.values.address}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  maxLength="100"
                  className={
                    handleIsError('address') && "border-danger"
                  }
                />

                {formik.touched.address && formik.errors.address && (
                  <small className="text-danger text__5">
                    {formik.errors.address}
                  </small>
                )}
              </Form.Group>
            </Col>

            <Col xs="12" className="d-flex justify-content-end align-items-center mt-3">
              { isEdit && (
                <Button type="button" variant="light" onClick={handleCancel} className="me-2">Cancel</Button>
              )}
              <Button type="submit" variant="success">{ isEdit ? 'Update' : 'Create'}</Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}