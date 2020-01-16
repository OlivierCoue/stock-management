export type Maybe<T> = T | undefined;
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
  PendingActivation = 'PENDING_ACTIVATION',
  Enabled = 'ENABLED',
  Disabled = 'DISABLED'
}

export type Aisle = {
   __typename?: 'Aisle',
  uuid: Scalars['String'],
  name: Scalars['String'],
  store?: Maybe<Store>,
  seller?: Maybe<User>,
  stocks?: Maybe<Array<Maybe<Stock>>>,
  createdAt: Scalars['Date'],
  updatedAt: Scalars['Date'],
};

export type AisleCreateInput = {
  name: Scalars['String'],
  storeUuid: Scalars['String'],
  sellerUuid: Scalars['String'],
};

export type AisleDeleteInput = {
  uuid: Scalars['String'],
};

export type AisleFindManyInput = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  order?: Maybe<AisleOrderByInput>,
  where?: Maybe<AisleSearchFieldsInput>,
};

export type AisleFindOneInput = {
  where?: Maybe<AisleSearchFieldsInput>,
};

export type AisleOrderByInput = {
  name?: Maybe<OrderByEnum>,
};

export type AisleSearchFieldsInput = {
  uuid?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type AisleUpdateInput = {
  uuid: Scalars['String'],
  name?: Maybe<Scalars['String']>,
};


/** ISO 639-1 language code */
export enum LanguageCode {
  /** English */
  En = 'en',
  /** French */
  Fr = 'fr'
}

export type Mutation = {
   __typename?: 'Mutation',
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
};


export type MutationProduct_CreateOneArgs = {
  createInput: ProductCreateInput
};


export type MutationProduct_UpdateOneArgs = {
  updateInput: ProductUpdateInput
};


export type MutationProduct_DeleteOneArgs = {
  deleteInput: ProductDeleteInput
};


export type MutationStore_CreateOneArgs = {
  createInput: StoreCreateInput
};


export type MutationStore_UpdateOneArgs = {
  updateInput: StoreUpdateInput
};


export type MutationStore_DeleteOneArgs = {
  deleteInput: StoreDeleteInput
};


export type MutationUser_RegisterArgs = {
  createInput: UserCreateInput
};


export type MutationUser_CreateOneArgs = {
  createInput: UserCreateInput
};


export type MutationUser_CreateManyArgs = {
  createInputs: Array<Maybe<UserCreateInput>>
};


export type MutationUser_UpdateOneArgs = {
  updateInput: UserUpdateInput
};


export type MutationUser_UpdateManyArgs = {
  updateInput: Array<Maybe<UserUpdateInput>>
};


export type MutationUser_DeleteOneArgs = {
  deleteInput: UserDeleteInput
};


export type MutationUser_DeleteManyArgs = {
  deleteInputs: Array<Maybe<UserDeleteInput>>
};


export type MutationUser_ActivateAccountArgs = {
  userActivateAccountInput?: Maybe<UserActivateAccountInput>
};


export type MutationUser_SendPasswordResetTokenArgs = {
  email?: Maybe<Scalars['String']>
};


export type MutationUser_SetPasswordFromPasswordResetTokenArgs = {
  passwordResetInput?: Maybe<UserPasswordResetInput>
};


export type MutationUser_SendVerifyEmailTokenArgs = {
  uuid?: Maybe<Scalars['String']>
};


export type MutationUser_SendActivateAccountTokenArgs = {
  uuid?: Maybe<Scalars['String']>
};


export type MutationUser_VerifyEmailArgs = {
  userVerifyEmailInput?: Maybe<UserVerifyEmailInput>
};


export type MutationRole_CreateOneArgs = {
  createInput: RoleCreateInput
};


export type MutationRole_CreateManyArgs = {
  createInputs: Array<Maybe<RoleCreateInput>>
};


export type MutationRole_UpdateOneArgs = {
  updateInput: RoleUpdateInput
};


export type MutationRole_UpdateManyArgs = {
  updateInputs: Array<Maybe<RoleUpdateInput>>
};


export type MutationRole_DeleteOneArgs = {
  deleteInput: RoleDeleteInput
};


export type MutationRole_DeleteManyArgs = {
  deleteInputs: Array<Maybe<RoleDeleteInput>>
};


export type MutationAisle_CreateOneArgs = {
  createInput: AisleCreateInput
};


export type MutationAisle_UpdateOneArgs = {
  updateInput: AisleUpdateInput
};


export type MutationAisle_DeleteOneArgs = {
  deleteInput: AisleDeleteInput
};


export type MutationStock_CreateOneArgs = {
  createInput: StockCreateInput
};


export type MutationStock_UpdateOneArgs = {
  updateInput: StockUpdateInput
};


export type MutationStock_DeleteOneArgs = {
  deleteInput: StockDeleteInput
};

export enum OrderByEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Permission = {
   __typename?: 'Permission',
  uuid: Scalars['String'],
  name?: Maybe<PermissionNames>,
};

export enum PermissionNames {
  ProductCreateAny = 'PRODUCT_CREATE_ANY',
  ProductReadAny = 'PRODUCT_READ_ANY',
  ProductUpdateAny = 'PRODUCT_UPDATE_ANY',
  ProductDeleteAny = 'PRODUCT_DELETE_ANY',
  ProductCreateOwn = 'PRODUCT_CREATE_OWN',
  ProductReadOwn = 'PRODUCT_READ_OWN',
  ProductUpdateOwn = 'PRODUCT_UPDATE_OWN',
  ProductDeleteOwn = 'PRODUCT_DELETE_OWN',
  StoreCreateAny = 'STORE_CREATE_ANY',
  StoreReadAny = 'STORE_READ_ANY',
  StoreUpdateAny = 'STORE_UPDATE_ANY',
  StoreDeleteAny = 'STORE_DELETE_ANY',
  StoreCreateOwn = 'STORE_CREATE_OWN',
  StoreReadOwn = 'STORE_READ_OWN',
  StoreUpdateOwn = 'STORE_UPDATE_OWN',
  StoreDeleteOwn = 'STORE_DELETE_OWN',
  UserCreateAny = 'USER_CREATE_ANY',
  UserReadAny = 'USER_READ_ANY',
  UserUpdateAny = 'USER_UPDATE_ANY',
  UserDeleteAny = 'USER_DELETE_ANY',
  UserCreateOwn = 'USER_CREATE_OWN',
  UserReadOwn = 'USER_READ_OWN',
  UserUpdateOwn = 'USER_UPDATE_OWN',
  UserDeleteOwn = 'USER_DELETE_OWN',
  Default = 'DEFAULT',
  RoleCreateAny = 'ROLE_CREATE_ANY',
  RoleReadAny = 'ROLE_READ_ANY',
  RoleUpdateAny = 'ROLE_UPDATE_ANY',
  RoleDeleteAny = 'ROLE_DELETE_ANY',
  RoleCreateOwn = 'ROLE_CREATE_OWN',
  RoleReadOwn = 'ROLE_READ_OWN',
  RoleUpdateOwn = 'ROLE_UPDATE_OWN',
  RoleDeleteOwn = 'ROLE_DELETE_OWN',
  AisleCreateAny = 'AISLE_CREATE_ANY',
  AisleReadAny = 'AISLE_READ_ANY',
  AisleUpdateAny = 'AISLE_UPDATE_ANY',
  AisleDeleteAny = 'AISLE_DELETE_ANY',
  AisleCreateOwn = 'AISLE_CREATE_OWN',
  AisleReadOwn = 'AISLE_READ_OWN',
  AisleUpdateOwn = 'AISLE_UPDATE_OWN',
  AisleDeleteOwn = 'AISLE_DELETE_OWN',
  StockCreateAny = 'STOCK_CREATE_ANY',
  StockReadAny = 'STOCK_READ_ANY',
  StockUpdateAny = 'STOCK_UPDATE_ANY',
  StockDeleteAny = 'STOCK_DELETE_ANY',
  StockCreateOwn = 'STOCK_CREATE_OWN',
  StockReadOwn = 'STOCK_READ_OWN',
  StockUpdateOwn = 'STOCK_UPDATE_OWN',
  StockDeleteOwn = 'STOCK_DELETE_OWN'
}

export type Product = {
   __typename?: 'Product',
  uuid: Scalars['String'],
  name: Scalars['String'],
  price: Scalars['Int'],
  usedInStocks?: Maybe<Array<Maybe<Stock>>>,
  createdAt: Scalars['Date'],
  updatedAt: Scalars['Date'],
};

export type ProductCreateInput = {
  name: Scalars['String'],
  price: Scalars['Int'],
};

export type ProductDeleteInput = {
  uuid: Scalars['String'],
};

export type ProductFindManyInput = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  order?: Maybe<ProductOrderByInput>,
  where?: Maybe<ProductSearchFieldsInput>,
};

