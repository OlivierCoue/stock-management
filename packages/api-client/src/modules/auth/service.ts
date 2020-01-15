enum AuthNotification {
  LOGIN_ERROR = "L'identifiant ou le mot de passe indiqué est invalide",
  LOGOUT_ERROR = 'Logout cannot be proceeded',
}

export class AuthService {
  public static readonly authEndpoint = `${process.env.SERVER_URL}/auth`

  static async login(email: string, password: string): Promise<boolean> {
    const { authEndpoint } = AuthService
    const response = await window.fetch(`${authEndpoint}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) throw new Error(AuthNotification.LOGIN_ERROR)

    return true
  }

  static async logout(): Promise<boolean> {
    const { authEndpoint } = AuthService
    const response = await window.fetch(`${authEndpoint}/logout`, {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) throw new Error(AuthNotification.LOGOUT_ERROR)

    return true
  }
}
