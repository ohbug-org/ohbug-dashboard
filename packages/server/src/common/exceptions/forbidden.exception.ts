import { HttpException } from '@nestjs/common'
import { status } from '../constants'
import { ErrorShowType } from '~/types'

export class ForbiddenException extends HttpException {
  public readonly code: number

  public readonly showType: ErrorShowType

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
  }
}
