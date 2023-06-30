'use client'

import { Badge, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, Tooltip } from '@chakra-ui/react'
import type { FC } from 'react'
import { useCallback } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { RiCustomerService2Fill, RiDeleteBinLine, RiDingdingFill, RiWechatFill } from 'react-icons/ri'
import type { Action, ConditionOption, FilterMatch, FilterOption, Interval, OmitAlert } from 'common'
import { AlertConditionTopic, AlertFilterTopic } from 'common'
import { useTranslations } from 'next-intl'
import ThemeBox from '~/components/themeBox'

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

interface Props {
  alert?: OmitAlert
  onSubmit: (data: OmitAlert) => void
}

const EditAlert: FC<Props> = ({ alert, onSubmit }) => {
  const ct = useTranslations('Common')
  const t = useTranslations('Alerts')
  const { handleSubmit, register, control, formState: { errors } } = useForm<OmitAlert>({
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
    <Flex
      as="form"
      direction="column"
      gap="6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box>
        <FormControl>
          <FormLabel>{t('alertConditions')}</FormLabel>
          <Flex
            align="center"
            gap="2"
            mb="2"
          >
            <Badge
              textAlign="center"
              variant="solid"
              w="14"
            >
              WHEN
            </Badge>
            <Flex gap="2">
              <Text>an event is captured by Ohbug and</Text>
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
              <Text>of the following happens</Text>
            </Flex>
          </Flex>
          {
            conditionsFields.map((item, index) => {
              return (
                <ThemeBox
                  alignItems="center"
                  bg="gray"
                  display="flex"
                  gap="2"
                  key={item.id}
                  mb="2"
                  px="2"
                  py="1"
                  rounded="md"
                >
                  <Flex
                    flex="1"
                    gap="2"
                  >
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
                          <Text>The issue is seen more than </Text>
                          <FormControl
                            isInvalid={!!errors.conditions?.[index]?.value}
                            w="auto"
                          >
                            <NumberInput
                              min={1}
                              size="xs"
                              variant="filled"
                              width="24"
                            >
                              <NumberInputField
                                id="interval"
                                {...register(`conditions.${index}.value`, {
                                  required: ct('thisIsRequired'),
                                  min: 1,
                                  valueAsNumber: true,
                                })}
                              />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                          <Text>times in</Text>
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
                          <Text>The issue is seen by more than </Text>
                          <FormControl
                            isInvalid={!!errors.conditions?.[index]?.value}
                            w="auto"
                          >
                            <NumberInput
                              min={1}
                              size="xs"
                              variant="filled"
                              width="24"
                            >
                              <NumberInputField
                                id="interval"
                                {...register(`conditions.${index}.value`, {
                                  required: ct('thisIsRequired'),
                                  min: 1,
                                  valueAsNumber: true,
                                })}
                              />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                          <Text>users in</Text>
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
                  </Flex>
                  <IconButton
                    aria-label="delete action"
                    icon={<RiDeleteBinLine />}
                    onClick={() => conditionsRemove(index)}
                    size="sm"
                    type="button"
                    variant="ghost"
                  />
                </ThemeBox>
              )
            })
          }
        </FormControl>
        <Menu>
          <MenuButton
            as={Button}
            size="sm"
            variant="outline"
          >
            {t('addCondition')}
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              onChange={value => handleAddCondition(value as ConditionOption['topic'])}
              value=""
            >
              {
                ConditionOptions.map(item => (
                  <MenuItemOption
                    key={item.topic}
                    value={item.topic}
                  >
                    {item.name}
                  </MenuItemOption>
                ))
              }
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Box>

      <Box>
        <FormControl>
          <FormLabel>{t('alertFilters')}</FormLabel>
          <Flex
            align="center"
            gap="2"
            mb="2"
          >
            <Badge
              textAlign="center"
              variant="solid"
              w="14"
            >
              IF
            </Badge>
            <Flex gap="2">
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
              <Text>of these filters match</Text>
            </Flex>
          </Flex>
          {
            filtersFields.map((item, index) => {
              return (
                <ThemeBox
                  alignItems="center"
                  bg="gray"
                  display="flex"
                  key={item.id}
                  mb="2"
                  px="2"
                  py="1"
                  rounded="md"
                >

                  <Flex
                    flex="1"
                    gap="2"
                  >
                    {
                      item.topic === AlertFilterTopic.IssueOccurrencesFilter && (
                        <>
                          <Text>The issue has happened at least</Text>
                          <FormControl
                            isInvalid={!!errors.filters?.[index]?.value}
                            w="auto"
                          >
                            <NumberInput
                              min={1}
                              size="xs"
                              variant="filled"
                              width="24"
                            >
                              <NumberInputField
                                id="interval"
                                {...register(`filters.${index}.value`, {
                                  required: ct('thisIsRequired'),
                                  min: 1,
                                  valueAsNumber: true,
                                })}
                              />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                          <Text>times</Text>
                        </>
                      )
                    }
                    {
                      item.topic === AlertFilterTopic.EventAttributeFilter && (
                        <>
                          <Text>The events </Text>
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
                          <Text> value </Text>
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
                  </Flex>
                  <IconButton
                    aria-label="delete action"
                    icon={<RiDeleteBinLine />}
                    onClick={() => filtersRemove(index)}
                    size="sm"
                    type="button"
                    variant="ghost"
                  />
                </ThemeBox>
              )
            })
          }
        </FormControl>
        <Menu>
          <MenuButton
            as={Button}
            size="sm"
            variant="outline"
          >
            {t('addFilter')}
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              onChange={value => handleAddFilter(value as FilterOption['topic'])}
              value=""
            >
              {
                FilterOptions.map(item => (
                  <MenuItemOption
                    key={item.topic}
                    value={item.topic}
                  >
                    {item.name}
                  </MenuItemOption>
                ))
              }
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Box>

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

      <Box>
        <FormControl isInvalid={!!errors.actions}>
          <FormLabel>{t('alertActions')}</FormLabel>
          {
            actionsFields.map((item, index) => {
              return (
                <ThemeBox
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                  key={item.id}
                  mb="2"
                  rounded="md"
                  w="full"
                >
                  <Flex
                    align="center"
                    flex="1"
                    gap="2"
                    w="full"
                  >
                    {
                      item.type === 'webhook' && (
                        <Select
                          w="72"
                          {...register(`actions.${index}.webhookType`, { required: ct('thisIsRequired') })}
                        >
                          <option value="dingtalk"><RiDingdingFill />{t('dingtalk')}</option>
                          <option value="wechatWork"><RiWechatFill />{t('wechatWork')}</option>
                          <option value="others"><RiCustomerService2Fill />{t('others')}</option>
                        </Select>
                      )
                    }
                    {
                      item.type === 'webhook' && (
                        <Tooltip label={t('webhookTooltip')}>
                          <Input
                            placeholder={t('webhookContact')}
                            variant="filled"
                            w="96"
                            {...register(`actions.${index}.at`)}
                          />
                        </Tooltip>
                      )
                    }
                    <Input
                      variant="filled"
                      w="full"
                      {...register(`actions.${index}.uri`, {
                        required: ct('thisIsRequired'),
                        pattern: {
                          value: item.type === 'email' ? /\S+@\S+\.\S+/ : /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                          message: item.type === 'email' ? ct('mustBeTheCorrectEmailAddress') : t('mustBeTheCorrectUrlAddress'),
                        },
                      })}
                      placeholder={item.type === 'email' ? t('inputEmailAddress') : t('inputWebhookURL')}
                    />
                    <IconButton
                      aria-label="delete action"
                      icon={<RiDeleteBinLine />}
                      onClick={() => actionsRemove(index)}
                      type="button"
                      variant="ghost"
                    />
                  </Flex>
                  <FormErrorMessage w="full">
                    {errors.actions && errors.actions?.[index]?.uri?.message}
                  </FormErrorMessage>
                </ThemeBox>
              )
            })
          }
        </FormControl>
        <Menu>
          <MenuButton
            as={Button}
            size="sm"
            variant="outline"
          >
            {t('addAction')}
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              onChange={value => handleAddAction(value as Action['type'])}
              value=""
            >
              {
                ActionOptions.map(item => (
                  <MenuItemOption
                    key={item}
                    value={item}
                  >
                    {item}
                  </MenuItemOption>
                ))
              }
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Box>

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

      <Box mt="6">
        <Button
          type="submit"
          w="full"
        >
          {
            alert ? t('updateAlert') : t('createAlert')
          }
        </Button>
      </Box>
    </Flex>
  )
}

export default EditAlert
