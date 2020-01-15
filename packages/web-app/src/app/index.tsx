import React from 'react'
import { connect } from 'react-redux'
import { I18nProvider } from '@lingui/react'
import { StylesProvider as MuiStylesProvider } from '@material-ui/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'
import { SnackbarProvider } from 'notistack'

import { catalogs } from '../locales/catalogs'
import { TRootState } from '../store'

import ErrorBoundary from './error-boundary'
import GlobalStyle from './global-style'
import Notification from './notification'
import NetworkStatusNotifier from './network-status-notifier'
import Router from './router'

interface IProps {}

type TProps = ReturnType<typeof mapStateToProps> & IProps

function App({ language, theme }: TProps) {
  return (
    <I18nProvider catalogs={catalogs} language={language}>
      <MuiStylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={5}>
              <ErrorBoundary>
                <GlobalStyle />
                <NetworkStatusNotifier />
                <Notification />
                <Router />
              </ErrorBoundary>
            </SnackbarProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </MuiStylesProvider>
    </I18nProvider>
  )
}

function mapStateToProps({ i18n, theme }: TRootState) {
  return { language: i18n.language, theme }
}

export default connect(mapStateToProps)(App)
