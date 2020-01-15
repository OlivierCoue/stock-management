export type Maybe<T> = T;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: any,
};

export enum AccountStatus {
  PENDING_ACTIVATION = 'PENDING_ACTIVATION',
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED'
}

export interface Aisle {
  uuid: Scalars['String'],
  name: Scalars['String'],
  store?: Maybe<Store>,
  sellers?: Maybe<Array<Maybe<User>>>,
  createdAt: Scalars['Date'],
  updatedAt: Scalars['Date'],
}

export interface AisleCreateInput {
  name: Scalars['String'],
  storeUuid: Scalars['String'],
  sellersUuids: Array<Scalars['String']>,
}

export interface AisleDeleteInput {
  uuid: Scalars['String'],
}

export interface AisleFindManyInput {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  order?: Maybe<AisleOrderByInput>,
  where?: Maybe<AisleSearchFieldsInput>,
}

export interface AisleFindOneInput {
  where?: Maybe<AisleSearchFieldsInput>,
}

export interface AisleOrderByInput {
  name?: Maybe<OrderByEnum>,
}

export interface AisleSearchFieldsInput {
  uuid?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
}

export interface AisleUpdateInput {
  uuid: Scalars['String'],
  name?: Maybe<Scalars['String']>,
}


/** ISO 639-1 language code */
export enum LanguageCode {
  /** English */
  en = 'en',
  /** French */
  fr = 'fr'
}

export interface Mutation {
  Mock_createMock?: Maybe<Scalars['Boolean']>,
  Product_createOne: Product,
  Product_updateOne: Product,
  Product_deleteOne: Scalars['Boolean'],
  Store_createOne: Store,
  Store_updateOne: Store,
  Store_deleteOne: Scalars['Boolean'],
  User_register: User,
  User_createOne: User,
  User_createMany: Array<Maybe<User>>,
  User_updateOne: User,
  User_updateMany: Array<Maybe<User>>,
  User_deleteOne: Scalars['Boolean'],
  User_deleteMany: Array<Maybe<Scalars['Boolean']>>,
  User_activateAccount: Scalars['Boolean'],
  User_sendPasswordResetToken: Scalars['Boolean'],
  User_setPasswordFromPasswordResetToken: Scalars['Boolean'],
  User_sendVerifyEmailToken: Scalars['Boolean'],
  User_sendActivateAccountToken: Scalars['Boolean'],
  User_verifyEmail: Scalars['Boolean'],
  User_parseXml: Scalars['Boolean'],
  Role_createOne: Role,
  Role_createMany: Array<Maybe<Role>>,
  Role_updateOne: Role,
  Role_updateMany: Array<Maybe<Role>>,
  Role_deleteOne: Scalars['Boolean'],
  Role_deleteMany: Array<Maybe<Scalars['Boolean']>>,
  Aisle_createOne: Aisle,
  Aisle_updateOne: Aisle,
  Aisle_deleteOne: Scalars['Boolean'],
  Stock_createOne: Stock,
  Stock_updateOne: Stock,
  Stock_deleteOne: Scalars['Boolean'],
}


export type MutationProduct_createOneArgs = {
  createInput: ProductCreateInput
};


export type MutationProduct_updateOneArgs = {
  updateInput: ProductUpdateInput
};


export type MutationProduct_deleteOneArgs = {
  deleteInput: ProductDeleteInput
};


export type MutationStore_createOneArgs = {
  createInput: StoreCreateInput
};


export type MutationStore_updateOneArgs = {
  updateInput: StoreUpdateInput
};


export type MutationStore_deleteOneArgs = {
  deleteInput: StoreDeleteInput
};


export type MutationUser_registerArgs = {
  createInput: UserCreateInput
};


export type MutationUser_createOneArgs = {
  createInput: UserCreateInput
};


export type MutationUser_createManyArgs = {
  createInputs: Array<Maybe<UserCreateInput>>
};


export type MutationUser_updateOneArgs = {
  updateInput: UserUpdateInput
};


export type MutationUser_updateManyArgs = {
  updateInput: Array<Maybe<UserUpdateInput>>
};


export type MutationUser_deleteOneArgs = {
  deleteInput: UserDeleteInput
};


export type MutationUser_deleteManyArgs = {
  deleteInputs: Array<Maybe<UserDeleteInput>>
};


export type MutationUser_activateAccountArgs = {
  userActivateAccountInput?: Maybe<UserActivateAccountInput>
};


export type MutationUser_sendPasswordResetTokenArgs = {
  email?: Maybe<Scalars['String']>
};


