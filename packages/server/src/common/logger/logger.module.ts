import { Module } from '@nestjs/common'
import { LoggerModule as LoggerModuleBase } from 'nestjs-pino'
import pino from 'pino'

@Module({
  imports: [
    LoggerModuleBase.forRoot({
      pinoHttp: {
        name: 'log',
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        transport: process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { singleLine: true } }
          : undefined,
        stream: pino.destination({
          dest: './logs.log',
          minLength: 4096,
          sync: false,
        }),
      },
      useExisting: true,
    }),
  ],
})
export class LoggerModule {}
