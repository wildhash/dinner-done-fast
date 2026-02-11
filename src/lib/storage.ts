import { AppState, Recipe, GroceryList, CookedSession } from "./types";

const STORAGE_KEY = "cookturn_state";

function getCurrentMonthKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function getDefaultState(): AppState {
  return {
    recipes: [],
    groceryLists: [],
    cookedSessions: [],
    monthlyImports: 0,
    monthKey: getCurrentMonthKey(),
    isPro: false,
  };
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const state = JSON.parse(raw) as AppState;
    // Reset monthly counter if month changed
    if (state.monthKey !== getCurrentMonthKey()) {
      state.monthlyImports = 0;
      state.monthKey = getCurrentMonthKey();
    }
    return state;
  } catch {
    return getDefaultState();
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function addRecipe(recipe: Recipe): AppState {
  const state = loadState();
  state.recipes.unshift(recipe);
  state.monthlyImports += 1;
  saveState(state);
  return state;
}

export function addGroceryList(list: GroceryList): AppState {
  const state = loadState();
  state.groceryLists.unshift(list);
  saveState(state);
  return state;
}

export function addCookedSession(session: CookedSession): AppState {
  const state = loadState();
  state.cookedSessions.unshift(session);
  saveState(state);
  return state;
}

export function setProStatus(isPro: boolean): AppState {
  const state = loadState();
  state.isPro = isPro;
  saveState(state);
  return state;
}

export function canImport(): { allowed: boolean; count: number; limit: number } {
  const state = loadState();
  const limit = state.isPro ? Infinity : 5;
  return { allowed: state.isPro || state.monthlyImports < limit, count: state.monthlyImports, limit: 5 };
}

export function getHistory(isPro: boolean): CookedSession[] {
  const state = loadState();
  return isPro ? state.cookedSessions : state.cookedSessions.slice(0, 3);
}
