import { Global, Module } from '@nestjs/common'
import { BullModuleConfig } from '~/common'

@Global()
@Module({ imports: [BullModuleConfig] })
export class SharedModule {}
