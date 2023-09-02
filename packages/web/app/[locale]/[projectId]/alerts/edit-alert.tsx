'use client'

import { useCallback } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { AlertConditionTopic, AlertFilterTopic } from 'common'
import { type Action, type ConditionOption, type FilterMatch, type FilterOption, type Interval, type OmitAlert } from 'common'
import { useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Badge } from '~/components/ui/badge'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'

export const ActionOptions = ['email', 'webhook'] as const
export const ConditionOptions: ConditionOption[] = [
  {
    topic: AlertConditionTopic.EventCapturedCondition,
    name: 'An event is captured',
  },
  {
    topic: AlertConditionTopic.FirstSeenEventCondition,
    name: 'A new issue is created',
  },
  {
    topic: AlertConditionTopic.EventFrequencyCondition,
    name: 'The issue is seen more than {value} times in {interval}',
  },
  {
    topic: AlertConditionTopic.UserFrequencyCondition,
    name: 'The issue is seen by more than {value} users in {interval}',
  },
]
export const IntervalOptions: Interval[] = ['1m', '5m', '15m', '1h', '1d', '7d', '30d']
export const FilterOptions: FilterOption[] = [
  {
    topic: AlertFilterTopic.IssueOccurrencesFilter,
    name: 'The issue has happened at least {value} times',
  },
  {
    topic: AlertFilterTopic.EventAttributeFilter,
    name: 'The event\'s {attribute} value {match} {value}',
  },
  {
    topic: AlertFilterTopic.LatestReleaseFilter,
    name: 'The event is from the latest release',
  },
]
export const FilterAttributeOptions = ['message', 'type'] as const
export const FilterMatchOptions: FilterMatch[] = ['contains', 'starts with', 'ends with', 'equals', 'does not contain', 'does not start with', 'does not end with', 'does not equal']
export const AlertLevel = {
  serious: 'serious',
  warning: 'warning',
  default: 'default',
}

export const formSchema = z.object({
  projectId: z.number(),
  name: z.string(),
  releaseStage: z.string(),
  recentlyAt: z.date().nullable(),
  level: z.enum(['serious', 'warning', 'default']),
  interval: z.string(),
  enabled: z.boolean(),
  filterMatch: z.enum(['all', 'every']),
  conditionMatch: z.enum(['all', 'every']),
  actions: z.array(z.object({
    type: z.enum(['email', 'webhook']),
    uri: z.string(),
    at: z.string().optional(),
    webhookType: z.enum(['dingtalk', 'wechatWork', 'others']).optional(),
  })),
  conditions: z.array(z.object({
    topic: z.nativeEnum(AlertConditionTopic),
    name: z.string(),
    value: z.union([z.string(), z.number()]).optional(),
    interval: z.string().optional(),
  })),
  filters: z.array(z.object({
    topic: z.nativeEnum(AlertFilterTopic),
    name: z.string(),
    value: z.union([z.string(), z.number()]).optional(),
    attribute: z.string().optional(),
    match: z.enum(['contains', 'starts with', 'ends with', 'equals', 'does not contain', 'does not start with', 'does not end with', 'does not equal']).optional(),
  })),
})

interface Props {
  alert?: OmitAlert
  onSubmit: (value: z.infer<typeof formSchema>) => void
}

