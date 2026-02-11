import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingCart, ArrowLeft, Clock, Users, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { loadState } from "@/lib/storage";
import { scaleIngredients } from "@/lib/recipes";
import { Recipe, Ingredient } from "@/lib/types";

const tagColors: Record<string, string> = {
  quick: "bg-success/15 text-success",
  vegetarian: "bg-accent/15 text-accent",
  vegan: "bg-accent/15 text-accent",
  healthy: "bg-success/15 text-success",
  comfort: "bg-warning/15 text-warning-foreground",
  spicy: "bg-destructive/15 text-destructive",
  "gluten-free": "bg-primary/15 text-primary",
};

export default function RecipeCardScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [servings, setServings] = useState(4);
  const [scaledIngredients, setScaledIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const state = loadState();
    const found = state.recipes.find((r) => r.id === id);
    if (found) {
      setRecipe(found);
      setServings(found.servings);
      setScaledIngredients(found.ingredients);
    }
  }, [id]);

  useEffect(() => {
    if (recipe) {
      setScaledIngredients(scaleIngredients(recipe.ingredients, recipe.servings, servings));
    }
  }, [servings, recipe]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-muted-foreground mb-4 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="animate-slide-up">
          {/* Confidence Badge */}
          <div className="flex items-center gap-2 mb-2">
            {recipe.confidence === "complete" ? (
              <span className="flex items-center gap-1 text-xs font-medium text-success">
                <CheckCircle2 className="w-3.5 h-3.5" /> Complete
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-medium text-warning">
                <AlertTriangle className="w-3.5 h-3.5" /> Needs review
              </span>
            )}
          </div>

          <h1 className="text-2xl font-serif text-foreground mb-3">{recipe.title}</h1>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-4">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" /> {recipe.timeMinutes} min
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" /> {recipe.servings} servings
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${tagColors[tag] || "bg-secondary text-secondary-foreground"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Servings adjuster */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between bg-card rounded-xl border border-border p-4">
          <span className="text-sm font-medium text-foreground">Servings</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setServings(Math.max(1, servings - 1))}
              className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-semibold text-foreground w-6 text-center">{servings}</span>
            <button
              onClick={() => setServings(servings + 1)}
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="px-5 mb-6">
        <h2 className="text-lg font-serif text-foreground mb-3">Ingredients</h2>
        <div className="bg-card rounded-xl border border-border divide-y divide-border">
          {scaledIngredients.map((ing, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-foreground">{ing.name}</span>
              <span className="text-sm text-muted-foreground font-medium">
                {ing.amount} {ing.unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="px-5 mb-8">
        <h2 className="text-lg font-serif text-foreground mb-3">Steps</h2>
        <div className="space-y-3">
          {recipe.steps.map((step, i) => (
            <div key={i} className="flex gap-3 p-4 bg-card rounded-xl border border-border">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm text-foreground leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5">
        <Button
          onClick={() => navigate(`/grocery/${recipe.id}`)}
          className="w-full h-14 rounded-xl text-base font-semibold shadow-lg"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Create Grocery List
        </Button>
      </div>
    </div>
  );
}
