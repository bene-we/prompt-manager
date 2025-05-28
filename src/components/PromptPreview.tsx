
import { ScrollArea } from "@/components/ui/scroll-area";

interface PromptPreviewProps {
  prompt: string;
}

export const PromptPreview = ({ prompt }: PromptPreviewProps) => {
  const sections = prompt.split('\n\n').filter(section => section.trim());

  return (
    <ScrollArea className="h-[400px] w-full">
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        {sections.length > 1 ? (
          sections.map((section, index) => {
            const isTag = section.includes('<') && section.includes('>');
            const content = section.split('\n');
            const tag = content[0];
            const body = content.slice(1).join('\n');

            return (
              <div key={index} className="space-y-2">
                {isTag ? (
                  <>
                    <div className="text-blue-600 font-mono text-sm font-semibold">
                      {tag}
                    </div>
                    {body && (
                      <div className="text-gray-800 whitespace-pre-wrap pl-4 border-l-2 border-blue-200">
                        {body}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-gray-800 whitespace-pre-wrap">
                    {section}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-gray-500 italic text-center py-8">
            Your prompt will appear here as you fill out the form...
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
