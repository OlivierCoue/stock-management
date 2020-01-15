import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'

import { CustomException } from './exception'
import { customExceptionHandler } from './handler'

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const error = customExceptionHandler(exception)

    // TODO: find better way to determine REST vs GraphQL
    switch (host.getArgs().length) {
      case 1:
      case 2: {
        // 1: RPC | 2: HTTP or WS
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        // const request = ctx.getRequest<Request>()
        const status = exception.getStatus()

        response.status(status).json(error)
        break
      }
      case 4: {
        // GraphQL
        // const gqlHost = GqlArgumentsHost.create(host)
        break
      }
      // no default
    }

    return customExceptionHandler(exception)
  }
}
