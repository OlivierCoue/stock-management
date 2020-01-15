import { HttpException, HttpStatus } from '@nestjs/common'

import { errors, findErrorData } from '../../errors'

export class CustomException extends HttpException {
  public errorData: object
  public errorExtensions: object | undefined

  constructor(
    messageName: keyof typeof errors,
    statusName: keyof typeof HttpStatus = 'INTERNAL_SERVER_ERROR',
    extensions?: object
  ) {
    const status = HttpStatus[statusName]
    const { message, ...errorData } = findErrorData(messageName)
    super(message || (messageName as string), status)

    this.errorData = errorData
    this.errorExtensions = extensions
  }
}
