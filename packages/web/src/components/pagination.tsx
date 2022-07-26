import type { FlexProps } from '@chakra-ui/react'
import { ButtonGroup, Flex, IconButton, Text } from '@chakra-ui/react'
import { PAGE_SIZE } from 'common'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'
import { useCallback } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

interface Props extends Omit<FlexProps, 'onChange'> {
  page: number
  pageSize?: number
  total: number
  onChange: (page: number) => void
}

const Pagination: FC<Props> = ({ page = 1, pageSize = PAGE_SIZE, total, onChange, ...props }) => {
  const t = useTranslations('Common')
  const handlePrev = useCallback(() => {
    const _page = page - 1
    const value = _page > 0 ? _page : 1
    onChange(value)
  }, [page])
  const handleNext = useCallback(() => {
    const _page = page + 1
    const value = _page > 0 ? _page : 1
    onChange(value)
  }, [page])

  return (
    <Flex
      align="center"
      gap="4"
      justify="end"
      {...props}
    >
      <Text
        fontSize="sm"
        textColor="gray"
      >
        {t('total')}: {total}
      </Text>
      <ButtonGroup
        isAttached
        size="sm"
        variant="outline"
      >
        <IconButton
          aria-label="left"
          cursor="pointer"
          disabled={page <= 1}
          icon={<RiArrowLeftSLine />}
          onClick={handlePrev}
        />
        <IconButton
          aria-label="right"
          cursor="pointer"
          disabled={page * pageSize >= total}
          icon={<RiArrowRightSLine />}
          onClick={handleNext}
        />
      </ButtonGroup>
    </Flex>
  )
}

export default Pagination
