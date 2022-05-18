import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common'
import type { ArgumentsHost } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'

import type { ResponseStructure } from '~/types'

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status
      = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const errorMessage
      = exception.response?.message
      || exception.message.message
      || exception.message
    const errorCode = exception.code || 50000

    const error: ResponseStructure = {
      errorMessage,
      errorCode,
      success: false,
      showType: exception.showType || 2,
    }

    Logger.warn('Error', error.errorMessage)

    response.status(status).json(error)
  }
}
