import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (!token || !user) {
      // Redirige a página de no autorizado
      setIsAuthorized(false)
    } else {
      setIsAuthorized(true)
    }
  }, [])

  if (isAuthorized === null) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#1B5E20' }}>Cargando...</div>
  }

  if (!isAuthorized) {
    navigate('/not-authorized')
    return null
  }

  return children
}
