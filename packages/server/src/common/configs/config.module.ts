import { Module } from '@nestjs/common'
import { ConfigModule as ConfigBaseModule } from '@nestjs/config'
import { getConfig } from 'config'

@Module({
  imports: [
    ConfigBaseModule.forRoot({
      load: [getConfig],
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
