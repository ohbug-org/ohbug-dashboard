import { HttpService } from '@nestjs/axios'
import { Action } from 'common'
import { lastValueFrom } from 'rxjs'

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
    case 'dingtalk':
      return {
        msgtype: 'markdown',
        markdown: {
          title,
          text: markdown + atText(false),
        },
        at: {
          atMobiles: at,
          isAtAll: false,
        },
      }
    case 'wechatWork':
      return {
        msgtype: 'text',
        text: {
          content: text,
          mentioned_mobile_list: at,
        },
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
