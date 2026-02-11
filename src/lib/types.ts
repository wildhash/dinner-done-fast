export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  aisle: AisleCategory;
  have?: boolean;
}

export type AisleCategory = 
  | "Produce" 
  | "Dairy" 
  | "Pantry" 
  | "Protein" 
  | "Spices" 
  | "Frozen" 
  | "Bakery" 
  | "Other";

export type RecipeTag = "quick" | "vegetarian" | "vegan" | "gluten-free" | "comfort" | "healthy" | "spicy";

export type ConfidenceLevel = "complete" | "needs-review";

export interface Recipe {
  id: string;
  title: string;
  servings: number;
  timeMinutes: number;
  ingredients: Ingredient[];
  steps: string[];
  tags: RecipeTag[];
  confidence: ConfidenceLevel;
  sourceUrl?: string;
  createdAt: number;
}

export interface CookedSession {
  id: string;
  recipeId: string;
  recipeTitle: string;
  photoUri?: string;
  cookedAt: number;
}

export interface GroceryList {
  recipeId: string;
  recipeTitle: string;
  items: Ingredient[];
  createdAt: number;
}

export interface AppState {
  recipes: Recipe[];
  groceryLists: GroceryList[];
  cookedSessions: CookedSession[];
  monthlyImports: number;
  monthKey: string; // "2026-02"
  isPro: boolean;
}
