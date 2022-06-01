import { FC, ReactNode } from 'react'
import ToggleTheme from './toggleTheme'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <header>
        <ToggleTheme />
      </header>
      <main>{children}</main>
    </>
  )
}

export default Layout
