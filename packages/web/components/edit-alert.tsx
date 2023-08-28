'use client'

import { useCallback } from 'react'
import { type FC } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { AlertConditionTopic, AlertFilterTopic } from 'common'
import { useTranslations } from 'next-intl'
import { type Action, type ConditionOption, type FilterMatch, type FilterOption, type Interval, type OmitAlert } from 'common'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Badge } from '~/components/ui/badge'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input, Input } from "~/components/ui/input"
import { Select } from './ui/select'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export const ActionOptions = ['email', 'webhook']
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
export const FilterAttributeOptions: string[] = ['message', 'type']
export const FilterMatchOptions: FilterMatch[] = ['contains', 'starts with', 'ends with', 'equals', 'does not contain', 'does not start with', 'does not end with', 'does not equal']
export const AlertLevel = {
  serious: 'serious',
  warning: 'warning',
  default: 'default',
}

const formSchema = z.object({
  conditionMatch: z.enum(['all', 'every']),

})

interface Props {
  alert?: OmitAlert
  onSubmit: (value: z.infer<typeof formSchema>) => void
}

const EditAlert: FC<Props> = ({ alert, onSubmit }) => {
  const ct = useTranslations('Common')
  const t = useTranslations('Alerts')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: alert
      ? {
        name: alert.name,
        releaseStage: alert.releaseStage,
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
  const { fields: actionsFields, append: actionsAppend, remove: actionsRemove } = useFieldArray({ control, name: 'actions' })
  const { fields: conditionsFields, append: conditionsAppend, remove: conditionsRemove } = useFieldArray({ control, name: 'conditions' })
  const { fields: filtersFields, append: filtersAppend, remove: filtersRemove } = useFieldArray({ control, name: 'filters' })
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
    <form
      className='flex flex-col gap-6'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div>
        <FormControl>
          <FormLabel>{t('alertConditions')}</FormLabel>
          <div className="flex items-center mb-2">
            <Badge>
              WHEN
            </Badge>
            <div className='space-x-2'>
              <span>an event is captured by Ohbug and</span>
              <FormControl
                isInvalid={!!errors.conditionMatch}
                w="auto"
              >
                <Select
                  size="xs"
                  width="24"
                  {...register('conditionMatch', { required: ct('thisIsRequired') })}
                >
                  <option value="all">all</option>
                  <option value="every">every</option>
                </Select>
              </FormControl>
              <span>of the following happens</span>
            </div>
          </div>
          {
            conditionsFields.map((item, index) => {
              return (
                <div className='flex items-center gap-2 mb-2 px-2 py-1 rounded-md'>
                  <div className='space-x-2 flex-1'>
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
                          <FormControl
                            isInvalid={!!errors.conditions?.[index]?.value}
                            w="auto"
                          >
                            <Input
                            id="interval"
                                {...register(`conditions.${index}.value`, {
                                  required: ct('thisIsRequired'),
                                  min: 1,
                                  valueAsNumber: true,
                                })}>
                            </Input>
                          </FormControl>
                          <span>times in</span>
                          <FormControl
                            isInvalid={!!errors.conditions?.[index]?.interval}
                            w="auto"
                          >
                            <Select
                              size="xs"
                              width="24"
                              {...register(`conditions.${index}.interval`, { required: ct('thisIsRequired') })}
                            >
                              {
                                IntervalOptions.map(interval => (
                                  <option
                                    key={interval}
                                    value={interval}
                                  >
                                    {interval}
                                  </option>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </>
                      )
                    }
                    {
                      item.topic === AlertConditionTopic.UserFrequencyCondition && (
                        <>
                          <span>The issue is seen by more than </span>
                          <FormControl
                            isInvalid={!!errors.conditions?.[index]?.value}
                            w="auto"
                          >
                            <Input
                              id="interval"
                              {...register(`conditions.${index}.value`, {
                                required: ct('thisIsRequired'),
                                min: 1,
                                valueAsNumber: true,
                              })}
                            />
                          </FormControl>
                          <span>users in</span>
                          <FormControl
                            isInvalid={!!errors.conditions?.[index]?.interval}
                            w="auto"
                          >
                            <Select
                              size="xs"
                              width="24"
                              {...register(`conditions.${index}.interval`, { required: ct('thisIsRequired') })}
                            >
                              {
                                IntervalOptions.map(interval => (
                                  <option
                                    key={interval}
                                    value={interval}
                                  >
                                    {interval}
                                  </option>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </>
                      )
                    }
                  </div>
                  <Button
                    onClick={() => conditionsRemove(index)}
                    size="icon"
                    variant="outline"
                  >
                    <i className='i-ri-delete-bin-line'></i>
                  </Button>
                </div>
              )
            })
          }
        </FormControl>
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
                    onClick={()=>{
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
        <FormControl>
          <FormLabel>{t('alertFilters')}</FormLabel>
          <div className='flex items-center gap-2 mb-2'>
            <Badge>
              IF
            </Badge>
            <div className='space-x-2'>
              <FormControl
                isInvalid={!!errors.filters}
                w="auto"
              >
                <Select
                  size="xs"
                  width="24"
                  {...register('filterMatch', { required: ct('thisIsRequired') })}
                >
                  <option value="all">all</option>
                  <option value="every">every</option>
                </Select>
              </FormControl>
              <span>of these filters match</span>
            </div>
          </div>
          {
            filtersFields.map((item, index) => {
              return (
                <div className='flex items-center mb-2 px-2 py-1 rounded-md'>

                  <div className='space-x-2 flex-1'>
                    {
                      item.topic === AlertFilterTopic.IssueOccurrencesFilter && (
                        <>
                          <span>The issue has happened at least</span>
                          <FormControl
                            isInvalid={!!errors.filters?.[index]?.value}
                            w="auto"
                          >
                            <Input
                              id="interval"
                              {...register(`filters.${index}.value`, {
                                required: ct('thisIsRequired'),
                                min: 1,
                                valueAsNumber: true,
                              })}
                            />
                          </FormControl>
                          <span>times</span>
                        </>
                      )
                    }
                    {
                      item.topic === AlertFilterTopic.EventAttributeFilter && (
                        <>
                          <span>The events </span>
                          <FormControl
                            isInvalid={!!errors.filters?.[index]?.attribute}
                            w="auto"
                          >
                            <Select
                              size="xs"
                              width="24"
                              {...register(`filters.${index}.attribute`, { required: ct('thisIsRequired') })}
                            >
                              {
                                FilterAttributeOptions.map(attribute => (
                                  <option
                                    key={attribute}
                                    value={attribute}
                                  >
                                    {attribute}
                                  </option>
                                ))
                              }
                            </Select>
                          </FormControl>
                          <span> value </span>
                          <FormControl
                            isInvalid={!!errors.filters?.[index]?.match}
                            w="auto"
                          >
                            <Select
                              size="xs"
                              width="24"
                              {...register(`filters.${index}.match`, { required: ct('thisIsRequired') })}
                            >
                              {
                                FilterMatchOptions.map(match => (
                                  <option
                                    key={match}
                                    value={match}
                                  >
                                    {match}
                                  </option>
                                ))
                              }
                            </Select>
                          </FormControl>
                          <FormControl
                            isInvalid={!!errors.filters?.[index]?.value}
                            w="auto"
                          >
                            <Input
                              size="xs"
                              variant="filled"
                              width="24"
                              {...register(`filters.${index}.value`, { required: ct('thisIsRequired') })}
                            />
                          </FormControl>
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
                    onClick={() => filtersRemove(index)}
                    size="icon"
                    variant="outline"
                  >
                    <i className='i-ri-delete-bin-line'></i>
                  </Button>
                </div>
              )
            })
          }
        </FormControl>
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
                    onClick={()=>{
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

      <FormControl isInvalid={!!errors.interval}>
        <FormLabel htmlFor="interval">{t('alertInterval')}</FormLabel>
        <Select
          id="interval"
          variant="filled"
          {...register('interval', { required: ct('thisIsRequired') })}
        >
          {
            IntervalOptions.map(interval => (
              <option
                key={interval}
                value={interval}
              >
                {interval}
              </option>
            ))
          }
        </Select>
        <FormErrorMessage>
          {errors.interval && errors.interval.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.level}>
        <FormLabel htmlFor="level">{t('alertLevel')}</FormLabel>
        <Select
          id="level"
          variant="filled"
          {...register('level', { required: ct('thisIsRequired') })}
        >
          {
            Object.values(AlertLevel).map(item => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))
          }
        </Select>
        <FormErrorMessage>
          {errors.level && errors.level.message}
        </FormErrorMessage>
      </FormControl>

      <div>
        <FormControl isInvalid={!!errors.actions}>
          <FormLabel>{t('alertActions')}</FormLabel>
          {
            actionsFields.map((item, index) => {
              return (
                <div
                  className='flex items-center flex-col mb-2 rounded-md w-full'
                  key={item.id}
                >
                  <div className='flex items-center gap-2 flex-1 w-full'>
                    {
                      item.type === 'webhook' && (
                        <Select
                          w="72"
                          {...register(`actions.${index}.webhookType`, { required: ct('thisIsRequired') })}
                        >
                          <option value="dingtalk"><i className='i-ri-dingding-fill'></i>{t('dingtalk')}</option>
                          <option value="wechatWork"><i className='i-ri-wechat-fill'>{t('wechatWork')}</option>
                          <option value="others"><i className='i-ri-customer-service-2-fill'>{t('others')}</option>
                        </Select>
                      )
                    }
                    {
                      item.type === 'webhook' && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Input
                              placeholder={t('webhookContact')}
                              variant="filled"
                              w="96"
                              {...register(`actions.${index}.at`)}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <span>{t('webhookTooltip')}</span>
                          </TooltipContent>
                        </Tooltip>
                      )
                    }
                    <Input
                      variant="filled"
                      w="full"
                      {...register(`actions.${index}.uri`, {
                        required: ct('thisIsRequired'),
                        pattern: {
                          value: item.type === 'email' ? /\S+@\S+\.\S+/ : /https?:\/\/(www\.)?[\w#%+.:=@~-]{1,256}\.[\d()A-Za-z]{1,6}\b([\w#%&()+./:=?@~-]*)/,
                          message: item.type === 'email' ? ct('mustBeTheCorrectEmailAddress') : t('mustBeTheCorrectUrlAddress'),
                        },
                      })}
                      placeholder={item.type === 'email' ? t('inputEmailAddress') : t('inputWebhookURL')}
                    />
                    <Button
                      onClick={() => actionsRemove(index)}
                      size="icon"
                      variant="outline"
                    >
                      <i className='i-ri-delete-bin-line'></i>
                    </Button>
                  </div>
                  <FormErrorMessage w="full">
                    {errors.actions && errors.actions?.[index]?.uri?.message}
                  </FormErrorMessage>
                </div>
              )
            })
          }
        </FormControl>
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
                    onClick={()=>{
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

      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">{t('alertName')}</FormLabel>
        <Input
          id="name"
          placeholder="Input Alert Name"
          type="text"
          variant="filled"
          {...register('name', { required: ct('thisIsRequired') })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <div className='mt-6'>
        <Button
          type="submit"
          className='w-full'
        >
          {
            alert ? t('updateAlert') : t('createAlert')
          }
        </Button>
      </div>
    </form>
  )
}

export default EditAlert