export type ProductFindOneInput = {
  where?: Maybe<ProductSearchFieldsInput>,
};

export type ProductOrderByInput = {
  name?: Maybe<OrderByEnum>,
};

export type ProductSearchFieldsInput = {
  uuid?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type ProductUpdateInput = {
  uuid: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Int']>,
};

export type Query = {
   __typename?: 'Query',
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
};


export type QueryProduct_FindOneArgs = {
  findOneInput: ProductFindOneInput
};


export type QueryProduct_FindManyArgs = {
  findManyInput: ProductFindManyInput
};


export type QueryStore_FindOneArgs = {
  findOneInput: StoreFindOneInput
};


export type QueryStore_FindManyArgs = {
  findManyInput: StoreFindManyInput
};


export type QueryUser_FindOneArgs = {
  findOneInput: UserFindOneInput
};


export type QueryUser_FindManyArgs = {
  findManyInput: UserFindManyInput
};


export type QueryUser_FindManyByPermissionArgs = {
  input: UserFindManyByPermissionInput
};


export type QueryUser_GetActivationTokenDataArgs = {
  token: Scalars['String']
};


export type QueryUser_GetResetPasswordTokenDataArgs = {
  token: Scalars['String']
};


export type QueryRole_FindOneArgs = {
  findOneInput: RoleFindOneInput
};


export type QueryRole_FindManyArgs = {
  findManyInput: RoleFindManyInput
};


export type QueryAisle_FindOneArgs = {
  findOneInput: AisleFindOneInput
};


export type QueryAisle_FindManyArgs = {
  findManyInput: AisleFindManyInput
};


export type QueryStock_FindOneArgs = {
  findOneInput: StockFindOneInput
};


export type QueryStock_FindManyArgs = {
  findManyInput: StockFindManyInput
};

export type Role = {
   __typename?: 'Role',
  uuid: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  permissionNames?: Maybe<Array<Maybe<PermissionNames>>>,
  usersCount: Scalars['Int'],
};

export type RoleCreateInput = {
  name: Scalars['String'],
  permissions: Array<Maybe<PermissionNames>>,
};

export type RoleDeleteInput = {
  uuid: Scalars['String'],
};

export type RoleFindManyInput = {
  order?: Maybe<RoleOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  where?: Maybe<RoleSearchFieldsInput>,
};

export type RoleFindOneInput = {
  where?: Maybe<RoleSearchFieldsInput>,
};

export type RoleOrderByInput = {
  name?: Maybe<OrderByEnum>,
};

export type RoleSearchFieldsInput = {
  uuid?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type RoleSearchManyInput = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  query?: Maybe<Scalars['String']>,
};

export type RoleUpdateInput = {
  uuid: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  permissions?: Maybe<Array<Maybe<PermissionNames>>>,
};

export type Stock = {
   __typename?: 'Stock',
  uuid: Scalars['String'],
  count: Scalars['Int'],
  aisle?: Maybe<Aisle>,
  product?: Maybe<Product>,
  createdAt: Scalars['Date'],
  updatedAt: Scalars['Date'],
};

export type StockCreateInput = {
  count: Scalars['Int'],
  aisleUuid: Scalars['String'],
  productUuid: Scalars['String'],
};

export type StockDeleteInput = {
  uuid: Scalars['String'],
};

export type StockFindManyInput = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  order?: Maybe<StockOrderByInput>,
  where?: Maybe<StockSearchFieldsInput>,
};