export type MutationUser_setPasswordFromPasswordResetTokenArgs = {
  passwordResetInput?: Maybe<UserPasswordResetInput>
};


export type MutationUser_sendVerifyEmailTokenArgs = {
  uuid?: Maybe<Scalars['String']>
};


export type MutationUser_sendActivateAccountTokenArgs = {
  uuid?: Maybe<Scalars['String']>
};


export type MutationUser_verifyEmailArgs = {
  userVerifyEmailInput?: Maybe<UserVerifyEmailInput>
};


export type MutationRole_createOneArgs = {
  createInput: RoleCreateInput
};


export type MutationRole_createManyArgs = {
  createInputs: Array<Maybe<RoleCreateInput>>
};


export type MutationRole_updateOneArgs = {
  updateInput: RoleUpdateInput
};


export type MutationRole_updateManyArgs = {
  updateInputs: Array<Maybe<RoleUpdateInput>>
};


export type MutationRole_deleteOneArgs = {
  deleteInput: RoleDeleteInput
};


export type MutationRole_deleteManyArgs = {
  deleteInputs: Array<Maybe<RoleDeleteInput>>
};


export type MutationAisle_createOneArgs = {
  createInput: AisleCreateInput
};


export type MutationAisle_updateOneArgs = {
  updateInput: AisleUpdateInput
};


export type MutationAisle_deleteOneArgs = {
  deleteInput: AisleDeleteInput
};


export type MutationStock_createOneArgs = {
  createInput: StockCreateInput
};


export type MutationStock_updateOneArgs = {
  updateInput: StockUpdateInput
};


export type MutationStock_deleteOneArgs = {
  deleteInput: StockDeleteInput
};

