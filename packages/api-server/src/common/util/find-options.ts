import { FindConditions, FindManyOptions, FindOneOptions } from 'typeorm'

type TFindOptions<T> = FindOneOptions<T> | FindManyOptions<T>

type TFindOptionsRelations = string[]

export class FindOptionsUtils {
  static addWhereCondition<T>(
    options: TFindOptions<T>,
    key: keyof T,
    condition: any,
    newRelations?: string[]
  ): TFindOptions<T> {
    if (typeof options.where === 'undefined') options.where = {} as FindConditions<T>
    const { where } = options
    switch (typeof where) {
      case 'object': {
        if (Array.isArray(where)) {
          for (const singleWhere of where) {
            FindOptionsUtils.patchWhere(singleWhere, key, condition)
          }
        } else {
          FindOptionsUtils.patchWhere(where as FindConditions<T>, key, condition)
        }

        break
      }
      case 'string': {
        throw new Error('String where type is not supported by addWhereCondition')
      }
      default: {
        throw new Error('Unsupported where type')
      }
    }

    if (newRelations) {
      if (typeof options.relations === 'undefined') options.relations = []
      const { relations } = options
      FindOptionsUtils.patchRelations(relations, newRelations)
    }

    return options
  }

  private static patchWhere<T>(where: FindConditions<T>, key: keyof T, condition: any): FindConditions<T> {
    where[key] = condition

    return where
  }

  private static patchRelations(relations: TFindOptionsRelations, newRelations: string[]): TFindOptionsRelations {
    for (const newRelation of newRelations) {
      if (!relations.includes(newRelation)) relations.push(newRelation)
    }

    return relations
  }
}
