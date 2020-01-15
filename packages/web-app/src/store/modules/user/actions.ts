import { User } from '@stock-management/api-client/lib'
import { createAction } from 'redux-starter-kit'

export const userReconnectRequest = createAction<undefined>('user/RECONNECT_REQUEST')
export const userReconnectSuccess = createAction<{ user: User }>('user/RECONNECT_SUCCESS')
export const userReconnectFailure = createAction<Error>('user/RECONNECT_FAILURE')
export const userReconnectCancel = createAction<undefined>('user/RECONNECT_CANCEL')

export const userDisconnect = createAction<undefined>('user/DISCONNECT')
