import type { Setting } from '@prisma/client'
import { getPrisma } from '~/db'

export function serviceGetSetting() {
  return getPrisma().setting.findFirst()
}

export async function serviceCreateSetting(data: Setting) {
  const setting = await getPrisma().setting.findFirst()
  if (setting) {
    return getPrisma().setting.update({
      data,
      where: { id: setting.id },
    })
  }
  return getPrisma().setting.create({ data })
}
