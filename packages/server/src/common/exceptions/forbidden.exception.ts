import { HttpException, Logger } from '@nestjs/common'
import { type ErrorShowType } from 'common'
import { status } from '../constants'

export class ForbiddenException extends HttpException {
  public readonly code: number

  public readonly showType: ErrorShowType

  private readonly logger = new Logger()

  /**
   *
   * @param code code for errorType
   * @param extraMessage error message
   * @param showType error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
   */
  constructor(
    code: number,
    extraMessage?: string | unknown,
    showType?: ErrorShowType,
  ) {
    const message = (status as Record<number, string>)[code]
    const response = extraMessage ? `[${message}] ${extraMessage}` : message
    super(response, 400)
    this.code = code
    this.showType = showType || 2
    this.logger.error(response)
  }
}
