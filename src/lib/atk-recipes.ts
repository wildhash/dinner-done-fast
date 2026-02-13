import { Recipe } from "./types";

// Hardcoded America's Test Kitchen recipes for matching
export interface ATKRecipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  url: string;
  tags: string[];
  timeMinutes: number;
}

export const ATK_RECIPES: ATKRecipe[] = [
  {
    id: "atk-chicken-parmesan",
    title: "Chicken Parmesan",
    description: "Crispy breaded chicken cutlets topped with marinara sauce and melted mozzarella cheese.",
    ingredients: ["chicken breast", "breadcrumbs", "parmesan cheese", "mozzarella cheese", "marinara sauce", "eggs", "flour", "basil"],
    url: "https://www.americastestkitchen.com/recipes/chicken-parmesan",
    tags: ["comfort", "italian"],
    timeMinutes: 45,
  },
  {
    id: "atk-pasta-carbonara",
    title: "Pasta Carbonara",
    description: "Classic Roman pasta dish with eggs, pancetta, pecorino romano, and black pepper.",
    ingredients: ["spaghetti", "eggs", "pancetta", "pecorino romano", "black pepper", "pasta water"],
    url: "https://www.americastestkitchen.com/recipes/pasta-carbonara",
    tags: ["quick", "italian", "comfort"],
    timeMinutes: 25,
  },
  {
    id: "atk-beef-stir-fry",
    title: "Beef and Broccoli Stir-Fry",
    description: "Tender beef with crisp broccoli in a savory sauce, served over rice.",
    ingredients: ["beef", "broccoli", "soy sauce", "garlic", "ginger", "cornstarch", "rice", "sesame oil"],
    url: "https://www.americastestkitchen.com/recipes/beef-broccoli-stir-fry",
    tags: ["quick", "asian"],
    timeMinutes: 30,
  },
  {
    id: "atk-roasted-chicken",
    title: "Perfect Roasted Chicken",
    description: "Juicy roast chicken with crispy skin and herbs.",
    ingredients: ["whole chicken", "butter", "thyme", "rosemary", "garlic", "lemon", "salt", "pepper"],
    url: "https://www.americastestkitchen.com/recipes/perfect-roasted-chicken",
    tags: ["comfort", "sunday-dinner"],
    timeMinutes: 90,
  },
  {
    id: "atk-chocolate-chip-cookies",
    title: "The Best Chocolate Chip Cookies",
    description: "Perfectly chewy cookies with crispy edges and gooey chocolate chips.",
    ingredients: ["flour", "butter", "brown sugar", "white sugar", "eggs", "vanilla", "chocolate chips", "baking soda", "salt"],
    url: "https://www.americastestkitchen.com/recipes/chocolate-chip-cookies",
    tags: ["dessert", "baking"],
    timeMinutes: 35,
  },
  {
    id: "atk-lasagna",
    title: "Simple Italian-American Lasagna",
    description: "Classic lasagna with meat sauce, ricotta, mozzarella, and parmesan.",
    ingredients: ["lasagna noodles", "ground beef", "ricotta cheese", "mozzarella cheese", "parmesan cheese", "tomato sauce", "onion", "garlic", "basil"],
    url: "https://www.americastestkitchen.com/recipes/lasagna",
    tags: ["comfort", "italian", "make-ahead"],
    timeMinutes: 120,
  },
  {
    id: "atk-mac-and-cheese",
    title: "Stovetop Macaroni and Cheese",
    description: "Creamy, cheesy macaroni and cheese made on the stovetop.",
    ingredients: ["elbow macaroni", "cheddar cheese", "milk", "butter", "flour", "mustard powder", "salt", "pepper"],
    url: "https://www.americastestkitchen.com/recipes/mac-and-cheese",
    tags: ["comfort", "quick", "kid-friendly"],
    timeMinutes: 25,
  },
  {
    id: "atk-chicken-noodle-soup",
    title: "Classic Chicken Noodle Soup",
    description: "Comforting chicken soup with vegetables and egg noodles.",
    ingredients: ["chicken", "carrots", "celery", "onion", "egg noodles", "chicken broth", "thyme", "bay leaf", "parsley"],
    url: "https://www.americastestkitchen.com/recipes/chicken-noodle-soup",
    tags: ["comfort", "soup", "healthy"],
    timeMinutes: 60,
  },
  {
    id: "atk-fried-rice",
    title: "Perfect Fried Rice",
    description: "Restaurant-style fried rice with vegetables, eggs, and soy sauce.",
    ingredients: ["rice", "eggs", "soy sauce", "sesame oil", "peas", "carrots", "green onions", "garlic", "ginger"],
    url: "https://www.americastestkitchen.com/recipes/fried-rice",
    tags: ["quick", "asian", "easy"],
    timeMinutes: 20,
  },
  {
    id: "atk-banana-bread",
    title: "Ultimate Banana Bread",
    description: "Moist, flavorful banana bread with a tender crumb.",
    ingredients: ["ripe bananas", "flour", "butter", "brown sugar", "eggs", "baking soda", "vanilla", "walnuts", "salt"],
    url: "https://www.americastestkitchen.com/recipes/banana-bread",
    tags: ["baking", "breakfast", "snack"],
    timeMinutes: 75,
  },
];

/**
 * Calculate similarity between two strings using a simple word-based approach
 */
function calculateSimilarity(str1: string, str2: string): number {
  const words1 = str1.toLowerCase().split(/\s+/);
  const words2 = str2.toLowerCase().split(/\s+/);
  
  let matches = 0;
  for (const word1 of words1) {
    for (const word2 of words2) {
      if (word1.length > 3 && word2.includes(word1)) {
        matches++;
        break;
      }
      if (word2.length > 3 && word1.includes(word2)) {
        matches++;
        break;
      }
    }
  }
  
  return matches / Math.max(words1.length, words2.length);
}

/**
 * Find matching ATK recipes based on ingredients and title
 */
export function findMatchingATKRecipes(recipe: Recipe, maxResults: number = 3): ATKRecipe[] {
  const scores = ATK_RECIPES.map((atkRecipe) => {
    let score = 0;
    
    // Compare recipe title with ATK title
    score += calculateSimilarity(recipe.title, atkRecipe.title) * 3;
    
    // Compare recipe ingredients with ATK ingredients
    for (const ingredient of recipe.ingredients) {
      for (const atkIngredient of atkRecipe.ingredients) {
        if (ingredient.name.toLowerCase().includes(atkIngredient.toLowerCase()) ||
            atkIngredient.toLowerCase().includes(ingredient.name.toLowerCase())) {
          score += 1;
        }
      }
    }
    
    // Compare tags
    for (const tag of recipe.tags) {
      if (atkRecipe.tags.includes(tag)) {
        score += 0.5;
      }
    }
    
    // Compare time (prefer similar cooking times)
    const timeDiff = Math.abs(recipe.timeMinutes - atkRecipe.timeMinutes);
    if (timeDiff < 15) score += 1;
    else if (timeDiff < 30) score += 0.5;
    
    return { recipe: atkRecipe, score };
  });
  
  // Sort by score and return top matches
  scores.sort((a, b) => b.score - a.score);
  
  // Only return recipes with a minimum score threshold
  return scores
    .filter(s => s.score > 1)
    .slice(0, maxResults)
    .map(s => s.recipe);
}
