import nodemailer from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

interface SendMail {
  server: SMTPTransport.Options | string
  from: string
  to: string
  title: string
  text: string
  html: string
}
async function main({ server, from, to, title, text, html }: SendMail) {
  const transporter = nodemailer.createTransport(server)

  const info = {
    from: `Ohbug <${from}>`,
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
