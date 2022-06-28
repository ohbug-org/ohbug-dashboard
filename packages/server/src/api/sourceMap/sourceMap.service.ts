import { unlink } from 'fs/promises'
import { Injectable } from '@nestjs/common'
import { ReceiveSourceMapFile, SourceMapData } from 'common'
import { Prisma, Project, Release } from '@prisma/client'
import { ReceiveSourceMapDto } from './sourceMap.dto'
import { maxSourceMap } from './sourceMap.constant'
import { ForbiddenException, PrismaService } from '~/common'

@Injectable()
export class SourceMapService {
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

  /**
   * 接受上传的 sourceMap 文件和相关 app 信息并存储
   * 这里是上传的单条 sourceMap，createSourceMap 时应该对同一次 build 的内容进行合并
   *
   * @param file sourceMap 文件相关信息
   * @param receiveSourceMapDto 此文件对应的 app 信息
   */
  async handleSourceMap(
    sourceMap: ReceiveSourceMapFile,
    body: ReceiveSourceMapDto,
  ) {
    try {
      const project = await this.prisma.project.findUnique({
        where: { apiKey: body.apiKey },
        include: { releases: true },
      })
      if (sourceMap && project) {
        // 没有 release
        if (!project.releases.length) return this.createRelease([sourceMap], body, project)

        const { appVersion } = body || {}
        // 看是否达到上限
        const release = project.releases.find(release => release.appVersion === appVersion)
        if (release) {
          const sourceMaps = release?.sourceMaps as unknown as SourceMapData || []
          if (sourceMaps.length < maxSourceMap)
            return this.createRelease([...sourceMaps, sourceMap], body, project, release)
          // 已经达到上限 删除最旧的
          const deleteSourceMap = sourceMaps.shift()
          if (deleteSourceMap) {
            await unlink(deleteSourceMap.path)
            sourceMaps.push(sourceMap)
            return this.createRelease(sourceMaps, body, project, release)
          }
        }
        return this.createRelease([sourceMap], body, project)
      }
      throw new Error('project not found')
    }
    catch (error) {
      throw new ForbiddenException(400902, error)
    }
  }
}
