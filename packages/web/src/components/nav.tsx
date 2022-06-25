import type { FC } from 'react'
import { Box, Center, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import Image from 'next/image'
import User from './user'
import Project from './project'

interface Props {}

const Nav: FC<Props> = () => {
  return (
    <Flex
      align="center"
      bg="white"
      h="full"
      justify="space-between"
      w="full"
    >
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

        <Center
          fontSize="24"
          marginTop="-1"
          textColor="gray.200"
        >
          /
        </Center>

        <Project />
      </Flex>

      <Flex
        align="center"
        gap="4"
      >
        <Link
          href="https://ohbug.net/"
          target="_blank"
        >
          Docs
        </Link>
        <User />
      </Flex>
    </Flex>
  )
}

export default Nav
