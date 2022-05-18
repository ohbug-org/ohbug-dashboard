import { clone } from 'ramda'

export function formatter<T extends Record<string, any>>(
  data: Record<string, any>,
  fields: string[],
): T {
  const cloneData = clone(data)
  fields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(cloneData, field))
      cloneData[field] = JSON.stringify(data[field])
  })
  return cloneData as T
}
