import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { SessionEntity } from './entity'
import { CreateSessionDto } from './types'

@Injectable()
export class SessionService {
  constructor(@InjectRepository(SessionEntity) private readonly sessionRepository: Repository<SessionEntity>) {}

  create(session: CreateSessionDto): Promise<SessionEntity> {
    const sessionEntry = new SessionEntity()

    Object.assign(sessionEntry, session)

    return this.sessionRepository.save(sessionEntry)
  }

  findOneBySid(id: string): Promise<SessionEntity | undefined> {
    return this.sessionRepository.findOne(id)
  }

  findAll(): Promise<SessionEntity[]> {
    return this.sessionRepository.find()
  }

  removeAll() {
    return this.sessionRepository.query(`DELETE FROM session`)
  }

  removeBySid(sid: string) {
    return this.sessionRepository.delete(sid)
  }
}
