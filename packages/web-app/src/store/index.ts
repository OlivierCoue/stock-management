import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

import * as Modules from './modules'

/**
 * Root extractions
 */
const rootReducer = combineReducers({
  i18n: Modules.I18nModule.i18nReducer,
  notification: Modules.NotificationModule.notificationReducer,
  theme: Modules.ThemeModule.themeReducer,
  user: Modules.UserModule.userReducer,
})

function* rootSaga() {
  yield all([fork(Modules.AuthModule.AuthSagas), fork(Modules.UserModule.UserSagas)])
}

export const rootAction = {
  ...Modules.AuthModule.AuthActions,
  ...Modules.I18nModule.I18nActions,
  ...Modules.NotificationModule.NotificationActions,
  ...Modules.ThemeModule.ThemeActions,
  ...Modules.UserModule.UserActions,
}

/**
 * Middleware
 */
const sagaMiddleware = createSagaMiddleware()

/**
 * Enhancer
 */
const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware))

/**
 * Store
 */
export const store = createStore(rootReducer, enhancer)

/**
 * Init
 */
sagaMiddleware.run(rootSaga)

/**
 * Types
 */
export type TStore = typeof store
export type TRootReducer = typeof rootReducer
export type TRootState = ReturnType<typeof rootReducer>
export type TRootAction = typeof rootAction
