import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface StepTaskProps {
  value: string
  onChange: (value: string) => void
}

const taskExamples = [
  'Analyze and provide insights',
  'Create a detailed plan',
  'Write comprehensive documentation',
  'Design a solution',
  'Optimize existing process',
  'Generate creative ideas',
]

export function StepTask({ value, onChange }: StepTaskProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="task" className="text-base font-medium">
          Define the Task
        </Label>
        <p className="text-sm text-gray-600 mt-1">
          Clearly specify what you want the AI to accomplish. Be specific and actionable.
        </p>
      </div>

      <Textarea
        id="task"
        placeholder="I need you to..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="min-h-[120px] resize-none border-2 border-gray-200 focus:border-blue-500 transition-colors"
      />

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Common Task Types (click to use):
        </Label>
        <div className="flex flex-wrap gap-2">
          {taskExamples.map((example, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer hover:bg-orange-100 hover:text-orange-800 transition-colors"
              onClick={() => onChange(`Please ${example.toLowerCase()} for the given context.`)}
            >
              {example}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
