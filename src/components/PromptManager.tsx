
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import { StepRole } from "./steps/StepRole";
import { StepContext } from "./steps/StepContext";
import { StepTask } from "./steps/StepTask";
import { StepOutputFormat } from "./steps/StepOutputFormat";
import { PromptPreview } from "./PromptPreview";
import { useToast } from "@/hooks/use-toast";

export interface PromptData {
  role: string;
  context: string;
  task: string;
  outputFormat: string;
}

const steps = [
  { id: 1, title: "Role", description: "Define who the AI should act as" },
  { id: 2, title: "Context", description: "Provide background information" },
  { id: 3, title: "Task", description: "Specify what needs to be done" },
  { id: 4, title: "Output Format", description: "Define the desired response structure" },
];

export const PromptManager = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [promptData, setPromptData] = useState<PromptData>({
    role: "",
    context: "",
    task: "",
    outputFormat: "",
  });
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const updatePromptData = (field: keyof PromptData, value: string) => {
    setPromptData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generatePrompt = () => {
    const prompt = `<role>
${promptData.role}
</role>

<context>
${promptData.context}
</context>

<task>
${promptData.task}
</task>

<output_format>
${promptData.outputFormat}
</output_format>`;

    return prompt;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatePrompt());
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Prompt has been copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy prompt to clipboard",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepRole value={promptData.role} onChange={(value) => updatePromptData("role", value)} />;
      case 2:
        return <StepContext value={promptData.context} onChange={(value) => updatePromptData("context", value)} />;
      case 3:
        return <StepTask value={promptData.task} onChange={(value) => updatePromptData("task", value)} />;
      case 4:
        return <StepOutputFormat value={promptData.outputFormat} onChange={(value) => updatePromptData("outputFormat", value)} />;
      default:
        return null;
    }
  };

  const currentStepData = steps.find(step => step.id === currentStep);
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Progress Section */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Step {currentStep} of {steps.length}
                </h2>
                <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="mt-4">
                <h3 className="text-xl font-medium text-gray-900">{currentStepData?.title}</h3>
                <p className="text-gray-600">{currentStepData?.description}</p>
              </div>
            </CardHeader>
          </Card>

          {/* Step Content */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              {renderStep()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={currentStep === 4}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
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
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
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
  );
};
