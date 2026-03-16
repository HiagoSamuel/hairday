import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth()

  // Se não está autenticado, redireciona para /login
  // "replace" substitui a entrada no histórico do navegador
  // sem isso, o botão "voltar" do navegador voltaria para a rota protegida
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}