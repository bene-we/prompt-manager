import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { PromptPreview } from './PromptPreview'
import { StepContext } from './steps/StepContext'
import { StepOutputFormat } from './steps/StepOutputFormat'
import { StepRole } from './steps/StepRole'
import { StepTask } from './steps/StepTask'

export interface PromptData {
  role: string
  context: string
  task: string
  outputFormat: string
}

const steps = [
  {
    id: 0,
    title: 'Role',
    description: 'Define who the AI should act as',
  },
  {
    id: 1,
    title: 'Context',
    description: 'Provide background information',
  },
  {
    id: 2,
    title: 'Task',
    description: 'Specify what needs to be done',
  },
  {
    id: 3,
    title: 'Output Format',
    description: 'Define the desired response structure',
  },
]

export function PromptManager() {
  const [currentStep, setCurrentStep] = useState(0)
  const [promptData, setPromptData] = useState<PromptData>({
    role: '',
    context: '',
    task: '',
    outputFormat: '',
  })
  const [copied, setCopied] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const { toast } = useToast()

  const updatePromptData = (field: keyof PromptData, value: string) => {
    setPromptData(prev => ({
      ...prev,
      [field]: value,
    }))
    // Update progress when user inputs data, but only if this step hasn't been completed yet
    if (value.trim() !== '' && !completedSteps.includes(currentStep)) {
      setProgress(prev => Math.min(prev + 25, 100))
      setCompletedSteps(prev => [...prev, currentStep])
    }
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      // Update progress when moving to next step, but only if this step hasn't been completed yet
      if (!completedSteps.includes(currentStep)) {
        setProgress(prev => Math.min(prev + 25, 100))
        setCompletedSteps(prev => [...prev, currentStep])
      }
    }
    else {
      // Reset form when reaching the end
      setCurrentStep(0)
      setProgress(0)
      setCompletedSteps([])
      setPromptData({
        role: '',
        context: '',
        task: '',
        outputFormat: '',
      })
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generatePrompt = () => {
    const parts = []

    if (promptData.role) {
      parts.push(promptData.role)
    }

    if (promptData.context) {
      parts.push(promptData.context)
    }

    if (promptData.task) {
      parts.push(promptData.task)
    }

    if (promptData.outputFormat) {
      parts.push(promptData.outputFormat)
    }

    return parts.join('\n\n')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatePrompt())
      setCopied(true)
      toast({
        title: 'Copied!',
        description: 'Prompt has been copied to clipboard',
      })
      setTimeout(() => setCopied(false), 2000)
    }
    catch {
      toast({
        title: 'Error',
        description: 'Failed to copy prompt to clipboard',
        variant: 'destructive',
      })
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepRole value={promptData.role} onChange={value => updatePromptData('role', value)} />
      case 1:
        return <StepContext value={promptData.context} onChange={value => updatePromptData('context', value)} />
      case 2:
        return <StepTask value={promptData.task} onChange={value => updatePromptData('task', value)} />
      case 3:
        return <StepOutputFormat value={promptData.outputFormat} onChange={value => updatePromptData('outputFormat', value)} />
      default:
        return null
    }
  }

  const currentStepData = steps.find(step => step.id === currentStep)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Progress Section */}
          <Card className="border-0 shadow-lg bg-card/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  Step
                  {' '}
                  {currentStep + 1}
                  {' '}
                  of 4
                </h2>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}
                  % Complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="mt-4">
                <h3 className="text-xl font-medium text-foreground">{currentStepData?.title}</h3>
                <p className="text-muted-foreground">{currentStepData?.description}</p>
              </div>
            </CardHeader>
          </Card>

          {/* Step Content */}
          <Card className="border-0 shadow-lg bg-card/70 backdrop-blur-sm">
            <CardContent className="p-6">
              {renderStep()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card className="border-0 shadow-lg bg-card/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  {currentStep === 3 ? 'Start Over' : 'Next'}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-card/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Prompt Preview</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="flex items-center gap-2"
                  disabled={!promptData.role && !promptData.context && !promptData.task && !promptData.outputFormat}
                >
                  {copied
                    ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      )
                    : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PromptPreview prompt={generatePrompt()} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
