import { Plugin } from 'release-it'
import { execa } from 'execa'

class Deploy extends Plugin {
  afterRelease() {
    const tagName = this.config.contextOptions.tagName || this.config.contextOptions.version || 'latest'
    const imageName = `ohbug/ohbug-ce:${tagName}`
    await execa('docker', ['buildx', 'build', '--platform', 'linux/amd64,linux/arm64', '-t', imageName], { stdout: 'inherit' })
  }
}

export default Deploy
