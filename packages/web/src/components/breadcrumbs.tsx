import type { FC } from 'react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, Flex } from '@chakra-ui/react'
import NextLink from 'next/link'
import Image from 'next/image'
import Project from './project'
import useBreadcrumb from '~/hooks/useBreadcrumb'

const Separator = (
  <Center
    fontSize="24"
    marginTop="-1"
    textColor="gray.200"
  >
    /
  </Center>
)

const Breadcrumbs: FC = () => {
  const [breadcrumbs] = useBreadcrumb()

  return (
    <Flex gap="4">
      <NextLink href="/">
        <Box
          as="a"
          cursor="pointer"
          h="16"
          position="relative"
          w="16"
        >
          <Image
            alt="logo"
            layout="fill"
            src="/logo.svg"
          />
        </Box>
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
                  <BreadcrumbLink fontWeight="bold">
                    {v.breadcrumb}
                  </BreadcrumbLink>
                </NextLink>
              </BreadcrumbItem>
            ))
        }
        <BreadcrumbItem><BreadcrumbLink fontWeight="bold">{breadcrumbs.at(-1)?.breadcrumb}</BreadcrumbLink></BreadcrumbItem>
      </Breadcrumb>
    </Flex>

  )
}

export default Breadcrumbs
