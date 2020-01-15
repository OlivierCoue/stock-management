import { User } from '@stock-management/api-client/lib'
import { createReducer } from 'redux-starter-kit'

import { UserActions } from '.'

export interface IUserState {
  current?: User | null
  serverAvailable: boolean
}

const INITIAL_STATE: IUserState = { current: undefined, serverAvailable: false }

export const userReducer = createReducer(INITIAL_STATE, {
  [UserActions.userReconnectSuccess.type]: (
    state: IUserState,
    action: ReturnType<typeof UserActions.userReconnectSuccess>
  ) => {
    const { user } = action.payload
    state.current = user
    state.serverAvailable = true
  },
  [UserActions.userDisconnect.type]: (state: IUserState) => {
    state.current = null
  },
})
