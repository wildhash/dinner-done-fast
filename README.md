# Dinner Done Fast - Recipe Import & Meal Planning App

**Live Demo**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## 🍳 About the Project

Dinner Done Fast (CookTurn) is a streamlined recipe management and meal planning application designed to help you go from recipe discovery to dinner on the table in 20 seconds. Built for the hackathon with inspiration from Eitan Bernath's cooking philosophy, this app transforms recipe URLs or text descriptions into actionable meal plans with grocery lists, cooking guidance, and photo documentation.

## ✨ Features

### Core Functionality
- **📝 Recipe Import**: Paste any recipe URL (TikTok, YouTube, Instagram, blogs) or describe a recipe in plain text
- **🤖 AI-Powered Parsing**: Automatic extraction of ingredients, steps, servings, and cooking time
- **📊 Smart Grocery Lists**: Organized by aisle with checkboxes for pantry items
- **⚖️ Servings Adjuster**: Scale recipes up or down with automatic ingredient recalculation
- **👨‍🍳 Cook Mode**: Step-by-step cooking guidance with progress tracking
- **📸 Photo Capture**: Document your finished dishes with camera integration
- **📚 Cooking History**: Track all your completed meals with photos

### America's Test Kitchen Integration
- **⭐ Recipe Matching**: Intelligent matching algorithm finds similar tested recipes from ATK
- **🔍 Similarity Scoring**: Compares ingredients, cooking time, and recipe tags
- **🔗 Direct Links**: Quick access to professional ATK recipe instructions
- **💡 Smart Suggestions**: Get expert alternatives for any recipe you import

### Freemium Model
- **Free Tier**: 5 recipe imports per month, 3 history entries, full grocery list & cook mode
- **Pro Tier**: Unlimited imports, unlimited history, priority features
- **Simple Paywall**: Integrated upgrade flow with annual/monthly options

## 🎯 Perfect For
- Busy weeknight dinners
- Recipe discovery from social media
- Meal planning and grocery shopping
- Learning from trusted sources like America's Test Kitchen
- Building cooking confidence with step-by-step guidance

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Clone the repository
git clone https://github.com/wildhash/dinner-done-fast.git

# Navigate to the project
cd dinner-done-fast

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```sh
npm run build
npm run preview
```

## 🔄 GitHub Copilot + Lovable Sync Workflow

This project is set up for seamless two-way sync between GitHub and Lovable:

### From Lovable → GitHub
- Changes made via Lovable prompts automatically commit to the `main` branch
- Generated code, components, and features sync in real-time

### From GitHub → Lovable  
- Push changes from your local IDE or GitHub.com
- Refresh your Lovable project to pull the latest updates
- Lovable detects changes and updates the live preview

### Using GitHub Copilot

**Option 1: VS Code (Recommended)**
- Install GitHub Copilot extension
- Use `@workspace` prefix for full repo context
- Example prompts:
  - `@workspace Add a new feature to filter recipes by dietary restrictions`
  - `@workspace Improve the photo capture to allow multiple photos per recipe`
  - `@workspace Add a print-friendly recipe card view`

**Option 2: GitHub.com**
- Create an issue describing the feature
- Assign to @copilot
- Review and merge the generated PR
- Refresh Lovable to see updates

### Tips for Success
- Start with small, focused features
- Test in Lovable's preview after each sync
- Use demo recipes to quickly test flows
- Commit and push frequently for smooth syncing

## 📝 Usage Examples

### Import a Recipe
1. Open the app and paste a recipe URL or describe a dish
2. Click "Generate Plan" to parse the recipe
3. Review ingredients and steps
4. Check for America's Test Kitchen alternatives

### Create a Grocery List
1. From any recipe, click "Create Grocery List"
2. Check off items you already have
3. Tap "Share List" to export or copy to clipboard

### Cook Mode
1. Navigate to a recipe and click "Start Cooking"
2. Follow step-by-step instructions
3. Mark steps complete as you go
4. Add a photo when finished

## 🧪 Testing

```sh
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/           # shadcn-ui components
│   ├── ATKSuggestions.tsx
│   └── BottomNav.tsx
├── pages/            # Route pages
│   ├── ImportScreen.tsx
│   ├── RecipeCardScreen.tsx
│   ├── GroceryListScreen.tsx
│   ├── CookModeScreen.tsx
│   ├── HistoryScreen.tsx
│   └── PaywallScreen.tsx
├── lib/              # Utilities and business logic
│   ├── recipes.ts    # Recipe parsing and demo data
│   ├── atk-recipes.ts # ATK matching algorithm
│   ├── storage.ts    # LocalStorage helpers
│   ├── types.ts      # TypeScript types
│   └── utils.ts      # Utility functions
└── App.tsx           # Main app component with routing
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI framework with hooks
- **React Router** - Client-side routing
- **shadcn-ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Headless component primitives
- **TanStack Query** - Data fetching and caching
- **Lucide React** - Icon library
- **LocalStorage** - Client-side data persistence

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm (install with [nvm](https://github.com/nvm-sh/nvm))

### Local Development

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can! To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs via issues
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Inspired by Eitan Bernath's cooking approach
- America's Test Kitchen for recipe inspiration
- Lovable for the development platform
- GitHub Copilot for AI-assisted development

---

**Built with ❤️ for the hackathon** | **Powered by Lovable + GitHub Copilot**
