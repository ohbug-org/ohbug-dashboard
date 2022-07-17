import path from 'path'
import { cwd } from 'process'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.join(cwd(), '../../.env') })

export default {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
}
