import { ExternalLink, Clock, Star } from "lucide-react";
import { ATKRecipe } from "@/lib/atk-recipes";
import { Button } from "@/components/ui/button";

interface ATKSuggestionsProps {
  suggestions: ATKRecipe[];
  onUse?: (recipe: ATKRecipe) => void;
}

export default function ATKSuggestions({ suggestions, onUse }: ATKSuggestionsProps) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="px-5 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-5 h-5 text-warning" />
        <h2 className="text-lg font-serif text-foreground">America's Test Kitchen Matches</h2>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        We found similar tested recipes from America's Test Kitchen
      </p>
      
      <div className="space-y-3">
        {suggestions.map((atkRecipe) => (
          <div
            key={atkRecipe.id}
            className="bg-card rounded-xl border border-border p-4 hover:border-warning/40 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-warning" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {atkRecipe.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {atkRecipe.description}
                </p>
                
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {atkRecipe.timeMinutes} min
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {atkRecipe.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded text-xs bg-warning/10 text-warning-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <a
                    href={atkRecipe.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    View recipe <ExternalLink className="w-3 h-3" />
                  </a>
                  {onUse && (
                    <button
                      onClick={() => onUse(atkRecipe)}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Use this instead
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
