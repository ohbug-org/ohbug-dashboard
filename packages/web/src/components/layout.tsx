import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <header className="sticky top-0 bg-white bg-opacity-40 z-50 backdrop-blur">
        header
      </header>
      <main>{children}</main>
    </>
  )
}

export default Layout
