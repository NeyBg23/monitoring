import { useNavigate } from 'react-router-dom'
import '../styles/NotAuthorized.css'

export default function NotAuthorized() {
  const navigate = useNavigate()

  return (
    <div className="not-authorized-container">
      <div className="not-authorized-card">
        <div className="icon">🔐</div>
        <h1>Acceso No Autorizado</h1>
        <p>No tienes permiso para acceder a esta sección.</p>
        <p className="subtitle">Por favor, inicia sesión primero en el portal principal.</p>
        
        <div className="action-buttons">
          <a 
            href="https://ifn-fronted-web.vercel.app/login" 
            className="btn-login"
          >
            🔑 Ir a Iniciar Sesión
          </a>
          <button 
            onClick={() => navigate('/')}
            className="btn-back"
          >
            ← Volver Atrás
          </button>
        </div>

        <div className="info-box">
          <h3>¿Cómo acceder?</h3>
          <ol>
            <li>Abre el portal principal: <strong>ifn-fronted-web.vercel.app</strong></li>
            <li>Inicia sesión con tu usuario de brigadista</li>
            <li>Tu sesión se compartirá automáticamente con esta aplicación</li>
            <li>Accede nuevamente a esta sección</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
