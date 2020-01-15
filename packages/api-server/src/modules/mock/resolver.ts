import { Mutation, Resolver, ResolverPrefix } from '@nestjs/graphql'
import { forwardRef, Inject } from '@nestjs/common'

import { MockService } from './service'

@Resolver('Mock')
@ResolverPrefix('Mock_')
export class MockResolver {
  constructor(@Inject(forwardRef(() => MockService)) private readonly mockService: MockService) {}

  @Mutation()
  async createMock(): Promise<boolean> {
    await this.mockService.createMock()

    return true
  }

}
