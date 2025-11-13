import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './styles/App.css'

// Páginas
import Login from './pages/Login'
import Monitoring from './pages/Monitoring'
import ProtectedRoute from './components/ProtectedRoute'
import NotAuthorized from './pages/NotAuthorized'

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Navigate to="/monitoring" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas */}
        <Route 
          path="/monitoring" 
          element={
            <ProtectedRoute>
              <Monitoring />
            </ProtectedRoute>
          } 
        />
        
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<Navigate to="/monitoring" replace />} />
      </Routes>
    </Router>
  )
}

export default App

