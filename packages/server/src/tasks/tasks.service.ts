import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import dayjs from 'dayjs'
import { PrismaService } from '~/common'

const interval = 30

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(TasksService.name)

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handleDeleteExpiredData() {
    const options = { where: { createdAt: { lt: dayjs().subtract(interval, 'days').toDate() } } }
    await this.prisma.metric.deleteMany(options)
    this.logger.log(`Metric from ${interval} days ago has been deleted`, TasksService.name)
    await this.prisma.feedback.deleteMany(options)
    this.logger.log(`Feedback from ${interval} days ago has been deleted`, TasksService.name)
    await this.prisma.pageView.deleteMany(options)
    this.logger.log(`PageView from ${interval} days ago has been deleted`, TasksService.name)
    await this.prisma.userView.deleteMany(options)
    this.logger.log(`UserView from ${interval} days ago has been deleted`, TasksService.name)
    await this.prisma.issue.deleteMany(options)
    this.logger.log(`Issue/Event from ${interval} days ago has been deleted`, TasksService.name)
  }
}
