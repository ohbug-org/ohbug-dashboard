import type { Setting } from '@prisma/client'
import { prisma } from '~/db'

export function serviceGetSetting() {
  return prisma.setting.findFirst()
}

export async function serviceCreateSetting(data: Setting) {
  const setting = await prisma.setting.findFirst()
  if (setting) {
    return prisma.setting.update({
      data,
      where: { id: setting.id },
    })
  }
  return prisma.setting.create({ data })
}
