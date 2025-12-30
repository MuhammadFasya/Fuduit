# Fuduit - Personal Finance Tracker

A **local-first**, **offline-by-default** personal finance tracker built with React Native (Expo). Track income, expenses, set goals, and get intelligent insights—all without needing an account or internet connection.

---

## 🎯 Features

### ✅ Core Functionality

- **Transaction Management**: Track income and expenses with custom categories
- **Income Sources**: Organize income by source (Salary, Freelance, Investment, etc.)
- **Financial Goals**: Set and track progress toward savings goals
- **Quick Add Modal**: Add transactions in under 10 seconds with haptic feedback

### 📊 Insights (Rule-Based Intelligence)

Fuduit generates actionable insights from your transaction data:

- **Spending Anomaly Detection**: Alerts when spending patterns change significantly
- **Category Frequency Analysis**: Identifies your most frequent spending categories
- **Time-Based Patterns**: Reveals weekend vs. weekday spending habits
- **Budget Warnings**: Alerts when expenses exceed income thresholds

### 📈 Charts & Visualizations

- **Monthly Income vs Expense**: Line chart showing financial trends over time
- **Category Breakdown**: Donut chart for expense distribution by category
- **Weekly Expense Bar Chart**: Track weekly spending patterns

### 🔧 Technical Features

- **Local-First Architecture**: All data stored locally in SQLite
- **Offline by Default**: No internet required—works completely offline
- **Zustand State Management**: Simple, performant global state
- **Dark Mode Only**: Calm, minimal, insight-focused design
- **No Authentication**: Privacy-focused—your data stays on your device

---

## 📁 Project Structure

```
Fuduit/
├── src/
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── ModalContainer.tsx
│   │   │   └── FAB.tsx
│   │   ├── domain/           # Business domain components
│   │   │   ├── TransactionItem.tsx
│   │   │   ├── InsightCard.tsx
│   │   │   ├── GoalCard.tsx
│   │   │   └── QuickAddModal.tsx
│   │   └── charts/           # Chart components
│   │       ├── MonthlyIncomeExpenseChart.tsx
│   │       └── CategoryDonutChart.tsx
│   │
│   ├── screens/              # Screen components (compose components only)
│   │   ├── HomeScreen.tsx
│   │   ├── TransactionsScreen.tsx
│   │   ├── InsightsScreen.tsx
│   │   └── SettingsScreen.tsx
│   │
│   ├── stores/               # Zustand state management
│   │   ├── transactionStore.ts
│   │   ├── categoryStore.ts
│   │   ├── incomeSourceStore.ts
│   │   ├── goalStore.ts
│   │   └── insightStore.ts
│   │
│   ├── database/             # SQLite database layer
│   │   ├── database.ts       # DB initialization & schema
│   │   └── repositories.ts   # Data access layer
│   │
│   ├── services/             # Business logic services
│   │   └── insightEngine.ts  # Rule-based insight generation
│   │
│   ├── config/               # Configuration files
│   │   ├── theme.ts          # Theme (colors, spacing, typography)
│   │   └── constants.ts      # App-wide constants
│   │
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   │
│   └── navigation/           # Navigation configuration
│       └── AppNavigator.tsx
│
├── App.tsx                   # App entry point
├── package.json
├── app.json
├── tsconfig.json
└── babel.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone or navigate to the project directory**:

   ```bash
   cd Fuduit
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

4. **Run on a device/simulator**:
   - iOS: Press `i` or run `npm run ios`
   - Android: Press `a` or run `npm run android`
   - Web: Press `w` or run `npm run web`

---

## 🏗️ Architecture & Design Decisions

### **Local-First Architecture**

All data is stored locally using **SQLite** via `expo-sqlite`. No backend, no API calls, no authentication. Your financial data never leaves your device.

### **State Management (Zustand)**

Zustand provides a lightweight, hook-based state management solution:

- Simple API with minimal boilerplate
- Easy integration with async operations
- Great TypeScript support

### **Modular Insight Engine**

The insight engine uses a **rule-based system** with modular rules:

```typescript
// Add custom rules easily
InsightEngine.addRule(new CustomInsightRule());

// Each rule implements a simple interface
interface InsightRule {
  type: string;
  generate: (transactions: Transaction[]) => Insight | null;
}
```

**Future AI Integration**: The architecture is designed to support AI-based insights in v1.5-v2.0:

- Rules can be replaced with ML models
- Metadata structure supports advanced analytics
- Modular design allows gradual migration

