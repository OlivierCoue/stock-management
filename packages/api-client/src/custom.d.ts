// TODO: export this declaration ???
// Note: As of 09/01/2019, the "^1.1.1" version has no types available
declare module 'react-apollo-network-status' {
  import { ApolloLink } from 'apollo-link'
  import { Component } from 'react'

  const createNetworkStatusNotifier: () => {
    link: ApolloLink
    NetworkStatusNotifier: Component
  }
  export { createNetworkStatusNotifier }
}
