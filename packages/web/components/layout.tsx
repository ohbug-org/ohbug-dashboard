'use client'

import { useState } from 'react'
import { useIsomorphicLayoutEffect, useWindowScroll } from 'react-use'
import { twMerge } from 'tailwind-merge'
import { type FC, type ReactNode } from 'react'
import Nav from './nav'
import NavMenu from './nav-menu'
import User from './user'
import Logo from './logo'
import Footer from './footer'

import Wrapper from './wrapper'
import { scrollWindowTo } from '~/libs/utils'

const HeadHeight = 64
const NavHeight = 48

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const { y } = useWindowScroll()
  const [scrollNavVisible, setScrollNavVisible] = useState(false)

  useIsomorphicLayoutEffect(() => {
    setScrollNavVisible(y > HeadHeight)
  }, [y])

  return (
    <>
      <div className="min-h-screen w-full">
        {/* nav */}
        <div
          className="container mx-auto"
          style={{ height: HeadHeight }}
        >
          <Nav />
        </div>
        {/* navMenu */}
        <div
          className={
            twMerge(
              'backdrop-blur shadow-sm w-full',
              scrollNavVisible ? 'sticky' : 'relative',
              scrollNavVisible && 'top-0',
              scrollNavVisible && 'z-10',
            )
          }
          style={{ height: NavHeight }}
        >
          <nav
            className=" h-full flex items-center justify-between container mx-auto"
          >
            <div className="flex relative">
              <Logo
                className={
                  twMerge(
                    'relative transition-all',
                    scrollNavVisible ? 'opacity-100' : 'opacity-0',
                    scrollNavVisible ? 'visible' : 'invisible',
                  )
                }
                onClick={() => scrollWindowTo()}
                style={{ height: NavHeight, width: NavHeight, transform: scrollNavVisible ? 'translateZ(0)' : `translate3d(0,-${NavHeight}px,0)` }}
              />

              <div
                className="transition-transform"
                style={
                  { transform: scrollNavVisible ? 'translate3d(24px,0,0)' : `translate3d(-${NavHeight + 12}px,0,0)` }
                }
              >
                <NavMenu />
              </div>
            </div>

            <div
              className={
                twMerge(
                  'transition-all',
                  scrollNavVisible ? 'opacity-100' : 'opacity-0',
                  scrollNavVisible ? 'visible' : 'invisible',
                )
              }
              style={
                { transform: scrollNavVisible ? 'translateZ(0)' : `translate3d(0,-${NavHeight}px,0)` }
              }
            >
              <User />
            </div>
          </nav>
        </div>
        {/* main */}
        <div
          className="w-full border-b border-stone"
          style={
            { minHeight: `calc(100vh - ${HeadHeight + NavHeight}px)` }
          }
        >
          <div>{children}</div>
        </div>
        {/* footer */}
        <div className="py-8">
          <Wrapper>
            <Footer />
          </Wrapper>
        </div>
      </div>
    </>
  )
}

export default Layout
