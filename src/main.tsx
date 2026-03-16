import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import App from "./App"

import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* BrowserRouter habilita o sistema de rotas na aplicação inteira */}
    <BrowserRouter>
      {/* AuthProvider disponibiliza o estado de auth para todos os componentes */}
      <AuthProvider>
        <Routes>

          {/* Rota pública — qualquer um acessa */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rota protegida — só acessa se estiver autenticado */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />

          {/* Qualquer rota desconhecida redireciona para "/" */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)