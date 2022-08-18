import { writeFileSync } from 'fs'
import { Plugin } from 'release-it'

class Deploy extends Plugin {
  beforeRelease() {
    const imageName = 'ohbug/ohbug-ce'
    const tagName = this.config.contextOptions.tagName || this.config.contextOptions.version || 'latest'
    const name = `${imageName}:${tagName}`
    const raw = `#!/bin/sh

docker buildx create --use --name multi-arch-builder
docker buildx build --platform linux/amd64,linux/arm64 -t ${name} .`
    writeFileSync('./scripts/buildDockerImage.sh', raw, {
      encoding: 'utf8',
      mode: 0o777,
    })
  }
}

export default Deploy
