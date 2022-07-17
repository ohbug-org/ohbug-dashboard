import { ConfigService } from '@nestjs/config'
import { BullModule } from '@nestjs/bull'
import { ConfigModule } from '../configs'

export const BullModuleConfig = BullModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return { redis: configService.get('db.redis') }
  },
})
