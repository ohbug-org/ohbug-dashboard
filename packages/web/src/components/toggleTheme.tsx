import { FC } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

const ToggleTheme: FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <button
        aria-label="Toggle Dark Mode"
        className="order-2 h-12 p-3 w-12 md:order-3"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        type="button"
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  )
}

export default ToggleTheme
