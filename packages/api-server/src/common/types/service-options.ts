import { FindOneOptions, SelectQueryBuilder, QueryRunner } from 'typeorm'

export type TQbFindTransformer<T> = (qb: SelectQueryBuilder<T>) => SelectQueryBuilder<T>
export type TRepoFindTransformer<T> = (findOptions: FindOneOptions<T>) => FindOneOptions<T>

export interface IServiceBaseOptions {
  customQueryRunner?: QueryRunner
  relations: string[]
}

export interface IServiceUpdateOptionsQb<T> extends IServiceBaseOptions {
  qbFindTransformer?: TQbFindTransformer<T>
}

export interface IServiceUpdateOptionsRepo<T> extends IServiceBaseOptions {
  repoFindTransformer?: TRepoFindTransformer<T>
}

export interface IServiceDeleteOptionsQb<T> {
  qbFindTransformer?: TQbFindTransformer<T>
}

export interface IServiceDeleteOptionsRepo<T> {
  repoFindTransformer?: TRepoFindTransformer<T>
}

export function getDefaultServiceOptions(): IServiceBaseOptions {
  return { relations: [], customQueryRunner: undefined }
}
