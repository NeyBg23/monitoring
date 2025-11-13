import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (!token || !user) {
      // Sin token → Redirige a página de no autorizado
      setIsAuthorized(false)
    } else {
      setIsAuthorized(true)
    }
  }, [navigate])

  if (isAuthorized === null) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#1B5E20'
      }}>
        <p>Cargando...</p>
      </div>
    )
  }

  if (!isAuthorized) {
    navigate('/not-authorized')
    return null
  }

  return children
}
