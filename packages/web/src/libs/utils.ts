export function renderStringOrJson(value: any) {
  return typeof value === 'string'
    ? value
    : JSON.stringify(value)
}
