import { BullModule } from '@nestjs/bull'
import { getConfig } from 'config'

export const BullModuleConfig = BullModule.forRoot({ redis: getConfig().db.redis })
