import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../../services/auth/auth"
import { useAuth } from "../../contexts/AuthContext"

export function LoginPage() {
  const navigate = useNavigate()
  const { saveAuth } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin() {
    // Validação básica
    if (!email.trim() || !password.trim()) {
      setError("Preencha e-mail e senha.")
      return
    }

    try {
      setIsLoading(true)
      setError("") // limpa erro anterior

      // Chama o mock (ou futuramente, o backend real)
      const response = await login({ email, password })

      // Salva token e usuário no contexto + localStorage
      saveAuth(response.token, response.user)

      // Redireciona para o app
      navigate("/")

    } catch (err) {
      // O mock lança um Error com mensagem — capturamos aqui
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Erro ao fazer login. Tente novamente.")
      }
    } finally {
      // finally sempre executa — garante que o loading para
      // mesmo se der erro
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray800 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="text-yellowLight font-bold text-3xl tracking-tight">
            HairDay
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#DBC170" viewBox="0 0 256 256">
            <path d="M234.67,66.74a8,8,0,0,0-11.31.25L192,99.58V88a32,32,0,0,0-32-32H80A32,32,0,0,0,48,88v80a32,32,0,0,0,32,32h80a32,32,0,0,0,32-32V156.42l31.36,32.59a8,8,0,1,0,11.56-11.06L192,151.92V144h20a8,8,0,0,0,0-16H192V104h20a8,8,0,0,0,0-16H192V80.08l42.92-44.59a8,8,0,0,0-.25-11.31ZM176,168a16,16,0,0,1-16,16H80a16,16,0,0,1-16-16V88A16,16,0,0,1,80,72h80a16,16,0,0,1,16,16Z"/>
          </svg>
        </div>

        {/* Card de login */}
        <div className="bg-gray700 border border-gray600 rounded-2xl p-8 flex flex-col gap-6">

          <div>
            <h1 className="text-gray100 text-xl font-bold">Bem-vindo de volta</h1>
            <p className="text-gray400 text-sm mt-1">Entre com suas credenciais para acessar</p>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Campo Email */}
          <div className="flex flex-col gap-2">
            <label className="text-gray100 text-sm font-bold">E-mail</label>
            <input
              type="email"
              placeholder="admin@hairday.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError("") // limpa erro ao digitar
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="bg-gray800 border border-gray600 text-gray100 text-sm rounded-lg px-4 py-3 placeholder:text-gray500 focus:outline-none focus:border-yellowLight transition-colors"
            />
          </div>

          {/* Campo Senha */}
          <div className="flex flex-col gap-2">
            <label className="text-gray100 text-sm font-bold">Senha</label>
            <input
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="bg-gray800 border border-gray600 text-gray100 text-sm rounded-lg px-4 py-3 placeholder:text-gray500 focus:outline-none focus:border-yellowLight transition-colors"
            />
          </div>

          {/* Botão */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-yellowLight hover:bg-yellow disabled:opacity-60 disabled:cursor-not-allowed text-gray900 font-bold text-sm py-4 rounded-lg transition-colors uppercase tracking-widest"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>

          {/* Dica das credenciais do mock */}
          <p className="text-gray500 text-xs text-center">
            Mock: admin@hairday.com / 123456
          </p>

        </div>
      </div>
    </div>
  )
}