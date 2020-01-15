import { authError } from './modules/auth/error'
import { permissionError } from './modules/authorization/permission/error'
import { userError } from './modules/user/error'
import { storeError } from './modules/store/error'

export interface IErrorData {
  message?: string
}

const appError = {
  ENTITY_NOT_FOUND: {},
}

export const errors = Object.assign(
  {},
  appError,
  authError,
  userError,
  permissionError,
  storeError,
)

export function findErrorData(name: keyof typeof errors): IErrorData {
  return errors[name] || {}
}
