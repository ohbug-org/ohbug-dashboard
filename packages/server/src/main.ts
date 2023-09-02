import { join } from 'node:path'
import { cwd } from 'node:process'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { contentParser } from 'fastify-multer'
import dotenv from 'dotenv'
import { type NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import {
  AllExceptionsFilter,
  ForbiddenExceptionFilter,
  TransformInterceptor,
} from '~/common'

dotenv.config({ path: join(cwd(), '../../', '.env') })

const port = 6660

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      // 50mb
      bodyLimit: 624288000,
    }),
    { bufferLogs: true },
  )
  app.useLogger(app.get(Logger))
  app.useGlobalInterceptors(new LoggerErrorInterceptor())
  await app.register(contentParser)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new ForbiddenExceptionFilter())
  app.useGlobalFilters(new AllExceptionsFilter())
  app.enableCors()

  await app.listen(port, '0.0.0.0')
  console.warn(`Listening on port ${port}`)
}

bootstrap()
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
