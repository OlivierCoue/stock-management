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
  StockUpdateInput,
  Fragment_Stock_FieldsFragment,
  Mutation_Stock_UpdateOneMutation,
  Mutation_Stock_UpdateOneMutationVariables,
} from '../../internal'

import { QUERY_Store_findMany, QUERY_Store_findOne, MUTATION_Stock_updateOne } from './requests.graphql'

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

  static async stockUpdateOne(input: StockUpdateInput): Promise<Fragment_Stock_FieldsFragment> {
    const result = await GraphQLClient.mutate<
      Mutation_Stock_UpdateOneMutation,
      Mutation_Stock_UpdateOneMutationVariables
    >({
      mutation: MUTATION_Stock_updateOne,
      variables: { input },
    })

    const {
      // @ts-ignore
      data: { Stock_updateOne: stock },
    } = result

    if (stock === undefined) throw new Error('[Store][stockUpdateOne] failed')

    return stock
  }
}
