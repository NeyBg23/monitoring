import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

export default function Login() {
  const navigate = useNavigate()

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">🌳</div>
        <h1>Sistema de Monitoreo Forestal</h1>
        <p className="subtitle">Por favor, inicia sesión en el portal principal</p>

        <div className="login-info">
          <p>
            Esta aplicación requiere autenticación previa en el 
            <strong> Portal Principal del IFN</strong>.
          </p>
          <p>
            Accede primero desde allí y tu sesión se compartirá automáticamente 
            con esta aplicación de monitoreo.
          </p>
        </div>

        <a 
          href="https://react-vercel-deploy-brown.vercel.app/login"
          className="btn-ir-login"
        >
          🔑 Ir a Iniciar Sesión
        </a>

        <div className="steps">
          <h3>Pasos:</h3>
          <ol>
            <li>Haz clic en el botón superior</li>
            <li>Inicia sesión con tu usuario y contraseña</li>
            <li>Regresa a esta aplicación</li>
            <li>¡Listo! Ya tendrás acceso automático</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
