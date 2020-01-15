import { createReducer } from 'redux-starter-kit'

import { INotification } from './types'

import { NotificationActions } from '.'

export type VariantType = 'error' | 'success' | 'warning' | 'info'

const variants: {
  [key: string]: VariantType
} = {
  [NotificationActions.notificationError.type]: 'error',
  [NotificationActions.notificationWarning.type]: 'warning',
  [NotificationActions.notificationInfo.type]: 'info',
  [NotificationActions.notificationSuccess.type]: 'success',
}

export interface INotificationState {
  notifications: INotification[]
}

const INITIAL_STATE: INotificationState = { notifications: [] }

export const notificationReducer = createReducer(INITIAL_STATE, {
  [NotificationActions.notificationError.type]: notificationHandler,
  [NotificationActions.notificationWarning.type]: notificationHandler,
  [NotificationActions.notificationInfo.type]: notificationHandler,
  [NotificationActions.notificationSuccess.type]: notificationHandler,
})

function notificationHandler(
  state: INotificationState,
  action:
    | ReturnType<typeof NotificationActions.notificationError>
    | ReturnType<typeof NotificationActions.notificationWarning>
    | ReturnType<typeof NotificationActions.notificationInfo>
    | ReturnType<typeof NotificationActions.notificationSuccess>
): void {
  const {
    payload: { message },
    type,
  } = action
  const variant = variants[type]

  state.notifications.push({ message, variant })
}