export default function EditAlert({ alert, onSubmit }: Props) {
  const t = useTranslations('Alerts')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: alert
      ? {
          name: alert.name,
          // releaseStage: alert.releaseStage,
          level: alert.level,
          interval: alert.interval,
          enabled: alert.enabled,
          actions: alert.actions,
          conditions: alert.conditions,
          filters: alert.filters,
          conditionMatch: alert.conditionMatch,
          filterMatch: alert.filterMatch,
        }
      : {
          filterMatch: 'all',
          conditionMatch: 'all',
        },
  })
  const { fields: actionsFields, append: actionsAppend, remove: actionsRemove } = useFieldArray({ control: form.control, name: 'actions' })
  const { fields: conditionsFields, append: conditionsAppend, remove: conditionsRemove } = useFieldArray({ control: form.control, name: 'conditions' })
  const { fields: filtersFields, append: filtersAppend, remove: filtersRemove } = useFieldArray({ control: form.control, name: 'filters' })
  const handleAddAction = useCallback((type: Action['type']) => {
    if (type) {
      actionsAppend({ type, uri: '' })
    }
  }, [])
  const handleAddCondition = useCallback((topic: ConditionOption['topic']) => {
    if (topic) {
      conditionsAppend({ topic, name: ConditionOptions.find(v => v.topic === topic)!.name })
    }
  }, [])
  const handleAddFilter = useCallback((topic: FilterOption['topic']) => {
    if (topic) {
      filtersAppend({ topic, name: FilterOptions.find(v => v.topic === topic)!.name })
    }
  }, [])

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <FormItem>
            <FormLabel>{t('alertConditions')}</FormLabel>
            <div className="flex items-center mb-2">
              <Badge>
                WHEN
              </Badge>
              <div className="space-x-2">
                <span>an event is captured by Ohbug and</span>
                <FormField
                  control={form.control}
                  name="conditionMatch"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="all">all</SelectItem>
                              <SelectItem value="every">every</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span>of the following happens</span>
              </div>
            </div>
            {
              conditionsFields.map((item, index) => {
                return (
                  <div className="flex items-center gap-2 mb-2 px-2 py-1 rounded-md">
                    <div className="space-x-2 flex-1">
                      {
                        item.topic === AlertConditionTopic.EventCapturedCondition && (
                          <>An event is captured</>
                        )
                      }
                      {
                        item.topic === AlertConditionTopic.FirstSeenEventCondition && (
                          <>A new issue is created</>
                        )
                      }
                      {
                        item.topic === AlertConditionTopic.EventFrequencyCondition && (
                          <>
                            <span>The issue is seen more than </span>
                            <FormField
                              control={form.control}
                              name={`conditions.${index}.value`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      id="interval"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <span>times in</span>
                            <FormField
                              control={form.control}
                              name={`conditions.${index}.interval`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Select {...field}>
                                      <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          {
                                          IntervalOptions.map(interval => (
                                            <SelectItem
                                              key={interval}
                                              value={interval}
                                            >
                                              {interval}
                                            </SelectItem>
                                          ))
                                        }
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )
                      }
                      {
                        item.topic === AlertConditionTopic.UserFrequencyCondition && (
                          <>
                            <span>The issue is seen by more than </span>
                            <FormField
                              control={form.control}
                              name={`conditions.${index}.value`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      id="interval"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <span>users in</span>
                            <FormField
                              control={form.control}
                              name={`conditions.${index}.interval`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Select {...field}>
                                      <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          {
                                          IntervalOptions.map(interval => (
                                            <SelectItem
                                              key={interval}
                                              value={interval}
                                            >
                                              {interval}
                                            </SelectItem>
                                          ))
                                        }
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )
                      }
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => conditionsRemove(index)}
                    >
                      <i className="i-ri-delete-bin-line" />
                    </Button>
                  </div>
                )
              })
            }
          </FormItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                size="sm"
                variant="outline"
              >
                {t('addCondition')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {
                  ConditionOptions.map(item => (
                    <DropdownMenuItem
                      key={item.topic}
                      onClick={() => {
                        handleAddCondition(item.topic)
                      }}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))
                }
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <FormItem>
            <FormLabel>{t('alertFilters')}</FormLabel>
            <div className="flex items-center gap-2 mb-2">
              <Badge>
                IF
              </Badge>
              <div className="space-x-2">
                <FormField
                  control={form.control}
                  name="filterMatch"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="all">all</SelectItem>
                              <SelectItem value="every">every</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span>of these filters match</span>
              </div>
            </div>
            {
              filtersFields.map((item, index) => {
                return (
                  <div className="flex items-center mb-2 px-2 py-1 rounded-md">

                    <div className="space-x-2 flex-1">
                      {
                        item.topic === AlertFilterTopic.IssueOccurrencesFilter && (
                          <>
                            <span>The issue has happened at least</span>
                            <FormField
                              control={form.control}
                              name={`filters.${index}.value`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      id="interval"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <span>times</span>
                          </>
                        )
                      }
                      {
                        item.topic === AlertFilterTopic.EventAttributeFilter && (
                          <>
                            <span>The events </span>
                            <FormField
                              control={form.control}
                              name={`filters.${index}.attribute`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Select {...field}>
                                      <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          {
                                          FilterAttributeOptions.map(attribute => (
                                            <SelectItem
                                              key={attribute}
                                              value={attribute}
                                            >
                                              {attribute}
                                            </SelectItem>
                                          ))
                                        }
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <span> value </span>
                            <FormField
                              control={form.control}
                              name={`filters.${index}.value`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )
                      }
                      {
                        item.topic === AlertFilterTopic.LatestReleaseFilter && (
                          <>The event is from the latest release</>
                        )
                      }
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => filtersRemove(index)}
                    >
                      <i className="i-ri-delete-bin-line" />
                    </Button>
                  </div>
                )
              })
            }
          </FormItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                size="sm"
                variant="outline"
              >
                {t('addFilter')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {
                  FilterOptions.map(item => (
                    <DropdownMenuItem
                      key={item.topic}
                      onClick={() => {
                        handleAddFilter(item.topic)
                      }}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))
                }
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <FormField
          control={form.control}
          name="interval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('alertInterval')}</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                        IntervalOptions.map(interval => (
                          <SelectItem
                            key={interval}
                            value={interval}
                          >
                            {interval}
                          </SelectItem>
                        ))
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('alertLevel')}</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                      IntervalOptions.map(interval => (
                        <SelectItem
                          key={interval}
                          value={interval}
                        >
                          {interval}
                        </SelectItem>
                      ))
                    }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormItem>
            <FormLabel>{t('alertActions')}</FormLabel>
            {
                actionsFields.map((item, index) => {
                  return (
                    <div
                      key={item.id}
                      className="flex items-center flex-col mb-2 rounded-md w-full"
                    >
                      <div className="flex items-center gap-2 flex-1 w-full">
                        {
                          item.type === 'webhook' && (
                            <FormField
                              control={form.control}
                              name={`actions.${index}.webhookType`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Select {...field}>
                                      <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectItem value="dingtalk"><i className="i-ri-dingding-fill" />{t('dingtalk')}</SelectItem>
                                          <SelectItem value="wechatWork"><i className="i-ri-wechat-fill" />{t('wechatWork')}</SelectItem>
                                          <SelectItem value="others"><i className="i-ri-customer-service-2-fill" />{t('others')}</SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )
                        }
                        {
                          item.type === 'webhook' && (
                            <Tooltip>
                              <TooltipTrigger>
                                <FormField
                                  control={form.control}
                                  name={`actions.${index}.at`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          placeholder={t('webhookContact')}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <span>{t('webhookTooltip')}</span>
                              </TooltipContent>
                            </Tooltip>
                          )
                        }
                        <FormField
                          control={form.control}
                          name={`actions.${index}.uri`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-full"
                                  {...field}
                                  placeholder={item.type === 'email' ? t('inputEmailAddress') : t('inputWebhookURL')}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => actionsRemove(index)}
                        >
                          <i className="i-ri-delete-bin-line" />
                        </Button>
                      </div>
                    </div>
                  )
                })
              }
          </FormItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                size="sm"
                variant="outline"
              >
                {t('addAction')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {
                  ActionOptions.map(item => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => {
                        handleAddAction(item)
                      }}
                    >
                      {item}
                    </DropdownMenuItem>
                  ))
                }
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('alertName')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Input Alert Name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-6">
          <Button
            className="w-full"
            type="submit"
          >
            {
              alert ? t('updateAlert') : t('createAlert')
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}
