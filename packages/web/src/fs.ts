import fs from 'fs/promises'

declare global {
  // eslint-disable-next-line vars-on-top,no-var
  var __fs__: typeof fs
}

/**
 * client
 */
function handleFetch(link: any[]) {
  const isMethod = link.length === 2
  let method = ''
  let data = ''
  if (isMethod) {
    method = link[0]
    data = link[1]
    const body = { data }
    return fetch(
      `/api/fs/${method}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
    )
      .then(res => res.json())
      .then((res) => {
        if (res.success) {
          return res.data
        }
        throw new Error(res.errorMessage)
      })
  }
  return null
}

const methods = [
  'access', 'copyFile', 'cp',
  'open', 'opendir', 'rename',
  'truncate', 'rm', 'rmdir',
  'mkdir', 'readdir', 'readlink',
  'symlink', 'lstat', 'stat',
  'link', 'unlink', 'chmod',
  'lchmod', 'lchown', 'chown',
  'utimes', 'lutimes', 'realpath',
  'mkdtemp', 'writeFile', 'appendFile',
  'readFile', 'watch',
]
function createProxy<T extends Object>(target: T, tempLink: any[] = []): T {
  return new Proxy(target, {
    get(_target, prop: string) {
      if (methods.includes(prop)) {
        tempLink.push(prop)
        return async(...args: any[]) => {
          tempLink.push(args)
          const result = await handleFetch(tempLink)
          tempLink.length = 0
          return result
        }
      }
      return createProxy<T>({} as T, tempLink)
    },
  })
}

export function getFs() {
  if (typeof window === 'undefined') {
    if (!global.__fs__) {
      global.__fs__ = fs
    }
    return global.__fs__
  }
  const tempLink: any[] = []
  return createProxy({} as typeof fs, tempLink)
}
