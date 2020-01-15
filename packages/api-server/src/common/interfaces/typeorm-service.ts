import { FindManyOptions, FindOneOptions } from 'typeorm'

import { IServiceDeleteOptionsRepo, IServiceBaseOptions, IServiceUpdateOptionsQb } from '../types/service-options'

export interface IOldTypeOrmService<Entity> {
  create(createInput: object, relations: string[]): Promise<Entity>
  update(updateInput: object, relations: string[]): Promise<Entity>
  findOne(options: FindOneOptions<Entity>): Promise<Entity | undefined>
  findOneOrFail(options: FindOneOptions<Entity>): Promise<Entity>
  findMany(options: FindManyOptions<Entity>): Promise<Entity[]>
  delete(deleteInput: object): Promise<boolean>
}

export interface ITypeOrmService<Entity> {
  create(createInput: object, options: IServiceBaseOptions): Promise<Entity>
  update(updateInput: object, options: IServiceUpdateOptionsQb<Entity>): Promise<Entity>
  findOne(options: FindOneOptions<Entity>): Promise<Entity | undefined>
  findOneOrFail(options: FindOneOptions<Entity>): Promise<Entity>
  findMany(options: FindManyOptions<Entity>): Promise<Entity[]>
  delete(deleteInput: object, options: IServiceDeleteOptionsRepo<Entity>): Promise<boolean>
}
