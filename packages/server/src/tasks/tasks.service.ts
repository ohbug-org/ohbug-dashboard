import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import dayjs from 'dayjs'
import { PrismaService } from '~/common'

const interval = 30

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handleDeleteExpiredData() {
    const options = { where: { createdAt: { lt: dayjs().subtract(interval, 'days').toDate() } } }
    await this.prisma.metric.deleteMany(options)
    await this.prisma.feedback.deleteMany(options)
    await this.prisma.pageView.deleteMany(options)
    await this.prisma.userView.deleteMany(options)
    await this.prisma.issue.deleteMany(options)
  }
}
