import { createAction } from 'redux-starter-kit'

export const i18nChangeLanguage = createAction<{ language: string }>('i18n/CHANGE_LANGUAGE')
