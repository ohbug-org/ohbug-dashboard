import { all } from '@chenyueban/eslint-config'

export default [
  ...all,
  { rules: { 'import/no-default-export': 'off' } },
]