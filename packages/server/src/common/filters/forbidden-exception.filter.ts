import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common'
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import type { ResponseStructure } from 'common'
import { ForbiddenException } from '../exceptions'

@Catch(HttpException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status
      = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const errorMessage = exception.message
    const errorCode = exception.code || 40000

    const error: ResponseStructure = {
      errorMessage,
      errorCode,
      success: false,
      showType: exception.showType,
    }

    Logger.log('Error', error.errorMessage)

    response.status(status).json(error)
  }
}
