import { KBarProvider } from 'kbar'
import dynamic from 'next/dynamic'
import type React from 'react'
import { useSearchBarActions } from '~/hooks/useSearchBarActions'

interface SearchBarProviderProps {
  children?: React.ReactNode
}

const SearchBar = dynamic(() => import('./searchBar'), { ssr: false })

const SearchBarProvider: React.FC<SearchBarProviderProps> = ({ children }) => {
  const { actions } = useSearchBarActions()

  return (
    <KBarProvider actions={actions}>
      <SearchBar />
      {children}
    </KBarProvider>
  )
}

export default SearchBarProvider
