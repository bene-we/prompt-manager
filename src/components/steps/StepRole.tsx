
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface StepRoleProps {
  value: string;
  onChange: (value: string) => void;
}

const roleExamples = [
  "Expert Data Scientist",
  "Senior Software Engineer",
  "Marketing Strategist",
  "Technical Writer",
  "UX/UI Designer",
  "Business Analyst",
];

export const StepRole = ({ value, onChange }: StepRoleProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="role" className="text-base font-medium">
          Define the Role
        </Label>
        <p className="text-sm text-gray-600 mt-1">
          Specify who the AI should act as. This sets the expertise level and perspective.
        </p>
      </div>

      <Textarea
        id="role"
        placeholder="You are a..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[120px] resize-none border-2 border-gray-200 focus:border-blue-500 transition-colors"
      />

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Quick Examples (click to use):
        </Label>
        <div className="flex flex-wrap gap-2">
          {roleExamples.map((example, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition-colors"
              onClick={() => onChange(`You are a ${example} with extensive experience in your field.`)}
            >
              {example}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
