import type { TabsProps as BaseTabsProps } from '@chakra-ui/react'
import { Tabs as BaseTabs } from '@chakra-ui/react'
import type { FC } from 'react'

interface TabsProps extends BaseTabsProps {}

export const Tabs: FC<TabsProps> = (props) => {
  return (
    <BaseTabs
      {...props}
      variant=""
    />
  )
}
