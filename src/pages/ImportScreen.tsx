import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ChefHat, Link2, Type, ArrowRight, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { parseRecipeFromUrl, parseRecipeFromText, getDemoRecipes } from "@/lib/recipes";
import { addRecipe, canImport } from "@/lib/storage";
import { Recipe } from "@/lib/types";

const demoLinks = [
  { label: "🍝 Chicken Pasta", hint: "TikTok", url: "https://tiktok.com/@chef/lemon-chicken-pasta" },
  { label: "🥦 Veggie Stir-Fry", hint: "YouTube", url: "https://youtube.com/watch?v=veggie-stirfry" },
  { label: "🥞 Banana Pancakes", hint: "Instagram", url: "https://instagram.com/p/banana-pancakes" },
];

export default function ImportScreen() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"url" | "text">("url");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const importAndNavigate = (recipe: Recipe) => {
    addRecipe(recipe);
    navigate(`/recipe/${recipe.id}`);
  };

  const handleGenerate = () => {
    const importCheck = canImport();
    if (!importCheck.allowed) {
      navigate("/paywall");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      let recipe: Recipe | null = null;
      try {
        recipe = mode === "url" ? parseRecipeFromUrl(input) : parseRecipeFromText(input);
      } catch {
        // parse failed
      }
      if (recipe) {
        importAndNavigate(recipe);
      } else {
        toast({
          title: "Couldn't parse that recipe",
          description: "Try a demo recipe instead.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 800);
  };

  const handleDemo = (url: string) => {
    const importCheck = canImport();
    if (!importCheck.allowed) {
      navigate("/paywall");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const recipe = parseRecipeFromUrl(url);
      if (recipe) {
        importAndNavigate(recipe);
      }
      setLoading(false);
    }, 800);
  };

  const handleUseDemoRecipe = () => {
    const importCheck = canImport();
    if (!importCheck.allowed) {
      navigate("/paywall");
      return;
    }
    const demos = getDemoRecipes();
    const pick = demos[Math.floor(Math.random() * demos.length)];
    const recipe: Recipe = { ...pick, id: crypto.randomUUID(), createdAt: Date.now() };
    importAndNavigate(recipe);
  };

  const importInfo = canImport();

  return (
    <div className="min-h-screen bg-background px-5 pt-12 pb-28">
      <div className="max-w-lg mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <ChefHat className="w-7 h-7 text-primary" />
            <h1 className="text-3xl font-serif text-foreground">CookTurn</h1>
          </div>
          <p className="text-muted-foreground text-sm">From link to dinner plan in 20 seconds.</p>
        </div>

        {/* Import counter */}
        {!importInfo.allowed ? null : (
          <div className="mb-6 flex items-center gap-2">
            <div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${Math.min((importInfo.count / importInfo.limit) * 100, 100)}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
              {importInfo.count}/{importInfo.limit} imports
            </span>
          </div>
        )}

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode("url")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "url"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            <Link2 className="w-4 h-4" /> Paste Link
          </button>
          <button
            onClick={() => setMode("text")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "text"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            <Type className="w-4 h-4" /> Type Recipe
          </button>
        </div>

        {/* Input */}
        <div className="mb-6">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "url"
                ? "Paste a TikTok, YouTube, Instagram, or blog URL…"
                : "Describe a recipe — e.g. \"quick chicken pasta with lemon\""
            }
            className="min-h-[100px] bg-card border-border text-foreground placeholder:text-muted-foreground resize-none rounded-xl text-base"
          />
        </div>

        {/* Generate CTA */}
        <Button
          onClick={handleGenerate}
          disabled={!input.trim() || loading}
          className="w-full h-14 rounded-xl text-base font-semibold shadow-lg"
          size="lg"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 animate-pulse-soft" /> Generating…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Generate Plan <ArrowRight className="w-5 h-5" />
            </span>
          )}
        </Button>

        {/* Use Demo Recipe */}
        <Button
          onClick={handleUseDemoRecipe}
          variant="outline"
          disabled={loading}
          className="w-full h-12 rounded-xl text-sm font-medium mt-3"
        >
          <Utensils className="w-4 h-4 mr-2" /> Use Demo Recipe
        </Button>

        {/* Demo Recipes */}
        <div className="mt-10">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Try a demo recipe
          </p>
          <div className="flex flex-col gap-2">
            {demoLinks.map((demo) => (
              <button
                key={demo.url}
                onClick={() => handleDemo(demo.url)}
                disabled={loading}
                className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:border-primary/40 transition-all group text-left"
              >
                <div>
                  <span className="text-sm font-medium text-foreground">{demo.label}</span>
                  <span className="text-xs text-muted-foreground ml-2">via {demo.hint}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
