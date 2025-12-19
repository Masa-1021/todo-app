import { useState, useEffect } from 'react'
import './ThemeSwitcher.css'

export type ThemeType = 'modern' | 'minimal' | 'compact'

interface ThemeSwitcherProps {
  currentTheme: ThemeType
  onThemeChange: (theme: ThemeType) => void
}

const themes = [
  { id: 'modern' as ThemeType, name: 'モダン', description: 'グラデーションとアニメーション' },
  { id: 'minimal' as ThemeType, name: 'ミニマル', description: 'シンプルでクリーン' },
  { id: 'compact' as ThemeType, name: 'コンパクト', description: '高密度レイアウト' }
]

function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.theme-switcher')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="theme-switcher">
      <button
        className="theme-switcher-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="テーマを変更"
      >
        🎨 テーマ
      </button>
      
      {isOpen && (
        <div className="theme-dropdown">
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
              onClick={() => {
                onThemeChange(theme.id)
                setIsOpen(false)
              }}
            >
              <div className="theme-option-name">{theme.name}</div>
              <div className="theme-option-description">{theme.description}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ThemeSwitcher
