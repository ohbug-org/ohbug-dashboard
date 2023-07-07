'use client'

import { Button, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import type { OhbugConfig } from '@ohbug/types'
import { useLocalStorage } from 'react-use'

interface Props {
  defaultConfig: OhbugConfig
}

function Config({ defaultConfig }: Props) {
  const ct = useTranslations('Common')
  const { handleSubmit, register } = useForm<OhbugConfig>({ defaultValues: defaultConfig })
  const [, setValue, remove] = useLocalStorage('MOCK_CONFIG', defaultConfig)
  const onSubmit = useCallback((data: OhbugConfig) => {
    setValue(data)
  }, [])
  const handleReset = useCallback(() => {
    remove()
    window.location.reload()
  }, [])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl>
        <FormLabel>apiKey: </FormLabel>
        <Input
          {...register('apiKey', { required: ct('thisIsRequired') })}
          disabled
          name="apiKey"
          size="sm"
        />
      </FormControl>

      <FormControl>
        <FormLabel>appVersion: </FormLabel>
        <Input
          {...register('appVersion', { required: ct('thisIsRequired') })}
          name="appVersion"
          size="sm"
        />
      </FormControl>

      <FormControl>
        <FormLabel>appType: </FormLabel>
        <Input
          {...register('appType', { required: ct('thisIsRequired') })}
          name="appType"
          size="sm"
        />
      </FormControl>

      <FormControl>
        <FormLabel>endpoint: </FormLabel>
        <Input
          {...register('endpoint', { required: ct('thisIsRequired') })}
          name="endpoint"
          size="sm"
        />
      </FormControl>

      <FormControl>
        <FormLabel>releaseStage: </FormLabel>
        <Input
          {...register('releaseStage')}
          disabled
          name="releaseStage"
          size="sm"
        />
      </FormControl>

      <FormControl>
        <FormLabel>maxActions: </FormLabel>
        <NumberInput min={1}>
          <NumberInputField
            {...register('maxActions')}
            name="maxActions"
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl mt="4">
        <Button
          mr="2"
          size="sm"
          type="submit"
        >
          Save
        </Button>
        <Button
          onClick={handleReset}
          size="sm"
          variant="ghost"
        >
          Reset
        </Button>
      </FormControl>

    </form>
  )
}

export default Config
