import { sign, verify } from 'jsonwebtoken'

import { env } from '../../env'

export const generateJWT = (payload: string | Buffer | object) => sign(payload, env.auth.jwtSecretKey)

export const decodeJWT: any = (token: string) => verify(token, env.auth.jwtSecretKey)
