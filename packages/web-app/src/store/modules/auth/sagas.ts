import { all, call, cancelled, put, takeLatest } from 'redux-saga/effects'
import { AuthService } from '@stock-management/api-client/lib'

import { UserActions } from '../user'
import { NotificationActions } from '../notification'

import { AuthActions } from '.'

function* login(action: ReturnType<typeof AuthActions.authLoginRequest>) {
  try {
    const {
      payload: { password, email },
    } = action

    yield call(AuthService.login, email, password)

    yield put(AuthActions.authLoginSuccess())
    yield put(UserActions.userReconnectRequest())
  } catch (err) {
    yield put(AuthActions.authLoginFailure(err))
    yield put(NotificationActions.notificationError(err))
  } finally {
    if (yield cancelled()) yield put(AuthActions.authLoginCancel())
  }
}

function* logout() {
  try {
    yield call(AuthService.logout)

    yield put(AuthActions.authLogoutSuccess())
    yield put(UserActions.userDisconnect())
  } catch (err) {
    yield put(AuthActions.authLogoutFailure(err))
    yield put(NotificationActions.notificationError(err))
  } finally {
    if (yield cancelled()) yield put(AuthActions.authLogoutCancel())
  }
}

export function* AuthSagas() {
  yield all([takeLatest(AuthActions.authLoginRequest, login), takeLatest(AuthActions.authLogoutRequest, logout)])
}
