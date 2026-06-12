import { useEffect, useState, type PropsWithChildren } from "react"
import { useNavigate } from "react-router"
import { api } from "./apis"
import { authState } from "../store/AuthStore"

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = authState()
  const navigate = useNavigate()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/api/v1/auth/profile")
        authState.setState({ isAuthenticated: Boolean(response.data?.user) })
      } catch (error) {
        console.error("Error checking authentication:", error)
        authState.setState({ isAuthenticated: false })
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      navigate("/auth", { replace: true })
    }
  }, [isAuthenticated, isCheckingAuth, navigate])

  if (isCheckingAuth) {
    return null
  }

  return (
    <div>
      {isAuthenticated ? children : null}
    </div>
  )
}



export default ProtectedRoute
