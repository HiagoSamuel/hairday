// Tipos que descrevem o que a API vai retornar
export type LoginCredentials = {
  email: string
  password: string
}

export type AuthResponse = {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

// ─────────────────────────────────────────────
// MOCK — Simula uma chamada real de API
// Quando tiver backend, só troque o corpo dessa função
// por um fetch real, mantendo a mesma assinatura
// ─────────────────────────────────────────────
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // Simula o delay de rede (1 segundo)
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simula erro de credenciais inválidas
  if (credentials.email !== "admin@hairday.com" || credentials.password !== "123456") {
    throw new Error("E-mail ou senha incorretos.")
  }

  // Simula resposta de sucesso do backend
  return {
    token: "mock-jwt-token-hairday-2024",
    user: {
      id: "usr_001",
      name: "Admin HairDay",
      email: credentials.email,
    },
  }
}