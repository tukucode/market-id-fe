import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
export default function Home() {
  const navigate = useNavigate()
  function handleGoToHome() {
    navigate('/')
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1>404 | Nof Found</h1>
      <Button variant="primary" onClick={handleGoToHome}>Home</Button>
    </div>
  )
}
