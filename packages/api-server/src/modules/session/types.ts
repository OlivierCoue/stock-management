import { UserEntity } from '../user/entity'

export class CreateSessionDto {
  sid: string
  expires: Date
  lastActivityAt: Date
  data: string
  user: UserEntity | undefined
}
