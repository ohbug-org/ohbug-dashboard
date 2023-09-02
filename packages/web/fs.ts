declare global {
  // eslint-disable-next-line vars-on-top,no-var
  var __fs__: typeof import('node:fs/promises')
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
function createProxy<T extends object>(target: T, tempLink: any[] = []): T {
  return new Proxy(target, {
    get(_target, prop: string) {
      if (methods.includes(prop)) {
        tempLink.push(prop)
        return async (...args: any[]) => {
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
    if (!globalThis.__fs__) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      globalThis.__fs__ = require('node:fs/promises')
    }
    return globalThis.__fs__
  }
  const tempLink: any[] = []
  return createProxy({} as typeof import('node:fs/promises'), tempLink)
}
