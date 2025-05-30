import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  RefreshCw,
} from 'lucide-react'
import { useRef, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { PromptPreview } from './PromptPreview'
import { StepContext } from './steps/StepContext'
import { StepOutputFormat } from './steps/StepOutputFormat'
import { StepRole } from './steps/StepRole'
import { StepTask } from './steps/StepTask'

enum PromptStep {
  Role = 0,
  Context = 1,
  Task = 2,
  OutputFormat = 3,
}

export interface PromptData {
  [PromptStep.Role]: string
  [PromptStep.Context]: string
  [PromptStep.Task]: string
  [PromptStep.OutputFormat]: string
}

const steps = [
  {
    id: PromptStep.Role,
    title: 'Role',
    description: 'Define who the AI should act as',
  },
  {
    id: PromptStep.Context,
    title: 'Context',
    description: 'Provide background information',
  },
  {
    id: PromptStep.Task,
    title: 'Task',
    description: 'Specify what needs to be done',
  },
  {
    id: PromptStep.OutputFormat,
    title: 'Output Format',
    description: 'Define the desired response structure',
  },
]

export function PromptManager() {
  const FIRST_STEP = steps[0].id
  const LAST_STEP = steps[steps.length - 1].id

  const [currentStep, setCurrentStep] = useState<PromptStep>(FIRST_STEP)
  const [promptData, setPromptData] = useState<PromptData>({
    [PromptStep.Role]: '',
    [PromptStep.Context]: '',
    [PromptStep.Task]: '',
    [PromptStep.OutputFormat]: '',
  })
  const [copied, setCopied] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<PromptStep[]>([])
  const { toast } = useToast()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const updatePromptData = (step: PromptStep, value: string) => {
    setPromptData(prev => ({
      ...prev,
      [step]: value,
    }))
    // Update progress when user inputs data, but only if this step hasn't been completed yet
    if (value.trim() !== '' && !completedSteps.includes(step)) {
      setProgress(prev => Math.min(prev + 25, 100))
      setCompletedSteps(prev => [...prev, step])
    }

    if (value.trim() === '') {
      setProgress(prev => Math.max(prev - 25, 0))
      setCompletedSteps(prev => prev.filter(s => s !== step))
    }
  }

  const nextStep = () => {
    if (currentStep < LAST_STEP) {
      setCurrentStep(currentStep + 1)
      // Only update progress if this step has content and hasn't been completed yet
      if (promptData[currentStep].trim() && !completedSteps.includes(currentStep)) {
        setProgress(prev => Math.min(prev + 25, 100))
        setCompletedSteps(prev => [...prev, currentStep])
      }
    }
    // If we're on the last step and the output format is empty, focus the textarea
    else if (currentStep === LAST_STEP && !promptData[LAST_STEP].trim()) {
      textareaRef.current?.focus()
    }
  }

  const prevStep = () => {
    if (currentStep > FIRST_STEP) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generatePrompt = () => {
    const parts = []

    if (promptData[PromptStep.Role]) {
      parts.push(promptData[PromptStep.Role])
    }

    if (promptData[PromptStep.Context]) {
      parts.push(promptData[PromptStep.Context])
    }

    if (promptData[PromptStep.Task]) {
      parts.push(promptData[PromptStep.Task])
    }

    if (promptData[PromptStep.OutputFormat]) {
      parts.push(promptData[PromptStep.OutputFormat])
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

  const resetForm = () => {
    setCurrentStep(PromptStep.Role)
    setPromptData({
      [PromptStep.Role]: '',
      [PromptStep.Context]: '',
      [PromptStep.Task]: '',
      [PromptStep.OutputFormat]: '',
    })
    setProgress(0)
    setCompletedSteps([])
  }

  const renderStep = () => {
    switch (currentStep) {
      case PromptStep.Role:
        return <StepRole value={promptData[PromptStep.Role]} onChange={value => updatePromptData(PromptStep.Role, value)} />
      case PromptStep.Context:
        return <StepContext value={promptData[PromptStep.Context]} onChange={value => updatePromptData(PromptStep.Context, value)} />
      case PromptStep.Task:
        return <StepTask value={promptData[PromptStep.Task]} onChange={value => updatePromptData(PromptStep.Task, value)} />
      case PromptStep.OutputFormat:
        return <StepOutputFormat value={promptData[PromptStep.OutputFormat]} onChange={value => updatePromptData(PromptStep.OutputFormat, value)} ref={textareaRef} />
      default:
        return null
    }
  }

  const currentStepData = steps.find(step => step.id === currentStep)
  const isDone = currentStep === LAST_STEP && progress === 100

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
                  disabled={currentStep === PromptStep.Role}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  onClick={nextStep}
                  className="flex items-center gap-2"
                  disabled={currentStep === PromptStep.OutputFormat}
                >
                  {isDone ? 'Done!' : 'Next'}
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
                  disabled={!promptData[PromptStep.Role] && !promptData[PromptStep.Context] && !promptData[PromptStep.Task] && !promptData[PromptStep.OutputFormat]}
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

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={progress === 100 ? 'done' : 'outline'}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Start Over
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will reset all your inputs and start from the beginning. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={resetForm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Start Over
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
