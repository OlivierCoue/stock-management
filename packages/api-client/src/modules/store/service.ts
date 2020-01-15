import {
  Fragment_Store_FieldsFragment,
  Query_Store_FindManyQueryVariables,
  Query_Store_FindManyQuery,
  Query_Store_FindOneQueryVariables,
  Query_Store_FindOneQuery,
  GraphQLClient,
  StoreFindManyInput,
  StoreFindOneInput,
  Fragment_Store_AllFieldsFragment,
} from '../../internal'

import { QUERY_Store_findMany, QUERY_Store_findOne } from './requests.graphql'

export class StoreService {
  static async findMany(input: StoreFindManyInput): Promise<Fragment_Store_FieldsFragment[]> {
    const result = await GraphQLClient.query<Query_Store_FindManyQuery, Query_Store_FindManyQueryVariables>({
      query: QUERY_Store_findMany,
      variables: { input },
    })

    const {
      data: { Store_findMany: stores },
    } = result

    if (stores === undefined) throw new Error('[Store][findMany] failed')

    // @ts-ignore
    return stores
  }

  static async findOne(input: StoreFindOneInput): Promise<Fragment_Store_AllFieldsFragment> {
    const result = await GraphQLClient.query<Query_Store_FindOneQuery, Query_Store_FindOneQueryVariables>({
      query: QUERY_Store_findOne,
      variables: { input },
    })

    const {
      data: { Store_findOne: store },
    } = result

    if (store === undefined) throw new Error('[Store][findOne] failed')

    return store
  }
}
