import { Module } from '@nestjs/common'
import { ConfigModule as ConfigBaseModule } from '@nestjs/config'
import config from 'config'

@Module({
  imports: [
    ConfigBaseModule.forRoot({
      load: [() => config],
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
