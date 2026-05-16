import { Link, useParams } from 'react-router-dom'
import { useStore } from '@/store'
import NumericInput from '@/components/NumericInput'

export default function PersonEdit() {
  const { id } = useParams<{ id: string }>()
  const person = useStore((state) => state.people.find((p) => p.id === Number(id)))
  const updatePersonAge = useStore((state) => state.updatePersonAge)

  if (!person) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-gray-600">Person not found</p>
        <Link to="/" className="text-violet-600 hover:underline text-sm">
          &larr; Back to list
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <Link to="/" className="text-violet-600 hover:underline text-sm self-start">
        &larr; Back
      </Link>

      <div className="flex items-center gap-5">
        <img
          src="/front-task/img.png"
          alt={person.name}
          className="w-20 h-20 rounded-full border-[3px] border-violet-600 object-cover shrink-0"
        />
        <div className="flex flex-col gap-2 min-w-0 flex-1 group">
          <label
            htmlFor="hours-input"
            className="block text-sm font-bold tracking-widest text-gray-700 group-focus-within:text-violet-700 transition-colors"
          >
            {person.name.toUpperCase()} IS
          </label>
          <div className="flex items-center gap-3 flex-wrap">
            <NumericInput
              id="hours-input"
              value={person.ageInHours}
              onChange={(val) => updatePersonAge(person.id, val)}
              placeholder="7"
            />
            <span className="text-xl text-gray-900">hours old</span>
          </div>
        </div>
      </div>
    </div>
  )
}