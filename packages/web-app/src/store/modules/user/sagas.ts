import { all, call, cancelled, put, takeLatest } from 'redux-saga/effects'
import { UserService } from '@stock-management/api-client/lib'

import { NotificationActions } from '../notification'

import { UserActions } from '.'

function* reconnect() {
  try {
    const user = yield call(UserService.getCurrent)

    yield put(UserActions.userReconnectSuccess({ user }))
  } catch (err) {
    yield put(UserActions.userReconnectFailure(err))
    yield put(NotificationActions.notificationError(err))
  } finally {
    if (yield cancelled()) yield put(UserActions.userReconnectCancel())
  }
}

export function* UserSagas() {
  yield all([takeLatest(UserActions.userReconnectRequest, reconnect)])
}
