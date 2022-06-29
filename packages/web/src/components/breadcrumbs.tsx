import type { FC } from 'react'
import { useMemo } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, Flex, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import Project from './project'
import Logo from './logo'
import useBreadcrumb from '~/hooks/useBreadcrumb'

const Breadcrumbs: FC = () => {
  const [breadcrumbs] = useBreadcrumb()
  const separatorColor = useColorModeValue('gray.200', 'gray.600')

  const Separator = useMemo(() => (
    <Center
      fontSize="24"
      marginTop="-1"
      textColor={separatorColor}
    >
      /
    </Center>
  ), [separatorColor])

  return (
    <Flex gap="4">
      <NextLink href="/">
        <Logo />
      </NextLink>

      {Separator}

      <Project />

      {breadcrumbs.length ? Separator : null}

      <Breadcrumb
        alignItems="center"
        display="flex"
        separator={Separator}
      >
        {
          breadcrumbs
            .slice(0, breadcrumbs.length - 1)
            .map(v => (
              <BreadcrumbItem key={v.path}>
                <NextLink href={v.path}>
                  <BreadcrumbLink>
                    {v.breadcrumb}
                  </BreadcrumbLink>
                </NextLink>
              </BreadcrumbItem>
            ))
        }
        <BreadcrumbItem><BreadcrumbLink>{breadcrumbs.at(-1)?.breadcrumb}</BreadcrumbLink></BreadcrumbItem>
      </Breadcrumb>
    </Flex>

  )
}

export default Breadcrumbs
