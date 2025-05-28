import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface StepContextProps {
  value: string
  onChange: (value: string) => void
}

const contextExamples = [
  'Working on a startup project',
  'Large enterprise environment',
  'Educational content creation',
  'Personal productivity improvement',
  'Team collaboration project',
  'Client presentation',
]

export function StepContext({ value, onChange }: StepContextProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="context" className="text-base font-medium">
          Provide Context
        </Label>
        <p className="text-sm text-gray-600 mt-1">
          Give background information, constraints, and relevant details that will help shape the response.
        </p>
      </div>

      <Textarea
        id="context"
        placeholder="The context is..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="min-h-[120px] resize-none border-2 border-gray-200 focus:border-blue-500 transition-colors"
      />

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Context Categories (click to add):
        </Label>
        <div className="flex flex-wrap gap-2">
          {contextExamples.map((example, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer hover:bg-green-100 hover:text-green-800 transition-colors"
              onClick={() => onChange(value ? `${value}\n\n${example}` : example)}
            >
              {example}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
