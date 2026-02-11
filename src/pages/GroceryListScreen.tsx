import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Share2, ChefHat, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadState, addGroceryList } from "@/lib/storage";
import { Ingredient, AisleCategory, Recipe } from "@/lib/types";
import { scaleIngredients } from "@/lib/recipes";

const aisleOrder: AisleCategory[] = ["Produce", "Protein", "Dairy", "Pantry", "Spices", "Bakery", "Frozen", "Other"];
const aisleEmoji: Record<AisleCategory, string> = {
  Produce: "🥬", Protein: "🥩", Dairy: "🧀", Pantry: "🫙",
  Spices: "🧂", Bakery: "🍞", Frozen: "🧊", Other: "📦",
};

export default function GroceryListScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [items, setItems] = useState<(Ingredient & { have: boolean })[]>([]);

  useEffect(() => {
    const state = loadState();
    const found = state.recipes.find((r) => r.id === id);
    if (found) {
      setRecipe(found);
      setItems(found.ingredients.map((i) => ({ ...i, have: false })));
      addGroceryList({ recipeId: found.id, recipeTitle: found.title, items: found.ingredients, createdAt: Date.now() });
    }
  }, [id]);

  const toggleHave = (index: number) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, have: !item.have } : item)));
  };

  const needed = items.filter((i) => !i.have).length;

  const groupedByAisle = aisleOrder
    .map((aisle) => ({
      aisle,
      items: items.map((item, idx) => ({ ...item, idx })).filter((item) => item.aisle === aisle),
    }))
    .filter((g) => g.items.length > 0);

  const handleShare = async () => {
    if (!recipe) return;
    const text = `🛒 Grocery List for ${recipe.title}\n\n` +
      items.filter(i => !i.have).map(i => `• ${i.name} — ${i.amount} ${i.unit}`).join("\n");
    
    if (navigator.share) {
      await navigator.share({ title: `Grocery List — ${recipe.title}`, text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="px-5 pt-6 pb-4">
        <button onClick={() => navigate(`/recipe/${id}`)} className="flex items-center gap-1 text-muted-foreground mb-4 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to recipe
        </button>

        <div className="animate-slide-up">
          <h1 className="text-2xl font-serif text-foreground mb-1">Grocery List</h1>
          <p className="text-sm text-muted-foreground mb-2">{recipe.title}</p>
          <div className="flex items-center gap-2 mb-6">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{needed} items needed</span>
          </div>
        </div>
      </div>

      {/* Aisle groups */}
      <div className="px-5 space-y-5 mb-8">
        {groupedByAisle.map((group) => (
          <div key={group.aisle}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>{aisleEmoji[group.aisle]}</span> {group.aisle}
            </h3>
            <div className="bg-card rounded-xl border border-border divide-y divide-border">
              {group.items.map((item) => (
                <button
                  key={item.idx}
                  onClick={() => toggleHave(item.idx)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left transition-all"
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      item.have ? "bg-success border-success" : "border-border"
                    }`}
                  >
                    {item.have && <Check className="w-3.5 h-3.5 text-success-foreground" />}
                  </div>
                  <span className={`text-sm flex-1 ${item.have ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {item.name}
                  </span>
                  <span className={`text-xs font-medium ${item.have ? "text-muted-foreground/50" : "text-muted-foreground"}`}>
                    {item.amount} {item.unit}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="px-5 space-y-3">
        <Button onClick={handleShare} variant="outline" className="w-full h-12 rounded-xl text-sm font-medium">
          <Share2 className="w-4 h-4 mr-2" /> Share List
        </Button>
        <Button
          onClick={() => navigate(`/cook/${id}`)}
          className="w-full h-14 rounded-xl text-base font-semibold shadow-lg"
          size="lg"
        >
          <ChefHat className="w-5 h-5 mr-2" /> Start Cooking
        </Button>
      </div>
    </div>
  );
}
