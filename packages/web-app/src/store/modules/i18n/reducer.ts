import { createReducer } from 'redux-starter-kit'

import { I18nActions } from '.'

export interface II18nState {
  language: string
}

const INITIAL_STATE: II18nState = {
  language: 'fr',
}

export const i18nReducer = createReducer(INITIAL_STATE, {
  [I18nActions.i18nChangeLanguage.type]: (
    state: II18nState,
    action: ReturnType<typeof I18nActions.i18nChangeLanguage>
  ) => {
    const { language } = action.payload
    state.language = language
  },
})
