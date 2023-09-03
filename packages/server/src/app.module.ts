import { Module } from '@nestjs/common'
import { SharedModule } from '~/shared.module'
import { ApiModule } from '~/api/api.module'
import { TasksModule } from '~/tasks/tasks.module'

@Module({
  imports: [
    SharedModule,
    ApiModule,
    TasksModule,
  ],
})
export class AppModule {}
