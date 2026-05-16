import { useRef, useLayoutEffect, useState, useCallback } from 'react'

interface NumericInputProps {
  value: number
  onChange: (value: number) => void
  id?: string
  placeholder?: string
  className?: string
}

const MIN_WIDTH = 72
const WIDTH_BUFFER = 44

function formatWithSpaces(num: number): string {
  if (num === 0) return ''
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0')
}

export default function NumericInput({
  value,
  onChange,
  id,
  placeholder = '0',
  className = '',
}: NumericInputProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const [width, setWidth] = useState(MIN_WIDTH)

  const formatted = formatWithSpaces(value)

  useLayoutEffect(() => {
    if (spanRef.current) {
      const measured = spanRef.current.offsetWidth + WIDTH_BUFFER
      setWidth(Math.max(MIN_WIDTH, measured))
    }
  }, [formatted, placeholder])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = e.target.value.replace(/\D/g, '')
      onChange(digits ? Number(digits) : 0)
    },
    [onChange],
  )

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End',
    ]
    if (allowed.includes(e.key)) return
    if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase())) return
    if (!/^\d$/.test(e.key)) e.preventDefault()
  }, [])

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '')
      if (pasted) onChange(Number(pasted))
    },
    [onChange],
  )

  return (
    <span className="relative inline-block">
      <span
        ref={spanRef}
        aria-hidden="true"
        className="absolute invisible whitespace-pre text-2xl font-medium pointer-events-none"
      >
        {formatted || placeholder}
      </span>

      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={formatted}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder={placeholder}
        style={{ width }}
        className={[
          'border-2 border-gray-300 rounded-lg px-4 py-1.5',
          'text-2xl font-medium text-gray-900',
          'outline-none bg-white',
          'transition-colors duration-150',
          'hover:border-gray-400',
          'focus:border-violet-600',
          'placeholder:text-gray-400 placeholder:font-normal',
          className,
        ].join(' ')}
      />
    </span>
  )
}