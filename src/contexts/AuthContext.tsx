import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"

const TOKEN_KEY = "hairday:token"
const USER_KEY = "hairday:user"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  saveAuth: (token: string, user: User) => void
  logout: () => void
}

// Cria o contexto com valor inicial vazio
// O "null!" é um "non-null assertion" — estamos dizendo ao TypeScript
// que esse valor nunca será null quando usado corretamente (dentro do Provider)
const AuthContext = createContext<AuthContextType>(null!)

// Hook customizado — forma idiomática de consumir o contexto
// Evita ter que importar useContext + AuthContext em todo componente
export function useAuth() {
  return useContext(AuthContext)
}

type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  // Inicializa já lendo do localStorage (persiste entre reloads)
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY)
  })

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(USER_KEY)
    return stored ? JSON.parse(stored) : null
  })

  // Salva token e usuário após login bem-sucedido
  function saveAuth(newToken: string, newUser: User) {
    localStorage.setItem(TOKEN_KEY, newToken)
    localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  // Remove tudo ao fazer logout
  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!token, // converte string | null para boolean
      user,
      saveAuth,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}