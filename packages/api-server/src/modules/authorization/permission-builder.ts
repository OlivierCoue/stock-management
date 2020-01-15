import { RolesBuilder } from 'nest-access-control'

export const permissionsBuilder: RolesBuilder = new RolesBuilder()

export enum AuthorizationResources {
  ROLE = 'ROLE',
  USER = 'USER',
  STORE = 'STORE',
  AISLE = 'AISLE',
  STOCK = 'STOCK',
  PRODUCT = 'PRODUCT',
}
