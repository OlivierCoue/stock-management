import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PermissionEntity, RoleEntity } from '../../entities'
import { PermissionService, RoleService } from '../../services'
import { UserModule } from '../../modules'

import { RoleResolver } from './role/resolver'

@Module({
  imports: [forwardRef(() => TypeOrmModule.forFeature([RoleEntity, PermissionEntity])), forwardRef(() => UserModule)],
  providers: [PermissionService, RoleResolver, RoleService],
  exports: [PermissionService, RoleService],
})
export class AuthorizationModule {}