export enum OrderByEnum {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface Permission {
  uuid: Scalars['String'],
  name?: Maybe<PermissionNames>,
}

export enum PermissionNames {
  PRODUCT_CREATE_ANY = 'PRODUCT_CREATE_ANY',
  PRODUCT_READ_ANY = 'PRODUCT_READ_ANY',
  PRODUCT_UPDATE_ANY = 'PRODUCT_UPDATE_ANY',
  PRODUCT_DELETE_ANY = 'PRODUCT_DELETE_ANY',
  PRODUCT_CREATE_OWN = 'PRODUCT_CREATE_OWN',
  PRODUCT_READ_OWN = 'PRODUCT_READ_OWN',
  PRODUCT_UPDATE_OWN = 'PRODUCT_UPDATE_OWN',
  PRODUCT_DELETE_OWN = 'PRODUCT_DELETE_OWN',
  STORE_CREATE_ANY = 'STORE_CREATE_ANY',
  STORE_READ_ANY = 'STORE_READ_ANY',
  STORE_UPDATE_ANY = 'STORE_UPDATE_ANY',
  STORE_DELETE_ANY = 'STORE_DELETE_ANY',
  STORE_CREATE_OWN = 'STORE_CREATE_OWN',
  STORE_READ_OWN = 'STORE_READ_OWN',
  STORE_UPDATE_OWN = 'STORE_UPDATE_OWN',
  STORE_DELETE_OWN = 'STORE_DELETE_OWN',
  USER_CREATE_ANY = 'USER_CREATE_ANY',
  USER_READ_ANY = 'USER_READ_ANY',
  USER_UPDATE_ANY = 'USER_UPDATE_ANY',
  USER_DELETE_ANY = 'USER_DELETE_ANY',
  USER_CREATE_OWN = 'USER_CREATE_OWN',
  USER_READ_OWN = 'USER_READ_OWN',
  USER_UPDATE_OWN = 'USER_UPDATE_OWN',
  USER_DELETE_OWN = 'USER_DELETE_OWN',
  DEFAULT = 'DEFAULT',
  ROLE_CREATE_ANY = 'ROLE_CREATE_ANY',
  ROLE_READ_ANY = 'ROLE_READ_ANY',
  ROLE_UPDATE_ANY = 'ROLE_UPDATE_ANY',
  ROLE_DELETE_ANY = 'ROLE_DELETE_ANY',
  ROLE_CREATE_OWN = 'ROLE_CREATE_OWN',
  ROLE_READ_OWN = 'ROLE_READ_OWN',
  ROLE_UPDATE_OWN = 'ROLE_UPDATE_OWN',
  ROLE_DELETE_OWN = 'ROLE_DELETE_OWN',
  AISLE_CREATE_ANY = 'AISLE_CREATE_ANY',
  AISLE_READ_ANY = 'AISLE_READ_ANY',
  AISLE_UPDATE_ANY = 'AISLE_UPDATE_ANY',
  AISLE_DELETE_ANY = 'AISLE_DELETE_ANY',
  AISLE_CREATE_OWN = 'AISLE_CREATE_OWN',
  AISLE_READ_OWN = 'AISLE_READ_OWN',
  AISLE_UPDATE_OWN = 'AISLE_UPDATE_OWN',
  AISLE_DELETE_OWN = 'AISLE_DELETE_OWN',
  STOCK_CREATE_ANY = 'STOCK_CREATE_ANY',
  STOCK_READ_ANY = 'STOCK_READ_ANY',
  STOCK_UPDATE_ANY = 'STOCK_UPDATE_ANY',
  STOCK_DELETE_ANY = 'STOCK_DELETE_ANY',
  STOCK_CREATE_OWN = 'STOCK_CREATE_OWN',
  STOCK_READ_OWN = 'STOCK_READ_OWN',
  STOCK_UPDATE_OWN = 'STOCK_UPDATE_OWN',
  STOCK_DELETE_OWN = 'STOCK_DELETE_OWN'
}

export interface Product {
  uuid: Scalars['String'],
  name: Scalars['String'],
  price: Scalars['Int'],
  usedInStocks?: Maybe<Array<Maybe<Stock>>>,
  createdAt: Scalars['Date'],
  updatedAt: Scalars['Date'],
}

export interface ProductCreateInput {
  name: Scalars['String'],
  price: Scalars['Int'],
}

export interface ProductDeleteInput {
  uuid: Scalars['String'],
}

export interface ProductFindManyInput {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  order?: Maybe<ProductOrderByInput>,
  where?: Maybe<ProductSearchFieldsInput>,
}

export interface ProductFindOneInput {
  where?: Maybe<ProductSearchFieldsInput>,
}

export interface ProductOrderByInput {
  name?: Maybe<OrderByEnum>,
}

export interface ProductSearchFieldsInput {
  uuid?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
}

export interface ProductUpdateInput {
  uuid: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Int']>,
}

export interface Query {
  Product_findOne?: Maybe<Product>,
  Product_findMany: Array<Maybe<Product>>,
  Store_findOne?: Maybe<Store>,
  Store_findMany: Array<Maybe<Store>>,
  User_getCurrent?: Maybe<User>,
  User_findOne?: Maybe<User>,
  User_findMany: Array<Maybe<User>>,
  User_findManyByPermission: Array<Maybe<User>>,
  User_getActivationTokenData?: Maybe<UserActivationTokenData>,
  User_getResetPasswordTokenData?: Maybe<Scalars['String']>,
  Role_findOne?: Maybe<Role>,
  Role_findMany: Array<Maybe<Role>>,
  Aisle_findOne?: Maybe<Aisle>,
  Aisle_findMany: Array<Maybe<Aisle>>,
  Stock_findOne?: Maybe<Stock>,
  Stock_findMany: Array<Maybe<Stock>>,
}


export type QueryProduct_findOneArgs = {
  findOneInput: ProductFindOneInput
};


export type QueryProduct_findManyArgs = {
  findManyInput: ProductFindManyInput
};


export type QueryStore_findOneArgs = {
  findOneInput: StoreFindOneInput
};


export type QueryStore_findManyArgs = {
  findManyInput: StoreFindManyInput
};


export type QueryUser_findOneArgs = {
  findOneInput: UserFindOneInput
};


export type QueryUser_findManyArgs = {
  findManyInput: UserFindManyInput
};


export type QueryUser_findManyByPermissionArgs = {
  input: UserFindManyByPermissionInput
};


export type QueryUser_getActivationTokenDataArgs = {
  token: Scalars['String']
};


export type QueryUser_getResetPasswordTokenDataArgs = {
  token: Scalars['String']
};


export type QueryRole_findOneArgs = {
  findOneInput: RoleFindOneInput
};


export type QueryRole_findManyArgs = {
  findManyInput: RoleFindManyInput
};


export type QueryAisle_findOneArgs = {
  findOneInput: AisleFindOneInput
};


export type QueryAisle_findManyArgs = {
  findManyInput: AisleFindManyInput
};


export type QueryStock_findOneArgs = {
  findOneInput: StockFindOneInput
};


export type QueryStock_findManyArgs = {
  findManyInput: StockFindManyInput
};

export interface Role {
  uuid: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  permissionNames?: Maybe<Array<Maybe<PermissionNames>>>,
  usersCount: Scalars['Int'],
}

export interface RoleCreateInput {
  name: Scalars['String'],
  permissions: Array<Maybe<PermissionNames>>,
}

export interface RoleDeleteInput {
  uuid: Scalars['String'],
}

export interface RoleFindManyInput {
  order?: Maybe<RoleOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  where?: Maybe<RoleSearchFieldsInput>,
}

export interface RoleFindOneInput {
  where?: Maybe<RoleSearchFieldsInput>,
}

export interface RoleOrderByInput {
  name?: Maybe<OrderByEnum>,
}

export interface RoleSearchFieldsInput {
  uuid?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
}

export interface RoleSearchManyInput {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  query?: Maybe<Scalars['String']>,
}

export interface RoleUpdateInput {
  uuid: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  permissions?: Maybe<Array<Maybe<PermissionNames>>>,
}

export interface Stock {
  uuid: Scalars['String'],
  count: Scalars['Int'],
  aisle?: Maybe<Aisle>,
  product?: Maybe<Product>,
  createdAt: Scalars['Date'],
  updatedAt: Scalars['Date'],
}

export interface StockCreateInput {
  count: Scalars['Int'],
  aisleUuid: Scalars['String'],
  productUuid: Scalars['String'],
}

export interface StockDeleteInput {
  uuid: Scalars['String'],
}

export interface StockFindManyInput {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  order?: Maybe<StockOrderByInput>,
  where?: Maybe<StockSearchFieldsInput>,
}

export interface StockFindOneInput {
  where?: Maybe<StockSearchFieldsInput>,
}

export interface StockOrderByInput {
  name?: Maybe<OrderByEnum>,
}

export interface StockSearchFieldsInput {
  uuid?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
}

export interface StockUpdateInput {
  uuid: Scalars['String'],
  count?: Maybe<Scalars['Int']>,
}

export interface Store {
  uuid: Scalars['String'],
  name: Scalars['String'],
  createdAt: Scalars['Date'],
  updatedAt: Scalars['Date'],
}

export interface StoreCreateInput {
  name: Scalars['String'],
}

export interface StoreDeleteInput {
  uuid: Scalars['String'],
}

export interface StoreFindManyInput {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  order?: Maybe<StoreOrderByInput>,
  where?: Maybe<StoreSearchFieldsInput>,
}

export interface StoreFindOneInput {
  where?: Maybe<StoreSearchFieldsInput>,
}

export interface StoreOrderByInput {
  name?: Maybe<OrderByEnum>,
}

export interface StoreSearchFieldsInput {
  uuid?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
}

export interface StoreUpdateInput {
  uuid: Scalars['String'],
  name?: Maybe<Scalars['String']>,
}

export interface User {
  uuid: Scalars['String'],
  email: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  jobTitle?: Maybe<Scalars['String']>,
  sellerInAisle?: Maybe<Aisle>,
  role?: Maybe<Role>,
  status?: Maybe<AccountStatus>,
  createdAt: Scalars['Date'],
  updatedAt: Scalars['Date'],
}

export interface UserActivateAccountInput {
  token: Scalars['String'],
  password: Scalars['String'],
}

export interface UserActivationTokenData {
  firstName: Scalars['String'],
  email: Scalars['String'],
}

export interface UserCreateInput {
  email: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  roleUuid?: Maybe<Scalars['String']>,
  roleName?: Maybe<Scalars['String']>,
  password: Scalars['String'],
}

export interface UserDeleteInput {
  uuid: Scalars['String'],
}

export interface UserFindManyByPermissionInput {
  permissionName: PermissionNames,
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  order?: Maybe<UserOrderByInput>,
  where?: Maybe<UserSearchFieldsInput>,
}

export interface UserFindManyInput {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  order?: Maybe<UserOrderByInput>,
  where?: Maybe<UserSearchFieldsInput>,
}

export interface UserFindManyWithFiltersInput {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  dateStart?: Maybe<Scalars['String']>,
  dateEnd?: Maybe<Scalars['String']>,
  rolesUuids?: Maybe<Array<Maybe<Scalars['String']>>>,
}

export interface UserFindOneInput {
  where?: Maybe<UserSearchFieldsInput>,
}

export interface UserOrderByInput {
  email?: Maybe<OrderByEnum>,
  firstName?: Maybe<OrderByEnum>,
  lastName?: Maybe<OrderByEnum>,
}

export interface UserPasswordResetInput {
  token: Scalars['String'],
  password: Scalars['String'],
}

export interface UserSearchFieldsInput {
  uuid?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
}

export interface UserSearchManyInput {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  query?: Maybe<Scalars['String']>,
}

export interface UserUpdateInput {
  uuid: Scalars['String'],
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  roleUuid?: Maybe<Scalars['String']>,
}

export interface UserVerifyEmailInput {
  token: Scalars['String'],
}
