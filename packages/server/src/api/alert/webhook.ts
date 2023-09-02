import { lastValueFrom } from 'rxjs'
import { type HttpService } from '@nestjs/axios'
import { type Action } from 'common'

interface Content {
  title: string
  text: string
  markdown: string
}
function switchWebhookTypeAndGetFormatResult(
  { title, text, markdown }: Content,
  action: Action,
) {
  const at = action?.at
  const atText = (hasExtra: boolean) =>
    at?.split(',').reduce(
      (pre, cur) =>
        `${pre}\n${hasExtra ? '<' : ''}@${cur}${hasExtra ? '>' : ''} `,
      '',
    )
  switch (action?.webhookType) {
    case 'dingtalk': {
      const result: Record<string, any> = {
        msgtype: 'markdown',
        markdown: {
          title,
          text: markdown + atText(false),
        },
      }
      if (at) {
        result.at = {
          atMobiles: [at],
          isAtAll: false,
        }
      }
      return result
    }
    case 'wechatWork': {
      const result: Record<string, any> = {
        msgtype: 'text',
        text: { content: text },
      }
      if (at) {
        result.text.mentioned_mobile_list = [at]
      }
      return result
    }
    case 'others':
      return text
    default:
      return text
  }
}

async function main(
  { title, text, markdown }: Content,
  action: Action,
  httpService: HttpService,
) {
  const result = switchWebhookTypeAndGetFormatResult(
    { title, text, markdown },
    action,
  )
  const source$ = httpService.post(action.uri, result)
  lastValueFrom(source$)
}

export default main