### **Component Hierarchy**

- **UI Components**: Generic, reusable (buttons, cards, inputs)
- **Domain Components**: Business-specific (transactions, goals, insights)
- **Screens**: Compose components, minimal logic
- **Stores**: Handle state and side effects

### **Theme System**

All design tokens (colors, spacing, typography) are centralized in `theme.ts`:

```typescript
import { theme } from "./config/theme";

// Usage
<Text style={{ color: theme.colors.textPrimary }}>Hello</Text>;
```

---

## 📊 Insight Engine

### How It Works

The insight engine analyzes transaction data using predefined rules:

1. **Spending Anomaly Detection**: Compares current month vs. previous month
2. **Category Frequency**: Identifies dominant spending categories
3. **Time Patterns**: Analyzes weekend vs. weekday spending
4. **Budget Warnings**: Flags when expenses exceed 90% of income

### Adding Custom Rules

```typescript
import { InsightEngine } from "./src/services/insightEngine";

class CustomRule implements InsightRule {
  type = "custom_insight";

  generate(transactions: Transaction[]): Insight | null {
    // Your logic here
    return {
      id: "custom_1",
      type: "custom_insight",
      title: "Custom Insight",
      description: "Your insight message",
      severity: "info",
      createdAt: new Date().toISOString(),
    };
  }
}

InsightEngine.addRule(new CustomRule());
```

---

## 🎨 Design System

### Colors

- **Background**: `#0A0E14` (Dark)
- **Surface**: `#151B26`
- **Primary**: `#3B82F6` (Blue)
- **Success**: `#10B981` (Green)
- **Warning**: `#F59E0B` (Amber)
- **Danger**: `#EF4444` (Red)

### Typography

- **H1**: 32px, Bold
- **H2**: 24px, Semibold
- **H3**: 20px, Semibold
- **Body**: 16px, Regular
- **Caption**: 14px, Regular
- **Small**: 12px, Regular

### Spacing

- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- XXL: 48px

---

## 🧪 Future Enhancements

### Version 1.5

- [ ] Export data (CSV/JSON)
- [ ] Budget limits per category
- [ ] Recurring transactions
- [ ] Custom date ranges for charts

### Version 2.0 (AI-Powered)

- [ ] AI-generated personalized insights
- [ ] Predictive spending forecasts
- [ ] Natural language transaction input
- [ ] Smart categorization suggestions

### Version 3.0

- [ ] Multi-currency support
- [ ] Bill reminders & notifications
- [ ] Cloud backup (optional, encrypted)
- [ ] Shared budgets (family mode)

---

## 🛠️ Tech Stack

| Category             | Technology                     |
| -------------------- | ------------------------------ |
| **Framework**        | React Native (Expo)            |
| **Language**         | TypeScript                     |
| **State Management** | Zustand                        |
| **Database**         | SQLite (expo-sqlite)           |
| **Navigation**       | React Navigation (Bottom Tabs) |
| **Charts**           | react-native-chart-kit         |
| **Date Handling**    | date-fns                       |
| **Haptics**          | expo-haptics                   |

---

## 📝 Code Guidelines

### TypeScript

- Use strict mode
- Define interfaces for all data structures
- Avoid `any` types

### Components

- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components focused and small (<200 lines)

### Styling

- Use StyleSheet.create()
- Reference theme constants (no hardcoded values)
- Follow mobile-first responsive design

### State Management

- Use Zustand stores for global state
- Use local state (useState) for component-specific state
- Keep async operations in stores

---

## 🐛 Debugging

### Common Issues

**Database not initializing?**

```typescript
// Check if database is initialized
import { initDatabase } from "./src/database/database";
await initDatabase();
```

**TypeScript errors?**

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm install
```

**Charts not rendering?**
Ensure you have installed all dependencies:

```bash
npm install react-native-chart-kit react-native-svg
```

---

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

## 🤝 Contributing

This is a boilerplate project. Feel free to:

1. Fork the repository
2. Create feature branches
3. Submit pull requests
4. Report issues

---

## 💡 Philosophy

**Fuduit** is built on these principles:

1. **Privacy First**: Your data belongs to you. No servers, no tracking, no ads.
2. **Offline by Default**: Internet should be optional, not required.
3. **Calm Technology**: Insights should inform, not overwhelm.
4. **Local-First**: Fast, reliable, and works everywhere.

---

## 📧 Contact

For questions, suggestions, or feedback, open an issue on GitHub.

**Happy budgeting! 💰**
