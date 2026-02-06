# Fuduit - Personal Finance Tracker# Fuduit - Personal Finance Tracker

A fun and playful personal finance tracker built with Expo and React Native. Track your income and expenses, view insights, and manage your financial life with a beautiful dark-themed UI.A fun and playful personal finance tracker built with Expo and React Native.

![Fuduit App](./assets/icon.png)## 🚀 Tech Stack

## 📋 Table of Contents- **Framework:** Expo SDK 50+ (Managed Workflow)

- **Language:** TypeScript (Strict)

- [Features](#-features)- **Routing:** Expo Router v3

- [Tech Stack](#-tech-stack)- **Styling:** NativeWind v4 (Tailwind CSS) + Reanimated

- [Project Structure](#-project-structure)- **State:** Zustand

- [Getting Started](#-getting-started)- **Database:** expo-sqlite/next + drizzle-orm

- [Firebase Setup](#-firebase-setup)- **Auth:** Firebase Authentication

- [Running Tests](#-running-tests)- **Icons:** lucide-react-native

- [Architecture](#-architecture)

- [Screens](#-screens)## 📁 Project Structure

- [API Reference](#-api-reference)

- [Theme Colors](#-theme-colors)```

- [License](#-license)/src

  /app # Expo Router pages

## ✨ Features /(auth) # Authentication screens

    /(tabs)               # Main app tabs

- 🔐 **Secure Authentication** - Firebase Email/Password authentication \_layout.tsx # Root layout with providers

- 💰 **Transaction Management** - Add, edit, and delete income/expenses +not-found.tsx # 404 screen

- 📊 **Financial Insights** - View charts and spending analytics /components

- 🌙 **Dark Mode** - Beautiful dark-themed UI with lime green accents /ui # Base UI components

- 📱 **Offline-First** - Local SQLite database with cloud sync /constants # Theme and constants

- ☁️ **Cloud Backup** - Firestore synchronization for data backup /db # Database setup (SQLite + Drizzle)

- ✨ **Smooth Animations** - React Native Reanimated for fluid UX /features

- 🧪 **Fully Tested** - Unit and integration tests with Jest /auth # Auth feature module

  /transactions # Transactions feature module

## 🚀 Tech Stack /lib # Third-party integrations

/store # Zustand stores

| Category | Technology | Version |```

|----------|------------|---------|

| Framework | Expo SDK | ~52.0.0 |## 🛠 Getting Started

| Language | TypeScript | ^5.1.0 |

| Routing | Expo Router | ~4.0.0 |### Prerequisites

| Styling | NativeWind (Tailwind CSS) | ^4.0.0 |

| Animations | React Native Reanimated | ~3.16.1 |- Node.js 18+

| State Management | Zustand | ^4.4.0 |- npm or yarn

| Local Database | expo-sqlite + Drizzle ORM | ~15.1.0 |- Expo CLI (`npm install -g expo-cli`)

| Authentication | Firebase Auth | ^10.7.0 |

| Cloud Database | Firebase Firestore | ^10.7.0 |### Installation

| Icons | lucide-react-native | ^0.460.0 |

| Testing | Jest + ts-jest | ^29.7.0 |1. Install dependencies:

## 📁 Project Structure ```bash

npm install

`   `

/src

├── /app # Expo Router pages2. Configure Firebase:

│ ├── /(auth) # Authentication screens - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)

│ │ ├── \_layout.tsx # Auth layout (no tabs) - Enable Authentication with Email/Password

│ │ ├── login.tsx # Login screen - Copy your config to `src/lib/firebase.ts`

│ │ └── register.tsx # Registration screen

│ ├── /(tabs) # Main app tabs3. Start the development server:

│ │ ├── \_layout.tsx # Tab navigator layout

│ │ ├── index.tsx # Home/Dashboard screen ```bash

│ │ ├── transactions.tsx # Transaction history npm start

│ │ ├── add-transaction.tsx # Add/Edit transaction ```

│ │ ├── insights.tsx # Charts & analytics

│ │ └── settings.tsx # App settings4. Run on your device:

│ ├── \_layout.tsx # Root layout with providers - Press `i` for iOS Simulator

│ └── +not-found.tsx # 404 screen - Press `a` for Android Emulator

├── /components - Scan QR code with Expo Go app

│ └── /ui # Reusable UI components

│ └── Animated.tsx # Animated components## 📦 Key Dependencies

├── /constants

│ └── theme.ts # Theme colors & constants| Package | Version | Purpose |

├── /db| ----------------------- | ------- | -------------------- |

│ ├── client.ts # SQLite database client| expo | ~50.0.0 | Framework |

│ ├── migrations.ts # Database migrations| expo-router | ~3.4.0 | File-based routing |

│ └── schema.ts # Drizzle ORM schema| nativewind | ^4.0.0 | Tailwind CSS styling |

├── /features| drizzle-orm | ^0.29.0 | SQL ORM |

│ ├── /auth| expo-sqlite | ~13.2.0 | Local database |

│ │ └── /hooks| firebase | ^10.7.0 | Authentication |

│ │ └── useAuth.ts # Authentication hook| zustand | ^4.4.0 | State management |

│ └── /transactions| react-native-reanimated | ~3.6.0 | Animations |

│ └── /hooks

│ └── useTransactions.ts # Transaction CRUD hook## 🎨 Theme Colors

├── /lib

│ ├── firebase.ts # Firebase initialization| Color | Hex | Usage |

│ └── firestore.ts # Firestore sync functions| ---------- | --------- | ------------------- |

├── /store| Primary | `#a3e635` | Buttons, highlights |

│ ├── authStore.ts # Authentication state| Secondary | `#f472b6` | Accents |

│ └── transactionStore.ts # Transaction state| Background | `#121212` | App background |

├── /**tests** # Test files| Surface | `#1E1E1E` | Cards, inputs |

│ ├── authStore.test.ts # Auth store tests| Income | `#22c55e` | Income indicators |

│ ├── transactionStore.test.ts # Transaction store tests| Expense | `#ef4444` | Expense indicators |

│ ├── transactionStats.test.ts # Statistics tests

│ └── integration.test.ts # Integration tests## 🏗 Architecture

├── global.css # Tailwind CSS imports

└── metro.config.js # Metro bundler config### Hybrid Local-First

````

- **Authentication:** Firebase Auth (Identity only)

## 🛠 Getting Started- **Data Storage:** Local SQLite database

- **Security:** Data isolated per user via `user_id` column

### Prerequisites

### State Management

- Node.js 18+

- npm or yarn- **Global State:** Zustand stores

- Expo Go app (SDK 52) on your phone- **Server State:** Local SQLite queries via Drizzle ORM

- Firebase project (for authentication)

## 📄 License

### Installation

MIT

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MuhammadFasya/Fuduit.git
   cd Fuduit
````

2. **Install dependencies:**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Firebase** (see [Firebase Setup](#-firebase-setup))

4. **Start the development server:**

   ```bash
   npm start
   ```

5. **Run on your device:**
   - Scan QR code with Expo Go app (Android)
   - Scan QR code with Camera app (iOS)

### Available Scripts

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `npm start`             | Start Expo development server  |
| `npm run android`       | Start on Android emulator      |
| `npm run ios`           | Start on iOS simulator         |
| `npm run web`           | Start web version              |
| `npm test`              | Run all tests                  |
| `npm run test:watch`    | Run tests in watch mode        |
| `npm run test:coverage` | Run tests with coverage report |

## 🔥 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project" and follow the setup wizard
3. Enable Google Analytics (optional)

### 2. Enable Authentication

1. Go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider

### 3. Create Firestore Database

1. Go to **Firestore Database** → **Create database**
2. Start in **test mode** (or production with rules below)
3. Choose a region close to your users

### 4. Configure Security Rules

Go to **Firestore Database** → **Rules** and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /transactions/{transactionId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

### 5. Add Firebase Config

Update `src/lib/firebase.ts` with your config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

## 🧪 Running Tests

Fuduit includes comprehensive unit and integration tests using Jest.

### Test Overview

| Test File                  | Description                         | Tests    |
| -------------------------- | ----------------------------------- | -------- |
| `authStore.test.ts`        | Authentication state management     | 8 tests  |
| `transactionStore.test.ts` | Transaction CRUD operations         | 12 tests |
| `transactionStats.test.ts` | Financial calculations & statistics | 10 tests |
| `integration.test.ts`      | End-to-end user workflows           | 6 tests  |

**Total: 36 tests**

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run a specific test file
npm test -- authStore.test.ts
```

### Expected Output

```
 PASS  src/__tests__/transactionStats.test.ts
 PASS  src/__tests__/transactionStore.test.ts
 PASS  src/__tests__/integration.test.ts
 PASS  src/__tests__/authStore.test.ts

Test Suites: 4 passed, 4 total
Tests:       36 passed, 36 total
Snapshots:   0 total
Time:        5.814 s
```

### Test Categories

#### 1. Auth Store Tests (`authStore.test.ts`)

Tests for authentication state management:

- ✅ Initial state verification (user null, isLoading true)
- ✅ User login state management (setUser with valid user)
- ✅ User logout functionality (logout clears user)
- ✅ Loading state handling (setLoading updates correctly)
- ✅ Authentication status tracking (isAuthenticated flag)
- ✅ Multiple state transitions
- ✅ Null user handling
- ✅ State persistence verification

#### 2. Transaction Store Tests (`transactionStore.test.ts`)

Tests for transaction CRUD operations:

- ✅ Initial state with empty transactions array
- ✅ Adding single transaction
- ✅ Adding multiple transactions
- ✅ Updating existing transaction by ID
- ✅ Updating non-existent transaction (no-op)
- ✅ Deleting transaction by ID
- ✅ Deleting non-existent transaction (no-op)
- ✅ Setting multiple transactions (bulk load)
- ✅ Clearing all transactions
- ✅ State immutability verification
- ✅ Transaction ordering
- ✅ Partial update handling

#### 3. Transaction Statistics Tests (`transactionStats.test.ts`)

Tests for financial calculations:

- ✅ Total income calculation
- ✅ Total expense calculation
- ✅ Net balance calculation (income - expense)
- ✅ Category-wise grouping and totals
- ✅ Monthly aggregation
- ✅ Percentage calculations
- ✅ Empty data handling (returns 0)
- ✅ Single transaction handling
- ✅ Large number handling
- ✅ Decimal precision

#### 4. Integration Tests (`integration.test.ts`)

Tests for end-to-end user workflows:

- ✅ User registration → login → add transaction flow
- ✅ Multi-transaction management workflow
- ✅ User data isolation (User A can't see User B data)
- ✅ Transaction filtering by type
- ✅ Complete CRUD workflow (create, read, update, delete)
- ✅ Error handling for unauthenticated operations

### Test Configuration

Tests are configured in `jest.config.js`:

```javascript
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
};
```

### Writing New Tests

To add new tests, create a file in `src/__tests__/` with the `.test.ts` extension:

```typescript
// src/__tests__/myFeature.test.ts
describe("My Feature", () => {
  beforeEach(() => {
    // Setup before each test
  });

  it("should do something", () => {
    // Arrange
    const input = "test";

    // Act
    const result = myFunction(input);

    // Assert
    expect(result).toBe("expected");
  });
});
```

## 🏗 Architecture

### Data Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Firebase      │────▶│   Auth Store    │────▶│    UI Layer     │
│   Auth          │     │   (Zustand)     │     │  (React Native) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Firestore     │◀───▶│  Transaction    │◀────│  useTransactions│
│   (Cloud)       │     │  Store (Zustand)│     │  Hook           │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                 ▲
                                 │
                        ┌─────────────────┐
                        │   SQLite        │
                        │   (Local)       │
                        └─────────────────┘
```

### Offline-First Strategy

1. **Write Operations:**
   - Data saved to SQLite first (immediate)
   - Synced to Firestore in background (async)

2. **Read Operations:**
   - Data read from local SQLite
   - Fast, works offline

3. **User Isolation:**
   - All transactions tagged with `userId`
   - Queries always filter by current user

## 📱 Screens

| Screen          | Route                     | Description                     |
| --------------- | ------------------------- | ------------------------------- |
| Login           | `/(auth)/login`           | Email/password authentication   |
| Register        | `/(auth)/register`        | New account creation            |
| Home            | `/(tabs)/`                | Dashboard with balance overview |
| Transactions    | `/(tabs)/transactions`    | Transaction history list        |
| Add Transaction | `/(tabs)/add-transaction` | Add or edit transaction         |
| Insights        | `/(tabs)/insights`        | Charts and analytics            |
| Settings        | `/(tabs)/settings`        | App preferences                 |

## 📚 API Reference

### useAuth Hook

```typescript
const {
  user, // Current Firebase user
  isLoading, // Loading state
  signIn, // (email, password) => Promise
  signUp, // (email, password) => Promise
  signOut, // () => Promise
} = useAuth();
```

### useTransactions Hook

```typescript
const {
  transactions, // Transaction[]
  isLoading, // Loading state
  fetchTransactions, // (filter?) => Promise
  addTransaction, // (data) => Promise<{success, error?}>
  updateTransaction, // (id, data) => Promise<{success, error?}>
  deleteTransaction, // (id) => Promise<{success, error?}>
  getTransactionById, // (id) => Promise<Transaction | null>
} = useTransactions();
```

### Transaction Type

```typescript
interface Transaction {
  id: number;
  userId: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: Date;
  note: string | null;
}
```

## 🎨 Theme Colors

| Color          | Hex       | CSS Class     | Usage                       |
| -------------- | --------- | ------------- | --------------------------- |
| Primary        | `#a3e635` | `lime-400`    | Buttons, highlights, income |
| Secondary      | `#f472b6` | `pink-400`    | Accents                     |
| Background     | `#121212` | `neutral-950` | App background              |
| Surface        | `#1E1E1E` | `neutral-900` | Cards, inputs               |
| Text Primary   | `#FFFFFF` | `white`       | Main text                   |
| Text Secondary | `#A3A3A3` | `neutral-400` | Secondary text              |
| Income         | `#22c55e` | `green-500`   | Income indicators           |
| Expense        | `#ef4444` | `red-500`     | Expense indicators          |

## 🔒 Security

- **Authentication:** Firebase Auth with secure token management
- **Data Isolation:** All data filtered by `userId`
- **Local Storage:** SQLite with user-scoped queries
- **Cloud Security:** Firestore rules enforce user ownership
- **No Plain Passwords:** Firebase handles password hashing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with ❤️ using Expo and React Native
