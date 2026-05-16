import { Link } from 'react-router-dom'
import { useStore } from '@/store'
import NumericInput from '@/components/NumericInput'

export default function Settings() {
  const minimumAgeInMonths = useStore((state) => state.minimumAgeInMonths)
  const setMinimumAgeInMonths = useStore((state) => state.setMinimumAgeInMonths)

  return (
    <div className="flex flex-col gap-6">
      <Link to="/" className="text-violet-600 hover:underline text-sm self-start">
        &larr; Back
      </Link>

      <h1 className="text-2xl font-bold text-violet-700 tracking-wide">SETTINGS</h1>

      <div className="flex flex-col gap-2 group">
        <label
          htmlFor="min-age-input"
          className="block text-sm font-bold tracking-widest text-gray-700 group-focus-within:text-violet-700 transition-colors"
        >
          MINIMUM AGE
        </label>
        <div className="flex items-center gap-3 flex-wrap">
          <NumericInput
            id="min-age-input"
            value={minimumAgeInMonths}
            onChange={setMinimumAgeInMonths}
          />
          <span className="text-xl text-gray-900">months</span>
        </div>
      </div>
    </div>
  )
}