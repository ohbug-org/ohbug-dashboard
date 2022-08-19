import { writeFileSync } from 'fs'
import { Plugin } from 'release-it'

class Deploy extends Plugin {
  beforeRelease() {
    const imageName = 'ohbug/ohbug-ce'
    const tagName = this.config.contextOptions.tagName || this.config.contextOptions.version || 'latest'
    const name = `${imageName}:${tagName}`
    const raw = `#!/bin/sh

docker buildx create --use

docker buildx build --platform linux/amd64,linux/arm64 -t ${name} -t ${imageName}:latest --push .`
    writeFileSync('./scripts/buildDockerImage.sh', raw, {
      encoding: 'utf8',
      mode: 0o777,
    })
  }
}

export default Deploy
