import { unlink } from 'node:fs/promises'
import { Process, Processor } from '@nestjs/bull'
import { nanoid } from 'nanoid'
import { type Job } from 'bull'
import { type Prisma, type Project, type Release } from '@prisma/client'
import { type ReceiveSourceMapFile, type SourceMapData } from 'common'
import { maxSourceMap } from '../source-map/source-map.constant'
import { type ReceiveSourceMapDto } from '../source-map/source-map.dto'
import { type PrismaService } from '~/common'
import { ForbiddenException } from '~/common'

@Processor('sourceMap')
export class SourceMapProcessor {
  constructor(private readonly prisma: PrismaService) {}

  async createRelease(
    sourceMaps: ReceiveSourceMapFile[],
    body: ReceiveSourceMapDto,
    project: Project,
    release?: Release,
  ) {
    return this.prisma.release.upsert({
      where: { id: release?.id ?? 0 },
      create: {
        apiKey: body.apiKey,
        appVersion: body.appVersion,
        appType: body.appType,
        sourceMaps: sourceMaps as unknown as Prisma.InputJsonArray,
        project: { connect: { id: project.id } },
      },
      update: {
        apiKey: body.apiKey,
        appType: body.appType,
        sourceMaps: sourceMaps as unknown as Prisma.InputJsonArray,
        project: { connect: { id: project.id } },
      },
    })
  }

  @Process('file')
  async handleSourceMap(job: Job) {
    const data = job.data
    try {
      const project = await this.prisma.project.findUniqueOrThrow({
        where: { apiKey: data.body.apiKey },
        include: { releases: true },
      })
      if (data.sourceMapFile && project) {
        const sourceMap = {
          ...data.sourceMapFile,
          id: nanoid(),
        }
        // 没有 release
        if (project.releases.length === 0) return this.createRelease([sourceMap], data.body, project)

        const { appVersion } = data.body || {}
        // 看是否达到上限
        const release = project.releases.find(release => release.appVersion === appVersion)
        if (release) {
          const sourceMaps = release?.sourceMaps as unknown as SourceMapData || []
          if (sourceMaps.length < maxSourceMap) {
            return this.createRelease([...sourceMaps, sourceMap], data.body, project, release)
          }
          // 已经达到上限 删除最旧的
          const deleteSourceMap = sourceMaps.shift()
          if (deleteSourceMap) {
            await unlink(deleteSourceMap.path)
            sourceMaps.push(sourceMap)
            return this.createRelease(sourceMaps, data.body, project, release)
          }
        }
        return this.createRelease([sourceMap], data.body, project)
      }
      throw new Error('project not found')
    }
    catch (error) {
      throw new ForbiddenException(4001200, error)
    }
  }
}
