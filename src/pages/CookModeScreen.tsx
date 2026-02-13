import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Camera, ChevronRight, ChevronLeft, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadState, addCookedSession } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { Recipe } from "@/lib/types";

export default function CookModeScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [finished, setFinished] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const state = loadState();
    const found = state.recipes.find((r) => r.id === id);
    if (found) setRecipe(found);
  }, [id]);

  const toggleStep = (i: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const handleFinish = () => {
    if (!recipe) return;

    // Enforce history cap for free users
    const state = loadState();
    if (!state.isPro && state.cookedSessions.length >= 3) {
      toast({
        title: "History full",
        description: "Upgrade to Pro for unlimited cooking history.",
      });
      navigate("/paywall");
      return;
    }

    addCookedSession({
      id: crypto.randomUUID(),
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      photoUri: photoUri || undefined,
      cookedAt: Date.now(),
    });
    setFinished(true);
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhotoUri(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8 text-center animate-scale-in">
        <PartyPopper className="w-16 h-16 text-primary mb-4" />
        <h1 className="text-3xl font-serif text-foreground mb-2">Well done!</h1>
        <p className="text-muted-foreground mb-8">
          {recipe.title} has been saved to your cooking history.
        </p>
        {photoUri && (
          <img src={photoUri} alt="Cooked dish" className="w-48 h-48 rounded-2xl object-cover mb-6 shadow-lg" />
        )}
        <Button onClick={() => navigate("/history")} className="w-full max-w-xs h-12 rounded-xl font-semibold">
          View History
        </Button>
        <button onClick={() => navigate("/")} className="mt-3 text-sm text-muted-foreground">
          Back to home
        </button>
      </div>
    );
  }

  const totalSteps = recipe.steps.length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="px-5 pt-6 pb-3 flex items-center justify-between">
        <button onClick={() => navigate(`/grocery/${id}`)} className="flex items-center gap-1 text-muted-foreground text-sm">
          <ArrowLeft className="w-4 h-4" /> Exit
        </button>
        <span className="text-xs font-medium text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>

      {/* Progress bar */}
      <div className="px-5 mb-6">
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-5 flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="w-full animate-fade-in" key={currentStep}>
            <div className="mb-4">
              <span className="text-5xl font-serif text-primary/20">{currentStep + 1}</span>
            </div>
            <p className="text-lg text-foreground leading-relaxed">{recipe.steps[currentStep]}</p>
          </div>
        </div>

        {/* Step complete toggle */}
        <button
          onClick={() => toggleStep(currentStep)}
          className={`flex items-center gap-3 w-full p-4 rounded-xl border transition-all mb-4 ${
            completedSteps.has(currentStep)
              ? "bg-success/10 border-success/30"
              : "bg-card border-border"
          }`}
        >
          <div
            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
              completedSteps.has(currentStep) ? "bg-success border-success" : "border-border"
            }`}
          >
            {completedSteps.has(currentStep) && <Check className="w-4 h-4 text-success-foreground" />}
          </div>
          <span className="text-sm font-medium text-foreground">
            {completedSteps.has(currentStep) ? "Step completed" : "Mark as done"}
          </span>
        </button>
      </div>

      {/* Navigation */}
      <div className="px-5 pb-8 pt-2 flex gap-3">
        <Button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          variant="outline"
          className="h-12 rounded-xl flex-1"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Prev
        </Button>

        {currentStep < totalSteps - 1 ? (
          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="h-12 rounded-xl flex-1"
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <div className="flex-1 flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handlePhotoCapture}
            />
            {!photoUri && (
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="h-12 rounded-xl w-full"
              >
                <Camera className="w-4 h-4 mr-2" /> Add Photo
              </Button>
            )}
            {photoUri && (
              <div className="flex items-center gap-2 mb-1">
                <img src={photoUri} alt="Preview" className="w-10 h-10 rounded-lg object-cover" />
                <span className="text-xs text-success font-medium">Photo added!</span>
              </div>
            )}
            <Button
              onClick={handleFinish}
              className="h-12 rounded-xl w-full font-semibold"
            >
              <PartyPopper className="w-4 h-4 mr-2" /> Finish Cooking
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
