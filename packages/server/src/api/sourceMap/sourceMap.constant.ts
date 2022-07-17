import { cwd } from 'node:process'
import { join } from 'node:path'

export const UPLOAD_DEST = join(cwd(), '../../.uploads')

export const maxSourceMap = 500
