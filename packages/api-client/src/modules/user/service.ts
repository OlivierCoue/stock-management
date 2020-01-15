import {
  Fragment_User_FieldsFragment,
  GraphQLClient,
  Query_User_GetCurrentQuery,
  Query_User_GetCurrentQueryVariables,
  UserFindManyInput,
  Query_User_FindManyQuery,
  Query_User_FindManyQueryVariables,
} from '../../internal'

import { QUERY_User_getCurrent, QUERY_User_findMany } from './requests.graphql'

export class UserService {
  static async findMany(input: UserFindManyInput): Promise<Fragment_User_FieldsFragment[]> {
    const result = await GraphQLClient.query<Query_User_FindManyQuery, Query_User_FindManyQueryVariables>({
      query: QUERY_User_findMany,
      variables: { input },
    })

    const {
      data: { User_findMany: users },
    } = result

    if (users === undefined) throw new Error('[User][findMany] failed')

    // @ts-ignore
    return users
  }

  static async getCurrent(): Promise<Fragment_User_FieldsFragment> {
    const result = await GraphQLClient.query<Query_User_GetCurrentQuery, Query_User_GetCurrentQueryVariables>({
      query: QUERY_User_getCurrent,
    })

    const {
      data: { User_getCurrent: user },
    } = result

    if (user === undefined) throw new Error('[User][getCurrent] failed')

    return user
  }
}
