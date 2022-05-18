import { Global, Module } from '@nestjs/common'
import { RedisModule } from '~/common'

@Global()
@Module({ imports: [RedisModule] })
export class SharedModule {}
