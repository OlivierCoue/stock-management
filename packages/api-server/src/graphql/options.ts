import { GqlModuleOptions } from '@nestjs/graphql'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import express from 'express'

import { env } from '../env'
import { UserEntity } from '../entities'

import { graphqlTypeDefs } from './type-definitions'
import { LanguageCode } from './schema'

export interface IGraphQLContext {
  req: express.Request
  res: express.Response
  languageCode: LanguageCode
  user: UserEntity | undefined
}

export const GraphQLOptions: GqlModuleOptions = {
  cors: false,
  // @ts-ignore TODO: why ?
  typeDefs: graphqlTypeDefs,
  installSubscriptionHandlers: true,
  uploads: {
    maxFileSize: 200000000, // 200 MB
  },
  playground: env.isDev && {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
  formatError: (err: GraphQLError): GraphQLFormattedError => {
    console.error(JSON.parse(JSON.stringify(err)))

    return err
  },
  context: ({ req, res }: { req: express.Request; res: express.Response }): IGraphQLContext => {
    const languageCode = (req.session && req.session.languageCode) || LanguageCode.en
    const user = req.user

    return { languageCode, req, res, user }
  },
}
