
import { PromptManager } from "@/components/PromptManager";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Prompt Manager
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create structured, effective prompts with our guided 4-step process. 
            Perfect for AI interactions, documentation, and workflow optimization.
          </p>
        </div>
        <PromptManager />
      </div>
    </div>
  );
};

export default Index;
