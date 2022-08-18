import { writeFileSync } from 'fs'
import { Plugin } from 'release-it'

class Deploy extends Plugin {
  beforeRelease() {
    const tagName = this.config.contextOptions.tagName || this.config.contextOptions.version || 'latest'
    const imageName = 'ohbug/ohbug-ce'
    const name = `${imageName}:${tagName}`
    const raw = `#!/bin/bash

docker buildx build --platform linux/amd64,linux/arm64 -t ${imageName}

echo Successfully released ${name}
`
    writeFileSync('./buildDockerImage.sh', raw, {
      encoding: 'utf8',
      mode: 0o755,
    })
  }
}

export default Deploy