export type StockFindOneInput = {
  where?: Maybe<StockSearchFieldsInput>,
};

export type StockOrderByInput = {
  name?: Maybe<OrderByEnum>,
};

export type StockSearchFieldsInput = {
  uuid?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type StockUpdateInput = {
  uuid: Scalars['String'],
  count?: Maybe<Scalars['Int']>,
};

export type Store = {
   __typename?: 'Store',
  uuid: Scalars['String'],
  name: Scalars['String'],
  aisles?: Maybe<Array<Maybe<Aisle>>>,
  createdAt: Scalars['Date'],
  updatedAt: Scalars['Date'],
};

export type StoreCreateInput = {
  name: Scalars['String'],
};

export type StoreDeleteInput = {
  uuid: Scalars['String'],
};

export type StoreFindManyInput = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  order?: Maybe<StoreOrderByInput>,
  where?: Maybe<StoreSearchFieldsInput>,
};

export type StoreFindOneInput = {
  where?: Maybe<StoreSearchFieldsInput>,
};

export type StoreOrderByInput = {
  name?: Maybe<OrderByEnum>,
};

export type StoreSearchFieldsInput = {
  uuid?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type StoreUpdateInput = {
  uuid: Scalars['String'],
  name?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
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
};

export type UserActivateAccountInput = {
  token: Scalars['String'],
  password: Scalars['String'],
};

export type UserActivationTokenData = {
   __typename?: 'UserActivationTokenData',
  firstName: Scalars['String'],
  email: Scalars['String'],
};

export type UserCreateInput = {
  email: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  roleUuid?: Maybe<Scalars['String']>,
  roleName?: Maybe<Scalars['String']>,
  password: Scalars['String'],
};

export type UserDeleteInput = {
  uuid: Scalars['String'],
};

export type UserFindManyByPermissionInput = {
  permissionName: PermissionNames,
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  order?: Maybe<UserOrderByInput>,
  where?: Maybe<UserSearchFieldsInput>,
};

export type UserFindManyInput = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  order?: Maybe<UserOrderByInput>,
  where?: Maybe<UserSearchFieldsInput>,
};

