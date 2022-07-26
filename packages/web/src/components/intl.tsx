import type { ChangeEvent, FC } from 'react'
import { useCallback } from 'react'
import { Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'
const options = [
  {
    label: '中文',
    value: 'zh',
  },
  {
    label: 'English',
    value: 'en',
  },
]

const Intl: FC = () => {
  const router = useRouter()
  const handleChange = useCallback(async(e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const value = e.target.value
    await router.replace(
      router.asPath,
      undefined,
      { locale: value },
    )
    router.reload()
  }, [router.asPath])

  return (
    <Select
      onChange={handleChange}
      size="xs"
      value={router.locale}
      variant="filled"
      w="24"
    >
      {
        options.map(({ label, value }) => (
          <option
            key={value}
            value={value}
          >
            {label}
          </option>
        ))
      }
    </Select>
  )
}

export default Intl
