import * as util from 'util'

import { forwardRef, Inject, Injectable } from '@nestjs/common'

import { UserService } from '../user/service'

import { SessionService } from './service'
import { CreateSessionDto } from './types'

@Injectable()
export class SessionStore {
  constructor(
    @Inject(forwardRef(() => SessionService)) private readonly sessionService: SessionService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService
  ) {}

  async destroy(sid: string) {
    await this.sessionService.removeBySid(sid)
  }

  async get(sid: string, callback?: ((err: any, session: any) => void) | undefined) {
    const session = await this.sessionService.findOneBySid(sid)
    const sessionData = JSON.parse(session ? session.data : 'null')

    if (callback) {
      callback(null, sessionData)
    }
  }

  async set(sid: string, session: any, callback: ((err?: any) => void) | undefined) {
    const sessionDto = new CreateSessionDto()

    sessionDto.sid = sid
    sessionDto.expires = session.cookie._expires
    sessionDto.lastActivityAt = new Date()
    sessionDto.data = JSON.stringify(session)
    if (session.passport && session.passport.user) {
      sessionDto.user = await this.userService.findOne({ where: { id: session.passport.user } })
    }
    await this.sessionService.create(sessionDto)

    if (callback) {
      callback(null)
    }
  }

  touch(sid: string, session: any, callback: ((err?: any) => void) | undefined) {
    console.log(session)

    if (callback) {
      callback(null)
    }
  }

  async all(callback: ((err: any, sessions: any) => void) | undefined) {
    const sessions = await this.sessionService.findAll()
    const sessionsData: any[] = []

    sessions.forEach((session) => {
      sessionsData.push(JSON.parse(session.data))
    })

    if (callback) {
      callback(null, sessionsData)
    }
  }

  async length(callback: ((err: any, length: any) => void) | undefined) {
    const sessions = await this.sessionService.findAll()

    if (callback) {
      callback(null, sessions.length)
    }
  }

  async clear(callback: ((err: any) => void) | undefined) {
    await this.sessionService.removeAll()
    if (callback) {
      callback(null)
    }
  }

  setStore(session: any) {
    const Store = session.Store

    Store.call(this)
    util.inherits(SessionStore, Store)
  }
}