export type UserFindManyWithFiltersInput = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  dateStart?: Maybe<Scalars['String']>,
  dateEnd?: Maybe<Scalars['String']>,
  rolesUuids?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type UserFindOneInput = {
  where?: Maybe<UserSearchFieldsInput>,
};

export type UserOrderByInput = {
  email?: Maybe<OrderByEnum>,
  firstName?: Maybe<OrderByEnum>,
  lastName?: Maybe<OrderByEnum>,
};

export type UserPasswordResetInput = {
  token: Scalars['String'],
  password: Scalars['String'],
};

export type UserSearchFieldsInput = {
  uuid?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
};

export type UserSearchManyInput = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  query?: Maybe<Scalars['String']>,
};

export type UserUpdateInput = {
  uuid: Scalars['String'],
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  roleUuid?: Maybe<Scalars['String']>,
};

export type UserVerifyEmailInput = {
  token: Scalars['String'],
};
export type Fragment_Store_FieldsFragment = (
  { __typename?: 'Store' }
  & Pick<Store, 'uuid' | 'name'>
);

export type Fragment_Store_AllFieldsFragment = (
  { __typename?: 'Store' }
  & Pick<Store, 'uuid' | 'name'>
  & { aisles: Maybe<Array<Maybe<(
    { __typename?: 'Aisle' }
    & Pick<Aisle, 'uuid' | 'name' | 'createdAt' | 'updatedAt'>
    & { seller: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'firstName' | 'lastName'>
    )>, stocks: Maybe<Array<Maybe<{ __typename?: 'Stock' }
      & Fragment_Stock_FieldsFragment
    >>> }
  )>>> }
);

export type Fragment_Stock_FieldsFragment = (
  { __typename?: 'Stock' }
  & Pick<Stock, 'uuid' | 'count'>
  & { product: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'name' | 'price'>
  )> }
);

export type Query_Store_FindManyQueryVariables = {
  input: StoreFindManyInput
};


export type Query_Store_FindManyQuery = (
  { __typename?: 'Query' }
  & { Store_findMany: Array<Maybe<{ __typename?: 'Store' }
    & Fragment_Store_FieldsFragment
  >> }
);

export type Query_Store_FindOneQueryVariables = {
  input: StoreFindOneInput
};


export type Query_Store_FindOneQuery = (
  { __typename?: 'Query' }
  & { Store_findOne: Maybe<{ __typename?: 'Store' }
    & Fragment_Store_AllFieldsFragment
  > }
);

export type Mutation_Stock_UpdateOneMutationVariables = {
  input: StockUpdateInput
};


export type Mutation_Stock_UpdateOneMutation = (
  { __typename?: 'Mutation' }
  & { Stock_updateOne: { __typename?: 'Stock' }
    & Fragment_Stock_FieldsFragment
   }
);

export type Fragment_User_FieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'uuid' | 'firstName' | 'lastName' | 'email'>
  & { role: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'name'>
  )> }
);

export type Query_User_FindManyQueryVariables = {
  input: UserFindManyInput
};


export type Query_User_FindManyQuery = (
  { __typename?: 'Query' }
  & { User_findMany: Array<Maybe<{ __typename?: 'User' }
    & Fragment_User_FieldsFragment
  >> }
);

export type Query_User_GetCurrentQueryVariables = {};


export type Query_User_GetCurrentQuery = (
  { __typename?: 'Query' }
  & { User_getCurrent: Maybe<{ __typename?: 'User' }
    & Fragment_User_FieldsFragment
  > }
);
