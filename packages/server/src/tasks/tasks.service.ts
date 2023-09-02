import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { getConfig } from 'config'
import dayjs from 'dayjs'
import { type PrismaService } from '~/common'

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(TasksService.name)

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handleDeleteExpiredData() {
    const dataExpirationTime = getConfig().options?.dataExpirationTime ?? 7
    const options = { where: { createdAt: { lt: dayjs().subtract(dataExpirationTime, 'days').toDate() } } }
    await this.prisma.metric.deleteMany(options)
    this.logger.log(`Metric from ${dataExpirationTime} days ago has been deleted`, TasksService.name)
    await this.prisma.feedback.deleteMany(options)
    this.logger.log(`Feedback from ${dataExpirationTime} days ago has been deleted`, TasksService.name)
    await this.prisma.pageView.deleteMany(options)
    this.logger.log(`PageView from ${dataExpirationTime} days ago has been deleted`, TasksService.name)
    await this.prisma.userView.deleteMany(options)
    this.logger.log(`UserView from ${dataExpirationTime} days ago has been deleted`, TasksService.name)
    await this.prisma.issue.deleteMany(options)
    this.logger.log(`Issue/Event from ${dataExpirationTime} days ago has been deleted`, TasksService.name)
  }
}
