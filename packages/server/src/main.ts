import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { WinstonModule } from 'nest-winston'
import { contentParser } from 'fastify-multer'
import { AppModule } from './app.module'
import {
  AllExceptionsFilter,
  ForbiddenExceptionFilter,
  LoggerConfig,
  TransformInterceptor,
} from '~/common'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: WinstonModule.createLogger(LoggerConfig) },
  )
  await app.register(contentParser)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new ForbiddenExceptionFilter())
  app.useGlobalFilters(new AllExceptionsFilter())
  app.enableCors()

  await app.listen(6660, '0.0.0.0')
  console.warn(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
