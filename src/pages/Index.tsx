
import { PromptManager } from '@/components/PromptManager'

function Index() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Compact Header */}
      <header className="flex items-center justify-center border-b bg-card/50 backdrop-blur-sm px-4 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">P</span>
          </div>
          <h1 className="text-xl font-bold text-primary">
            Prompt Manager
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create structured, effective prompts with our guided 4-step process.
              Perfect for AI interactions, documentation, and workflow optimization.
            </p>
          </div>
          <PromptManager />
        </div>
      </main>
    </div>
  )
}

export default Index
