import type { FC, ReactElement, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import clsx from 'clsx'
import type { Result } from 'source-map-trace'

interface Props {
  stack: string
  source?: Result
}

const StackInfo: FC<Props> = ({ stack, source }) => {
  const [toggle, setToggle] = useState<'raw' | 'code'>('raw')

  const title = useMemo(
    () => (
      <div>
        <code className="font-semibold mx-1">{source?.parsed?.source}</code>
        <span className="m-0 mx-1 opacity-60">in</span>
        <code className="font-semibold mx-1">{source?.parsed?.name}</code>
        <span className="m-0 mx-1 opacity-60">at line</span>
        <code className="font-semibold mx-1">{source?.parsed?.line}:</code>
        <code className="font-semibold mx-1">{source?.parsed?.column}</code>
      </div>
    ),
    [source],
  )
  const content = useMemo((): ReactNode => {
    switch (toggle) {
      case 'raw':
        return typeof stack === 'string' ? stack : JSON.stringify(stack)
      case 'code':
        return (
          <div className="collapse collapse-arrow collapse-open bg-base-100 rounded-box">
            <input
              className="peer"
              type="checkbox"
            />
            <div className="collapse-title">
              {title}
            </div>
            <div className="collapse-content">
              <ol
                className="m-0 py-2 list-inside"
                start={source?.code?.[0].number}
              >
                {
                  source?.code?.map(({ code, number, highlight }): ReactElement => {
                    const classes = clsx('pl-6 leading-6', { 'text-white bg-error': highlight })
                    return (
                      <li
                        className={classes}
                        key={number}
                      >
                        <span className="pl-6">{code}</span>
                      </li>
                    )
                  })
                }
              </ol>
            </div>
          </div>
        )
      default:
        return null
    }
  }, [source, stack, toggle, title])

  return (
    <div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">{toggle}</span>
          <input
            checked={toggle === 'code'}
            className="toggle"
            onChange={e => setToggle(e.target.checked ? 'code' : 'raw')}
            type="checkbox"
          />
        </label>
      </div>

      <pre className="mt-4 whitespace-pre-wrap break-words">{content}</pre>
    </div>
  )
}

export default StackInfo
