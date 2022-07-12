import nodemailer from 'nodemailer'

interface SendMail {
  config: any
  to: string
  title: string
  text: string
  html: string
}
async function main({ config, to, title, text, html }: SendMail) {
  const transporter = nodemailer.createTransport(config)

  const info = {
    from: `Ohbug <${config?.auth?.user}>`,
    to,
    subject: title,
    text,
    html,
  }

  const verify = await transporter.verify()
  if (verify) {
    return transporter.sendMail(info)
  }
  return null
}

export default main
