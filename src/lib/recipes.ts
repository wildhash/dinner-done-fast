import { Recipe, Ingredient } from "./types";

const demoRecipes: Record<string, Recipe> = {
  "demo-chicken-pasta": {
    id: "demo-chicken-pasta",
    title: "Creamy Lemon Chicken Pasta",
    servings: 4,
    timeMinutes: 25,
    confidence: "complete",
    tags: ["quick", "comfort"],
    sourceUrl: "https://example.com/chicken-pasta",
    createdAt: Date.now(),
    ingredients: [
      { name: "Penne pasta", amount: 400, unit: "g", aisle: "Pantry" },
      { name: "Chicken breast", amount: 500, unit: "g", aisle: "Protein" },
      { name: "Heavy cream", amount: 240, unit: "ml", aisle: "Dairy" },
      { name: "Parmesan cheese", amount: 80, unit: "g", aisle: "Dairy" },
      { name: "Lemon", amount: 2, unit: "whole", aisle: "Produce" },
      { name: "Garlic cloves", amount: 4, unit: "whole", aisle: "Produce" },
      { name: "Olive oil", amount: 2, unit: "tbsp", aisle: "Pantry" },
      { name: "Fresh basil", amount: 1, unit: "bunch", aisle: "Produce" },
      { name: "Salt", amount: 1, unit: "tsp", aisle: "Spices" },
      { name: "Black pepper", amount: 0.5, unit: "tsp", aisle: "Spices" },
    ],
    steps: [
      "Cook penne in salted boiling water until al dente. Reserve 1 cup pasta water, then drain.",
      "Season chicken breast with salt and pepper. Heat olive oil in a large skillet over medium-high heat. Cook chicken 6-7 minutes per side until golden. Remove and slice.",
      "In the same skillet, sauté minced garlic for 30 seconds until fragrant.",
      "Add heavy cream and lemon juice. Simmer for 2-3 minutes, stirring occasionally.",
      "Add Parmesan and stir until melted and smooth. Add pasta water if sauce is too thick.",
      "Toss in pasta and sliced chicken. Garnish with fresh basil and lemon zest. Serve immediately.",
    ],
  },
  "demo-veggie-stir-fry": {
    id: "demo-veggie-stir-fry",
    title: "Spicy Sesame Vegetable Stir-Fry",
    servings: 2,
    timeMinutes: 15,
    confidence: "complete",
    tags: ["quick", "vegetarian", "healthy", "spicy"],
    sourceUrl: "https://example.com/veggie-stir-fry",
    createdAt: Date.now(),
    ingredients: [
      { name: "Jasmine rice", amount: 200, unit: "g", aisle: "Pantry" },
      { name: "Broccoli florets", amount: 200, unit: "g", aisle: "Produce" },
      { name: "Red bell pepper", amount: 1, unit: "whole", aisle: "Produce" },
      { name: "Snap peas", amount: 150, unit: "g", aisle: "Produce" },
      { name: "Carrots", amount: 2, unit: "whole", aisle: "Produce" },
      { name: "Soy sauce", amount: 3, unit: "tbsp", aisle: "Pantry" },
      { name: "Sesame oil", amount: 2, unit: "tbsp", aisle: "Pantry" },
      { name: "Sriracha", amount: 1, unit: "tbsp", aisle: "Pantry" },
      { name: "Sesame seeds", amount: 1, unit: "tbsp", aisle: "Spices" },
      { name: "Green onions", amount: 3, unit: "whole", aisle: "Produce" },
    ],
    steps: [
      "Cook jasmine rice according to package directions.",
      "Slice bell pepper, julienne carrots, and trim snap peas.",
      "Heat sesame oil in a wok or large skillet over high heat.",
      "Add broccoli and carrots first — stir-fry 2 minutes.",
      "Add bell pepper and snap peas. Stir-fry another 2 minutes.",
      "Pour in soy sauce and sriracha. Toss to coat evenly.",
      "Serve over rice. Top with sesame seeds and sliced green onions.",
    ],
  },
  "demo-banana-pancakes": {
    id: "demo-banana-pancakes",
    title: "Fluffy Banana Oat Pancakes",
    servings: 3,
    timeMinutes: 20,
    confidence: "complete",
    tags: ["quick", "vegetarian", "healthy"],
    sourceUrl: "https://example.com/banana-pancakes",
    createdAt: Date.now(),
    ingredients: [
      { name: "Ripe bananas", amount: 2, unit: "whole", aisle: "Produce" },
      { name: "Rolled oats", amount: 150, unit: "g", aisle: "Pantry" },
      { name: "Eggs", amount: 2, unit: "whole", aisle: "Dairy" },
      { name: "Greek yogurt", amount: 60, unit: "g", aisle: "Dairy" },
      { name: "Baking powder", amount: 1, unit: "tsp", aisle: "Pantry" },
      { name: "Vanilla extract", amount: 1, unit: "tsp", aisle: "Pantry" },
      { name: "Cinnamon", amount: 0.5, unit: "tsp", aisle: "Spices" },
      { name: "Maple syrup", amount: 2, unit: "tbsp", aisle: "Pantry" },
      { name: "Butter", amount: 1, unit: "tbsp", aisle: "Dairy" },
      { name: "Fresh berries", amount: 100, unit: "g", aisle: "Produce" },
    ],
    steps: [
      "Blend oats in a blender until they form a flour-like consistency.",
      "Add bananas, eggs, yogurt, baking powder, vanilla, and cinnamon. Blend until smooth.",
      "Heat a non-stick pan over medium heat. Add a small pat of butter.",
      "Pour ¼ cup batter per pancake. Cook until bubbles form on the surface, about 2 minutes.",
      "Flip and cook another 1-2 minutes until golden brown.",
      "Stack pancakes and top with fresh berries, a drizzle of maple syrup, and extra yogurt if desired.",
    ],
  },
};

