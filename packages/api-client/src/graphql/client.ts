import { ApolloClient, ApolloQueryResult, OperationVariables } from 'apollo-client'
import { MutationOptions, QueryOptions, SubscriptionOptions } from 'apollo-client/core/watchQueryOptions'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloLink, FetchResult } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'
// @ts-ignore
import { createNetworkStatusNotifier } from 'react-apollo-network-status'
import { Observable } from 'apollo-client/util/Observable'

// eslint-disable-next-line @typescript-eslint/class-name-casing
class _GraphQLClient {
  public readonly ApolloClient: ApolloClient<NormalizedCacheObject>
  public readonly graphqlEndpoint: string
  public readonly NetworkStatusNotifier: ReturnType<typeof createNetworkStatusNotifier>['NetworkStatusNotifier']

  constructor(graphqlEndpoint: string) {
    // graphqlEndpoint
    this.graphqlEndpoint = graphqlEndpoint

    // NetworkStatusNotifier
    const { NetworkStatusNotifier, link: networkStatusNotifierLink } = createNetworkStatusNotifier()
    this.NetworkStatusNotifier = NetworkStatusNotifier

    // cache
    const cache = new InMemoryCache()

    // links
    const links = [
      this._getConsoleLink(),
      this._getErrorLink(),
      networkStatusNotifierLink,
      this._getUploadLink(),
    ].filter(Boolean) as ApolloLink[]

    this.ApolloClient = new ApolloClient({
      cache,
      link: ApolloLink.from(links),
      defaultOptions: {
        query: {
          errorPolicy: 'all',
          fetchPolicy: 'no-cache',
        },
        mutate: {
          errorPolicy: 'all',
          fetchPolicy: 'no-cache',
        },
      },
    })
  }

  query<T = any, TVariables = OperationVariables>(options: QueryOptions<TVariables>): Promise<ApolloQueryResult<T>> {
    return this.ApolloClient.query(options)
  }

  mutate<T = any, TVariables = OperationVariables>(options: MutationOptions<T, TVariables>): Promise<FetchResult<T>> {
    return this.ApolloClient.mutate(options)
  }

  subscribe<T = any, TVariables = OperationVariables>(
    options: SubscriptionOptions<TVariables>
  ): Observable<FetchResult<T>> {
    return this.ApolloClient.subscribe(options)
  }

  private _getConsoleLink() {
    if (process.env.NODE_ENV !== 'production') {
      return new ApolloLink((operation, forward) => {
        if (forward) {
          return forward(operation).map((result) => {
            console.log(`[GraphQL] @result "${operation.operationName}" =>`, result)

            return result
          })
        }

        return null
      })
    }

    return false
  }

  private _getErrorLink() {
    return onError(({ graphQLErrors, networkError, response, operation }) => {
      // graphlQLError(s) handler
      if (graphQLErrors) {
        if (process.env.NODE_ENV !== 'production') console.error('[GraphQL] @graphQLError =>', graphQLErrors)
      }
      // networkError handler
      if (networkError) {
        if (process.env.NODE_ENV !== 'production') console.error('[GraphQL] @networkError =>', networkError)
      }
    })
  }

  private _getUploadLink() {
    return createUploadLink({ uri: this.graphqlEndpoint, credentials: 'include' })
  }
}

export const GraphQLClient = new _GraphQLClient(`${process.env.SERVER_URL}/graphql`)
