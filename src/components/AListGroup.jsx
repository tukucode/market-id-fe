import { ListGroup } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import handleErrorMessage from "../utils/handleErrorMessage";
import { axiosInstance as axios } from "../config/https"

export default function AListGroup({ menus }) {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  function handleLogout() {
    const _id = user._id;

    dispatch({ type: "SET_LOADING", value: true });
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/users/${_id}/logout`)
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // to page login
        window.location.href = "/login";
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
      });
  }

  const location = useLocation()
  const navigate = useNavigate()

  function handleGoToLink(link) {
    navigate(`${link}`)
  }
  return(
    <ListGroup>
      {
        menus.map((menu, index) => (
          <ListGroup.Item 
            key={`list-menu-${menu.title}-${index}`} 
            active={menu.link === location.pathname} 
            action
            onClick={() => handleGoToLink(menu.link)}
          >
            { menu.title } 
          </ListGroup.Item>
        ))
      }
      <ListGroup.Item action onClick={() => handleLogout()}>
        Logout
      </ListGroup.Item>
    </ListGroup>
  )
}