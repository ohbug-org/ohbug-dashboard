import { ConfigModule, ConfigService } from '@nestjs/config'
import { BullModule } from '@nestjs/bull'
import { DynamicModule, Module } from '@nestjs/common'
import {
  ClickHouseClient,
  ClickHouseClientOptions,
} from '@depyronick/clickhouse-client'

export const RedisModule = BullModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({ redis: configService.get('redis') }),
})

export class ClickHouseModuleOptions extends ClickHouseClientOptions {}
@Module({})
export class ClickHouseModule {
  static forRoot(option: ClickHouseModuleOptions): DynamicModule {
    if (!option)
      option = new ClickHouseModuleOptions()
    else
      option = Object.assign(new ClickHouseModuleOptions(), option)
    const client = {
      provide: option.name!,
      useValue: new ClickHouseClient(option),
    }

    return {
      module: ClickHouseModule,
      providers: [client],
      exports: [client],
    }
  }
}
export * from '@depyronick/clickhouse-client'
export * from '@depyronick/clickhouse-client/client/internal'
