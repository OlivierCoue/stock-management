import { createAction } from 'redux-starter-kit'

export const authLoginRequest = createAction<{ email: string; password: string }>('auth/LOGIN_REQUEST')
export const authLoginSuccess = createAction<undefined>('auth/LOGIN_SUCCESS')
export const authLoginFailure = createAction<Error>('auth/LOGIN_FAILURE')
export const authLoginCancel = createAction<undefined>('auth/LOGIN_CANCEL')

export const authLogoutRequest = createAction<undefined>('auth/LOGOUT_REQUEST')
export const authLogoutSuccess = createAction<undefined>('auth/LOGOUT_SUCCESS')
export const authLogoutFailure = createAction<Error>('auth/LOGOUT_FAILURE')
export const authLogoutCancel = createAction<undefined>('auth/LOGOUT_CANCEL')
