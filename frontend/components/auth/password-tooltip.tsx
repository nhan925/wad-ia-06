import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function PasswordTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
          >
            i
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-xs">
          <div className="space-y-1 text-xs">
            <p className="font-semibold">Password must contain:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>At least 8 characters</li>
              <li>1 uppercase letter (A-Z)</li>
              <li>1 lowercase letter (a-z)</li>
              <li>1 number (0-9)</li>
              <li>1 special character (@$!%*?&)</li>
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
