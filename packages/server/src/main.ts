import { join } from 'node:path'
import { cwd } from 'node:process'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { WinstonModule } from 'nest-winston'
import { contentParser } from 'fastify-multer'
import dotenv from 'dotenv'
import { AppModule } from './app.module'
import { Cluster } from './cluster'
import {
  AllExceptionsFilter,
  ForbiddenExceptionFilter,
  LoggerConfig,
  TransformInterceptor,
} from '~/common'

dotenv.config({ path: join(cwd(), '../../', '.env') })

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      // 50mb
      bodyLimit: 624288000,
    }),
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

Cluster.register(4, bootstrap)
