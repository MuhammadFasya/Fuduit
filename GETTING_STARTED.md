# Getting Started with Fuduit

## Quick Start Guide

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

### 3. Run on Your Device

- **iOS**: Press `i` in the terminal or scan QR code with Camera app
- **Android**: Press `a` in the terminal or scan QR code with Expo Go app
- **Web**: Press `w` in the terminal

---

## First Steps in the App

### 1. Add Your First Transaction

1. Tap the **+ button** (bottom-right)
2. Select **Expense** or **Income**
3. Enter the amount
4. (Optional) Add a description
5. Select a category or income source
6. Tap **Add Transaction**

### 2. Set a Financial Goal

1. Navigate to **Home** tab
2. Scroll down to the Goals section
3. Create a new goal with target amount and deadline

### 3. View Insights

1. Navigate to **Insights** tab
2. Insights are generated automatically from your transactions
3. Tap **Refresh** to regenerate insights

---

## Project Structure Overview

```
src/
├── components/      # UI building blocks
├── screens/         # Full-screen views
├── stores/          # State management (Zustand)
├── database/        # SQLite data layer
├── services/        # Business logic
├── config/          # Theme & constants
├── types/           # TypeScript definitions
└── navigation/      # Screen routing
```

---

## Key Concepts

### Local-First

All your data is stored **locally on your device** using SQLite. No internet required, no cloud sync.

### Insight Engine

The app analyzes your transactions and generates insights like:

- "Your spending increased by 25% this month"
- "60% of your transactions are in the Food & Dining category"
- "You spend 70% of your budget on weekends"

### Quick Add Modal

Designed for speed: add a transaction in under 10 seconds with haptic feedback and smart defaults.

---

## Next Steps

- [ ] Add at least 10 transactions to generate meaningful insights
- [ ] Set up your first financial goal
- [ ] Customize categories in the Settings
- [ ] Review the code structure in the README.md

---

## Need Help?

- Check the main **README.md** for detailed documentation
- Review the **code comments** in key files
- Open an issue on GitHub for bugs or questions

Happy budgeting! 💰
