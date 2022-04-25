import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(4000, '0.0.0.0')
  console.warn(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
