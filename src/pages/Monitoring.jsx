import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Monitoring.css'
import { Camera, Loader } from 'lucide-react'

export default function Monitoring() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('captura')
  const [cameraActive, setCameraActive] = useState(false)
  const [conglomerados, setConglomerados] = useState([])
  const [selectedConglomerado, setSelectedConglomerado] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar conglomerados desde la BD
    const cargarDatos = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('https://monitoring-backend-eight.vercel.app/api/conglomerados', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          setConglomerados(data.data || [])
        }
      } catch (error) {
        console.error('Error cargando conglomerados:', error)
      } finally {
        setLoading(false)
      }
    }

    cargarDatos()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="monitoring-container">
      {/* Header */}
      <header className="monitoring-header">
        <div className="header-content">
          <h1>📊 Sistema de Monitoreo Forestal</h1>
          <button onClick={handleLogout} className="btn-logout">
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="monitoring-main">
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === 'captura' ? 'active' : ''}`}
            onClick={() => setActiveTab('captura')}
          >
            📸 Captura de Datos
          </button>
          <button
            className={`tab-btn ${activeTab === 'historial' ? 'active' : ''}`}
            onClick={() => setActiveTab('historial')}
          >
            📋 Historial de Detecciones
          </button>
        </div>

        {/* Tab: Captura */}
        {activeTab === 'captura' && (
          <div className="tab-content">
            <div className="captura-card">
              <h2>Captura de Imágenes y Datos</h2>
              
              {/* Seleccionar Conglomerado */}
              <div className="form-group">
                <label>Selecciona un Conglomerado:</label>
                <select 
                  value={selectedConglomerado?.id || ''} 
                  onChange={(e) => {
                    const cong = conglomerados.find(c => c.id === e.target.value)
                    setSelectedConglomerado(cong)
                  }}
                  className="form-select"
                >
                  <option value="">-- Selecciona --</option>
                  {conglomerados.map(cong => (
                    <option key={cong.id} value={cong.id}>
                      {cong.codigo} - {cong.brigada_id}
                    </option>
                  ))}
                </select>
              </div>

              {selectedConglomerado && (
                <>
                  {/* Información del Conglomerado */}
                  <div className="conglomerado-info">
                    <h3>Información del Conglomerado</h3>
                    <p><strong>Código:</strong> {selectedConglomerado.codigo}</p>
                    <p><strong>Latitud:</strong> {selectedConglomerado.latitud}</p>
                    <p><strong>Longitud:</strong> {selectedConglomerado.longitud}</p>
                    <p><strong>Fecha:</strong> {selectedConglomerado.fecha_establecimiento}</p>
                  </div>

                  {/* Cámara o Carga de Imagen */}
                  <div className="camera-section">
                    {!cameraActive ? (
                      <button 
                        onClick={() => setCameraActive(true)}
                        className="btn-camera"
                      >
                        <Camera size={24} className="me-2" />
                        Activar Cámara
                      </button>
                    ) : (
                      <div className="camera-view">
                        <p>Cámara activada (implementar acceso a cámara)</p>
                        <button 
                          onClick={() => setCameraActive(false)}
                          className="btn-secondary"
                        >
                          Desactivar
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Formulario de Detección */}
                  <div className="detection-form">
                    <h3>Datos de la Detección</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Categoría de Árbol:</label>
                        <select className="form-select">
                          <option>B - Brinzal</option>
                          <option>L - Latizal</option>
                          <option>F - Fuste</option>
                          <option>FG - Fuste Grande</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Azimut (°):</label>
                        <input type="number" placeholder="0-360" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Distancia (m):</label>
                        <input type="number" placeholder="0-25" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Confianza (%):</label>
                        <input type="number" placeholder="0-100" className="form-control" />
                      </div>
                    </div>
                    <button className="btn-guardar">💾 Guardar Detección</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Tab: Historial */}
        {activeTab === 'historial' && (
          <div className="tab-content">
            <div className="historial-card">
              <h2>Historial de Detecciones</h2>
              <p className="text-muted">Aquí aparecerán las detecciones guardadas</p>
              {loading && <Loader className="spinner" />}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
