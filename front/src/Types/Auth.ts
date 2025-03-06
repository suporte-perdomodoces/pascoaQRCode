

export type LoginData = {
  email: string,
  password: string,
}

export type LoginRes = {
  user: User
  token: string
}

export type User = {
  id: string,
  name: string,
  email: string,
  password?: string,
}