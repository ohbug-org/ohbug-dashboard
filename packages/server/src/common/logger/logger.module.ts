import { Module } from '@nestjs/common'
import { LoggerModule as LoggerModuleBase } from 'nestjs-pino'
import pino from 'pino'

@Module({
  imports: [
    LoggerModuleBase.forRoot({
      pinoHttp: { stream: pino.destination('./logs/logs.log') },
      useExisting: true,
    }),
  ],
})
export class LoggerModule {}
