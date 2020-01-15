import { createAction } from 'redux-starter-kit'

export const notificationError = createAction<{ message: string }>('notification/ERROR')
export const notificationWarning = createAction<{ message: string }>('notification/WARNING')
export const notificationInfo = createAction<{ message: string }>('notification/INFO')
export const notificationSuccess = createAction<{ message: string }>('notification/SUCCESS')
