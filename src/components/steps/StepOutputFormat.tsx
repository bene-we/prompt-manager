
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface StepOutputFormatProps {
  value: string;
  onChange: (value: string) => void;
}

const formatExamples = [
  "Bullet points with explanations",
  "Numbered step-by-step guide",
  "Executive summary format",
  "Technical documentation style",
  "Creative narrative format",
  "Structured JSON format",
];

export const StepOutputFormat = ({ value, onChange }: StepOutputFormatProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="outputFormat" className="text-base font-medium">
          Specify Output Format
        </Label>
        <p className="text-sm text-gray-600 mt-1">
          Define how you want the response structured and formatted for optimal usability.
        </p>
      </div>

      <Textarea
        id="outputFormat"
        placeholder="Please format your response as..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[120px] resize-none border-2 border-gray-200 focus:border-blue-500 transition-colors"
      />

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Popular Formats (click to use):
        </Label>
        <div className="flex flex-wrap gap-2">
          {formatExamples.map((example, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer hover:bg-purple-100 hover:text-purple-800 transition-colors"
              onClick={() => onChange(`Please format your response as ${example.toLowerCase()}.`)}
            >
              {example}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
