import { Box, keyframes } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { FC } from 'react'
import { RiLoader2Line } from 'react-icons/ri'

const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0) }
  50% { transform: scale(1) rotate(180deg) }
  100% { transform: scale(1) rotate(360deg) }
`

const animation = `${animationKeyframes} 2s infinite`

const Spinning: FC = () => {
  return (
    <Box
      animation={animation}
      as={motion.div}
    >
      <RiLoader2Line />
    </Box>
  )
}

export default Spinning
