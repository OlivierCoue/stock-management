import { UserCreateInput, UserFindManyByPermissionInput } from '../../graphql/schema'
import { TQbFindTransformer } from '../../common/types/service-options'
import { UserEntity } from '../../entities'

export interface IUserCreateInput extends UserCreateInput {}

export interface IUserFindManyByPermissionInput extends UserFindManyByPermissionInput {
  qbFindTransformer?: TQbFindTransformer<UserEntity>
}
