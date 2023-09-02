'use client'

import type { ReactElement } from 'react'
import { useMemo } from 'react'
import type { Result } from 'source-map-trace'
import { cn } from '~/libs/utils'

interface Props {
  source?: Result
}

export default function StackInfo({ source }: Props) {
  const title = useMemo(
    () => (
      <div className='space-x-1'>
        <code className='font-semibold'>
          {source?.parsed?.source}
        </code>
        <span className='inline-block m-0 opacity-60'>
          in
        </span>
        <code className='font-semibold'>
          {source?.parsed?.name}
        </code>
        <span className='inline-block m-0 opacity-60'>
          at line
        </span>
        <code className='font-semibold'>
          {source?.parsed?.line}:
        </code>
        <code className='font-semibold'>
          {source?.parsed?.column}
        </code>
      </div>
    ),
    [source],
  )

  return (
    <pre className='mt-4 break-word'>
      <div>{title}</div>
      <ol
        className='list-inside list-decimal m-0 py-2'
        start={source?.code?.[0].number}
      >
        {
          source?.code?.map(({ code, number, highlight }): ReactElement => {
            return (
              <li
                className={cn('pl-6', highlight ? 'bg-red-500' : 'bg-inherit', highlight ? 'text-white' : 'text-inherit')}
                key={number}
              >
                <span>{code}</span>
              </li>
            )
          })
        }
      </ol>
    </pre>
  )
}
