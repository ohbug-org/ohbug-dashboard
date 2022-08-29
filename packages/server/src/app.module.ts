import { Module } from '@nestjs/common'
import { ApiModule } from '~/api/api.module'
import { TasksModule } from '~/tasks/tasks.module'
import { SharedModule } from '~/shared.module'

@Module({
  imports: [
    ApiModule,
    TasksModule,
    SharedModule,
  ],
})
export class AppModule {}
