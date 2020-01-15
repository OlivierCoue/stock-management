import { createMuiTheme, Theme } from '@material-ui/core'

import { ThemeActions } from '.'

// default theme : https://material-ui.com/customization/default-theme/
const INITIAL_STATE: Theme = createMuiTheme({
  overrides: { MuiTypography: { h1: { color: 'black' } } },
  palette: { primary: { main: '#FF0000' } },
  custom: {
    palette: {
      error: '#cc2826',
      info: '#236cfd',
      success: '#3a953e',
      warning: '#fd9400',
    },
  },
})

// export const themeReducer = createReducer(INITIAL_STATE, {
//   [ThemeActions.themeSwitchH1Color.type]: (
//     state: Theme,
//     action: ReturnType<typeof ThemeActions.themeSwitchH1Color>
//   ) => {
//     state.overrides.MuiTypography.h1.color = (state.overrides.MuiTypography.h1.color === 'blue' && 'red') || 'blue'
//   },
// })

// TODO: Using 'createReducer' causes an infinite loop for TS, most likely due to a conflict between the infer from the Theme type and Immer
export function themeReducer(
  state: Theme = INITIAL_STATE,
  action: ReturnType<typeof ThemeActions.themeSwitchH1Color>
): Theme {
  if (action.type === ThemeActions.themeSwitchH1Color.type) {
    // @ts-ignore
    const color = (state.overrides.MuiTypography.h1.color === 'blue' && 'red') || 'blue'
    const newState = { overrides: { MuiTypography: { h1: { color } } } }

    return { ...state, ...newState }
  }

  return state
}
