import { ScrollArea } from '@/components/ui/scroll-area'

interface PromptPreviewProps { prompt: string }

export function PromptPreview({ prompt }: PromptPreviewProps) {
  const sections = prompt.split('\n\n').filter(section => section.trim())

  return (
    <ScrollArea className="h-[400px] w-full">
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        {sections.length > 0
          ? (
              sections.map((section, index) => (
                <div key={index} className="text-gray-800 whitespace-pre-wrap">
                  {section}
                </div>
              ))
            )
          : (
              <div className="text-gray-500 italic text-center py-8">
                Your prompt will appear here as you fill out the form...
              </div>
            )}
      </div>
    </ScrollArea>
  )
}
