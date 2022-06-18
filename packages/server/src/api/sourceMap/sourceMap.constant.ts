import { cwd } from 'process'
import { join } from 'path'

export const UPLOAD_DEST = join(cwd(), '../../.uploads')

export const maxSourceMap = 500
