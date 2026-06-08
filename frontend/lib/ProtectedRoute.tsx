import {authState} from "../store/AuthStore"
import {useEffect} from "react"
import { useNavigate } from "react-router"

const ProtectedRoute = ({children}:React.PropsWithChildren<object>) => {
  const {isAuthenticated,checkAuth} = authState()
  const navigate = useNavigate()

  useEffect(()=>{
    checkAuth()
  },[isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [isAuthenticated, navigate])

  return (
    <div>
      {isAuthenticated ? children : <h1>Please login to access this page</h1>}
    </div>
  )
}



export default ProtectedRoute