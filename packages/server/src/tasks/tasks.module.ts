import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { PrismaService } from '~/common'

@Module({ providers: [TasksService, PrismaService] })
export class TasksModule {}
