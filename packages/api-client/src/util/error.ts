import { GraphQLError } from 'graphql'

export class CustomClientError {
  constructor(public readonly graphqlErrors: readonly GraphQLError[]) {}

  get message() {
    return this.toString()
  }

  toString() {
    return this.graphqlErrors.map((error) => error.message).join(' - ')
  }
}