const DEMO_URLS: Record<string, string> = {
  "tiktok.com": "demo-chicken-pasta",
  "youtube.com": "demo-veggie-stir-fry",
  "instagram.com": "demo-banana-pancakes",
};

export function parseRecipeFromUrl(url: string): Recipe | null {
  const lower = url.toLowerCase();
  for (const [domain, id] of Object.entries(DEMO_URLS)) {
    if (lower.includes(domain)) {
      return { ...demoRecipes[id], id: crypto.randomUUID(), createdAt: Date.now() };
    }
  }
  // Fallback: return chicken pasta for any URL
  return { ...demoRecipes["demo-chicken-pasta"], id: crypto.randomUUID(), createdAt: Date.now(), sourceUrl: url };
}

export function parseRecipeFromText(text: string): Recipe {
  const lower = text.toLowerCase();
  let base = demoRecipes["demo-chicken-pasta"];
  if (lower.includes("vegetab") || lower.includes("stir") || lower.includes("veggie")) {
    base = demoRecipes["demo-veggie-stir-fry"];
  } else if (lower.includes("pancake") || lower.includes("banana") || lower.includes("breakfast")) {
    base = demoRecipes["demo-banana-pancakes"];
  }

  return {
    ...base,
    id: crypto.randomUUID(),
    title: text.length > 5 ? text.charAt(0).toUpperCase() + text.slice(1) : base.title,
    confidence: "needs-review" as const,
    createdAt: Date.now(),
  };
}

export function scaleIngredients(ingredients: Ingredient[], originalServings: number, newServings: number): Ingredient[] {
  const ratio = newServings / originalServings;
  return ingredients.map(i => ({
    ...i,
    amount: Math.round(i.amount * ratio * 100) / 100,
  }));
}

export function getDemoRecipes(): Recipe[] {
  return Object.values(demoRecipes).map(r => ({ ...r }));
}
