import { useEffect, useState } from "react"
import { Card, Button, Row, Col, InputGroup, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"

import TableAddress from "./TableAddress"
import { PaginationControl } from "react-bootstrap-pagination-control"

import { toast } from "react-toastify"
import handleErrorMessage from "../../utils/handleErrorMessage"
import { axiosInstance as axios } from "../../config/https"

export default function CardAddress() {
  const dispatch = useDispatch()

  const [isLoad, setIsLoad] = useState(true)
  const [dataAddress, setDataAddress] = useState([])
  const [params, setParams] = useState({
    q: '',
    sort_by: 'desc',
    page: 1,
    per_page: 10,
  });
  const [totalData, setTotalData] = useState(0)

  function handleChange(event) {
    const key = event.target.name
    setParams({...params, [key]: event.target.value})
    setIsLoad(true)
  }

  function handleChangeSearch(event) {
    const key = event.target.name
    setParams({...params, [key]: event.target.value})

    if (event.target.value.length === 0) setIsLoad(true)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setIsLoad(true)
  }

  function handlePagination(page) {
    setParams({...params, page})
    setIsLoad(true)
  }

  useEffect(() => {
    if (isLoad) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });
      axios
        .get('/api/address/list', { params: {...params } })
        .then((response) => {
          setDataAddress(response.data.data)
          setTotalData(response.data.pagination.total)
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
          setIsLoad(false)
        });
    }
  }, [isLoad, params, dispatch])

  return (
    <Card>
      <Card.Body>
        <Row>
          {/* SORT - SEARCH - CREATE */}
          <Col lg="9" md="12" sm="12">
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Form.Select
                  name="sort_by"
                  value={params.sort_by}
                  onChange={handleChange}
                  style={{ width: '15%'}}
                  className="mt-sm-0 mb-2"
                >
                  <option value="asc">ASC</option>
                  <option value="desc">DESC</option>
                </Form.Select>

                <Form.Control
                  name="q"
                  value={params.q}
                  onChange={handleChangeSearch}
                  placeholder="Search by code invoice"
                  style={{ width: '85%'}}
                  className="mt-sm-0 mb-2"
                />
              </InputGroup>
            </Form>
          </Col>

          <Col lg="3" md="12" sm="12">
            <Button 
              variant="success"
              className="text-truncate w-100 mt-lg-0 mt-2"
            >
              Create <i className="bi bi-pencil-fill"></i>
            </Button>
          </Col>

          {/* TABLE */}
          <Col xs="12" className="mt-md-0 mt-2">
            <TableAddress list={dataAddress} />
          </Col>

          {/* PAGINATION */}
          <Col xs="12">
            <div className="d-flex justify-content-end align-items-center">
              <Form.Select
                name="per_page"
                value={params.per_page}
                onChange={handleChange}
                className="w-auto me-4 mb-3"
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </Form.Select>

              <PaginationControl
                page={params.page}
                limit={params.per_page}
                total={totalData}
                ellipsis={2}
                between={4}
                changePage={handlePagination}
              ></PaginationControl>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}