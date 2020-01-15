/* eslint-disable @typescript-eslint/interface-name-prefix,import/no-duplicates,import/order */
import '@mysg/typescript-config/lib/custom'

declare module '@material-ui/core/styles/createMuiTheme' {
  import { Theme } from '@material-ui/core/styles/createMuiTheme'

  interface Theme {
    custom: {
      palette: {
        error: string
        info: string
        success: string
        warning: string
      }
    }
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom: {
      palette: {
        error: string
        info: string
        success: string
        warning: string
      }
    }
  }
}

declare module 'styled-components' {
  import { Theme } from '@material-ui/core/styles/createMuiTheme'

  interface DefaultTheme extends Theme {}
}

// Note: As of 09/01/2019, the "^1.1.1" version has no types available
declare module 'react-apollo-network-status' {
  import { ApolloLink } from 'apollo-link'

  const createNetworkStatusNotifier: () => {
    link: ApolloLink
    NetworkStatusNotifier: React.Component
  }
  export { createNetworkStatusNotifier }
}
