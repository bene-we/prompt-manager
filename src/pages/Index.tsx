import { PromptManager } from '@/components/PromptManager'

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Prompt Manager
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create structured, effective prompts with our guided 4-step process.
            Perfect for AI interactions, documentation, and workflow optimization.
          </p>
        </div>
        <PromptManager />
      </div>
    </div>
  )
}

export default Index
