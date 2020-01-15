import {
  Fragment_User_FieldsFragment,
  GraphQLClient,
  Query_User_GetCurrentQuery,
  Query_User_GetCurrentQueryVariables,
} from '../../internal'

import { QUERY_User_getCurrent } from './requests.graphql'

export class UserService {
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
