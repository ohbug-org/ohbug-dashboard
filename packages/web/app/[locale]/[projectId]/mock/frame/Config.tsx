'use client'

import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import type { OhbugConfig } from '@ohbug/types'
import { useLocalStorage } from 'react-use'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

const formSchema = z.object({
  apiKey: z.string(),
  appVersion: z.string(),
  appType: z.string(),
  endpoint: z.string(),
  releaseStage: z.string(),
  maxActions: z.number().min(1),
})

interface Props {
  defaultConfig: OhbugConfig
}

function Config({ defaultConfig }: Props) {
  const ct = useTranslations('Common')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultConfig,
  })
  const [, setValue, remove] = useLocalStorage('MOCK_CONFIG', defaultConfig)
  const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    setValue(values)
  }, [])
  const handleReset = useCallback(() => {
    remove()
    window.location.reload()
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>apiKey</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="appVersion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>appVersion</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="appType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>appType</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endpoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>endpoint</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="releaseStage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>releaseStage</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxActions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>maxActions</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className='mr-2'
          size="sm"
          type="submit"
        >
          Save
        </Button>
        <Button
          onClick={handleReset}
          size="sm"
          variant="outline"
        >
          Reset
        </Button>
      </form>
    </Form>
  )
}

export default Config
