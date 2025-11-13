import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (!token || !user) {
      // Sin token → Redirige directamente al login del frontend principal
      window.location.href = 'https://react-vercel-deploy-brown.vercel.app/login'
    } else {
      setIsAuthorized(true)
    }
  }, [])

  if (isAuthorized === null) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#1B5E20' }}>Cargando...</div>
  }

  return children
}
