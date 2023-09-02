import { atomWithStorage } from 'jotai/utils'
import { type SearchIssuesOrderBy } from '~/services/issues'

export const issueSortAtom = atomWithStorage<SearchIssuesOrderBy>(
  'issue.searchIssuesSort',
  'updatedAt',
)
