import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <header className="fixed top-0 w-full h-12 bg-white bg-opacity-40 z-40 backdrop-blur">
        header
      </header>
      <main className="pt-12 flex-1">{children}</main>
    </>
  )
}

export default Layout
