# Fuduit - Personal Finance Tracker# Fuduit - Personal Finance Tracker# Fuduit - Personal Finance Tracker

A fun and playful personal finance tracker built with Expo and React Native. Track your income and expenses, view insights, and manage your financial life with a beautiful dark-themed UI.A fun and playful personal finance tracker built with Expo and React Native. Track your income and expenses, view insights, and manage your financial life with a beautiful dark-themed UI.A fun and playful personal finance tracker built with Expo and React Native.

![Fuduit App](./assets/icon.png)![Fuduit App](./assets/icon.png)## 🚀 Tech Stack

## Table of Contents## 📋 Table of Contents- **Framework:** Expo SDK 50+ (Managed Workflow)

- [Features](#features)- **Language:** TypeScript (Strict)

- [Tech Stack](#tech-stack)

- [Project Structure](#project-structure)- [Features](#-features)- **Routing:** Expo Router v3

- [Getting Started](#getting-started)

- [Firebase Setup](#firebase-setup)- [Tech Stack](#-tech-stack)- **Styling:** NativeWind v4 (Tailwind CSS) + Reanimated

- [Running Tests](#running-tests)

- [Architecture](#architecture)- [Project Structure](#-project-structure)- **State:** Zustand

- [Screens](#screens)

- [API Reference](#api-reference)- [Getting Started](#-getting-started)- **Database:** expo-sqlite/next + drizzle-orm

- [Theme Colors](#theme-colors)

- [License](#license)- [Firebase Setup](#-firebase-setup)- **Auth:** Firebase Authentication

## Features- [Running Tests](#-running-tests)- **Icons:** lucide-react-native

- **Secure Authentication** - Firebase Email/Password authentication- [Architecture](#-architecture)

- **Transaction Management** - Add, edit, and delete income/expenses

- **Financial Insights** - View charts and spending analytics- [Screens](#-screens)## 📁 Project Structure

- **Dark Mode** - Beautiful dark-themed UI with lime green accents

- **Offline-First** - Local SQLite database with cloud sync- [API Reference](#-api-reference)

- **Cloud Backup** - Firestore synchronization for data backup

- **Smooth Animations** - React Native Reanimated for fluid UX- [Theme Colors](#-theme-colors)```

- **Fully Tested** - Unit and integration tests with Jest

- [License](#-license)/src

## Tech Stack

/app # Expo Router pages

| Category | Technology | Version |

| ---------------- | ------------------------- | -------- |## ✨ Features /(auth) # Authentication screens

| Framework | Expo SDK | ~52.0.0 |

| Language | TypeScript | ^5.1.0 | /(tabs) # Main app tabs

| Routing | Expo Router | ~4.0.0 |

| Styling | NativeWind (Tailwind CSS) | ^2.0.11 |- 🔐 **Secure Authentication** - Firebase Email/Password authentication \_layout.tsx # Root layout with providers

| Animations | React Native Reanimated | ~3.16.1 |

| State Management | Zustand | ^4.4.0 |- 💰 **Transaction Management** - Add, edit, and delete income/expenses +not-found.tsx # 404 screen

| Local Database | expo-sqlite + Drizzle ORM | ~15.1.0 |

| Authentication | Firebase Auth | ^10.7.0 |- 📊 **Financial Insights** - View charts and spending analytics /components

| Cloud Database | Firebase Firestore | ^10.7.0 |

| Icons | lucide-react-native | ^0.460.0 |- 🌙 **Dark Mode** - Beautiful dark-themed UI with lime green accents /ui # Base UI components

| Testing | Jest + ts-jest | ^29.7.0 |

- 📱 **Offline-First** - Local SQLite database with cloud sync /constants # Theme and constants

## Project Structure

- ☁️ **Cloud Backup** - Firestore synchronization for data backup /db # Database setup (SQLite + Drizzle)

````

/src- ✨ **Smooth Animations** - React Native Reanimated for fluid UX /features

├── /app                    # Expo Router pages

│   ├── /(auth)             # Authentication screens- 🧪 **Fully Tested** - Unit and integration tests with Jest /auth # Auth feature module

│   │   ├── _layout.tsx     # Auth layout (no tabs)

│   │   ├── login.tsx       # Login screen  /transactions # Transactions feature module

│   │   └── register.tsx    # Registration screen

│   ├── /(tabs)             # Main app tabs## 🚀 Tech Stack /lib # Third-party integrations

│   │   ├── _layout.tsx     # Tab navigator layout

│   │   ├── index.tsx       # Home/Dashboard screen/store # Zustand stores

│   │   ├── transactions.tsx    # Transaction history

│   │   ├── add-transaction.tsx # Add/Edit transaction| Category | Technology | Version |```

│   │   ├── insights.tsx    # Charts & analytics

│   │   └── settings.tsx    # App settings|----------|------------|---------|

│   ├── _layout.tsx         # Root layout with providers

│   └── +not-found.tsx      # 404 screen| Framework | Expo SDK | ~52.0.0 |## 🛠 Getting Started

├── /components

│   └── /ui                 # Reusable UI components| Language | TypeScript | ^5.1.0 |

│       └── Animated.tsx    # Animated components

├── /constants| Routing | Expo Router | ~4.0.0 |### Prerequisites

│   └── theme.ts            # Theme colors & constants

├── /db| Styling | NativeWind (Tailwind CSS) | ^4.0.0 |

│   ├── client.ts           # SQLite database client

│   ├── migrations.ts       # Database migrations| Animations | React Native Reanimated | ~3.16.1 |- Node.js 18+

│   └── schema.ts           # Drizzle ORM schema

├── /features| State Management | Zustand | ^4.4.0 |- npm or yarn

│   ├── /auth

│   │   └── /hooks| Local Database | expo-sqlite + Drizzle ORM | ~15.1.0 |- Expo CLI (`npm install -g expo-cli`)

│   │       └── useAuth.ts  # Authentication hook

│   └── /transactions| Authentication | Firebase Auth | ^10.7.0 |

│       └── /hooks

│           └── useTransactions.ts  # Transaction CRUD hook| Cloud Database | Firebase Firestore | ^10.7.0 |### Installation

├── /lib

│   ├── firebase.ts         # Firebase initialization| Icons | lucide-react-native | ^0.460.0 |

│   └── firestore.ts        # Firestore sync functions

├── /store| Testing | Jest + ts-jest | ^29.7.0 |1. Install dependencies:

│   ├── authStore.ts        # Authentication state

│   └── transactionStore.ts # Transaction state## 📁 Project Structure ```bash

├── /__tests__              # Test files

│   ├── authStore.test.tsnpm install

│   ├── transactionStore.test.ts

│   ├── transactionStats.test.ts`   `

│   └── integration.test.ts

├── global.css              # Tailwind CSS imports/src

└── metro.config.js         # Metro bundler config

```├── /app # Expo Router pages2. Configure Firebase:



## Getting Started│ ├── /(auth) # Authentication screens - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)



### Prerequisites│ │ ├── \_layout.tsx # Auth layout (no tabs) - Enable Authentication with Email/Password



- Node.js 18+│ │ ├── login.tsx # Login screen - Copy your config to `src/lib/firebase.ts`

- npm or yarn

- Expo Go app (SDK 52) on your phone│ │ └── register.tsx # Registration screen

- Firebase project (for authentication)

│ ├── /(tabs) # Main app tabs3. Start the development server:

### Installation

│ │ ├── \_layout.tsx # Tab navigator layout

1. **Clone the repository:**

│ │ ├── index.tsx # Home/Dashboard screen ```bash

   ```bash

   git clone https://github.com/MuhammadFasya/Fuduit.git│ │ ├── transactions.tsx # Transaction history npm start

   cd Fuduit

   ```│ │ ├── add-transaction.tsx # Add/Edit transaction ```



2. **Install dependencies:**│ │ ├── insights.tsx # Charts & analytics



   ```bash│ │ └── settings.tsx # App settings4. Run on your device:

   npm install --legacy-peer-deps

   ```│ ├── \_layout.tsx # Root layout with providers - Press `i` for iOS Simulator



3. **Configure Firebase** (see [Firebase Setup](#firebase-setup))│ └── +not-found.tsx # 404 screen - Press `a` for Android Emulator



4. **Start the development server:**├── /components - Scan QR code with Expo Go app



   ```bash│ └── /ui # Reusable UI components

   npm start

   ```│ └── Animated.tsx # Animated components## 📦 Key Dependencies



5. **Run on your device:**├── /constants

   - Scan QR code with Expo Go app (Android)

   - Scan QR code with Camera app (iOS)│ └── theme.ts # Theme colors & constants| Package | Version | Purpose |



### Available Scripts├── /db| ----------------------- | ------- | -------------------- |



| Command                 | Description                    |│ ├── client.ts # SQLite database client| expo | ~50.0.0 | Framework |

| ----------------------- | ------------------------------ |

| `npm start`             | Start Expo development server  |│ ├── migrations.ts # Database migrations| expo-router | ~3.4.0 | File-based routing |

| `npm run android`       | Start on Android emulator      |

| `npm run ios`           | Start on iOS simulator         |│ └── schema.ts # Drizzle ORM schema| nativewind | ^4.0.0 | Tailwind CSS styling |

| `npm run web`           | Start web version              |

| `npm test`              | Run all tests                  |├── /features| drizzle-orm | ^0.29.0 | SQL ORM |

| `npm run test:watch`    | Run tests in watch mode        |

| `npm run test:coverage` | Run tests with coverage report |│ ├── /auth| expo-sqlite | ~13.2.0 | Local database |



## Firebase Setup│ │ └── /hooks| firebase | ^10.7.0 | Authentication |



### 1. Create Firebase Project│ │ └── useAuth.ts # Authentication hook| zustand | ^4.4.0 | State management |



1. Go to [Firebase Console](https://console.firebase.google.com)│ └── /transactions| react-native-reanimated | ~3.6.0 | Animations |

2. Click "Add project" and follow the setup wizard

3. Enable Google Analytics (optional)│ └── /hooks



### 2. Enable Authentication│ └── useTransactions.ts # Transaction CRUD hook## 🎨 Theme Colors



1. Go to **Authentication** > **Sign-in method**├── /lib

2. Enable **Email/Password** provider

│ ├── firebase.ts # Firebase initialization| Color | Hex | Usage |

### 3. Create Firestore Database

│ └── firestore.ts # Firestore sync functions| ---------- | --------- | ------------------- |

1. Go to **Firestore Database** > **Create database**

2. Start in **test mode** (or production with rules below)├── /store| Primary | `#a3e635` | Buttons, highlights |

3. Choose a region close to your users

│ ├── authStore.ts # Authentication state| Secondary | `#f472b6` | Accents |

### 4. Configure Security Rules

│ └── transactionStore.ts # Transaction state| Background | `#121212` | App background |

Go to **Firestore Database** > **Rules** and add:

├── /**tests** # Test files| Surface | `#1E1E1E` | Cards, inputs |

```javascript

rules_version = '2';│ ├── authStore.test.ts # Auth store tests| Income | `#22c55e` | Income indicators |

service cloud.firestore {

  match /databases/{database}/documents {│ ├── transactionStore.test.ts # Transaction store tests| Expense | `#ef4444` | Expense indicators |

    match /users/{userId} {

      allow read, write: if request.auth != null && request.auth.uid == userId;│ ├── transactionStats.test.ts # Statistics tests



      match /transactions/{transactionId} {│ └── integration.test.ts # Integration tests## 🏗 Architecture

        allow read, write: if request.auth != null && request.auth.uid == userId;

      }├── global.css # Tailwind CSS imports

    }

  }└── metro.config.js # Metro bundler config### Hybrid Local-First

}

````

### 5. Add Firebase Config- **Authentication:** Firebase Auth (Identity only)

Create a `.env` file in the project root with your Firebase config:## 🛠 Getting Started- **Data Storage:** Local SQLite database

```- **Security:** Data isolated per user via `user_id` column

EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key

EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com### Prerequisites

EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com### State Management

EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id

EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id- Node.js 18+

`````

- npm or yarn- **Global State:** Zustand stores

## Running Tests

- Expo Go app (SDK 52) on your phone- **Server State:** Local SQLite queries via Drizzle ORM

Fuduit includes comprehensive unit and integration tests using Jest.

- Firebase project (for authentication)

### Test Overview

## 📄 License

| Test File                  | Description                         | Tests    |

| -------------------------- | ----------------------------------- | -------- |### Installation

| `authStore.test.ts`        | Authentication state management     | 8 tests  |

| `transactionStore.test.ts` | Transaction CRUD operations         | 12 tests |MIT

| `transactionStats.test.ts` | Financial calculations & statistics | 10 tests |

| `integration.test.ts`      | End-to-end user workflows           | 6 tests  |1. **Clone the repository:**

   ```bash

**Total: 36 tests**   git clone https://github.com/MuhammadFasya/Fuduit.git

   cd Fuduit

### Running Tests````



```bash2. **Install dependencies:**

# Run all tests

npm test   ```bash

   npm install --legacy-peer-deps

# Run tests in watch mode (re-runs on file changes)   ```

npm run test:watch

3. **Configure Firebase** (see [Firebase Setup](#-firebase-setup))

# Run tests with coverage report

npm run test:coverage4. **Start the development server:**



# Run a specific test file   ```bash

npm test -- authStore.test.ts   npm start

```   ```



### Expected Output5. **Run on your device:**

   - Scan QR code with Expo Go app (Android)

```   - Scan QR code with Camera app (iOS)

 PASS  src/__tests__/transactionStats.test.ts

 PASS  src/__tests__/transactionStore.test.ts### Available Scripts

 PASS  src/__tests__/integration.test.ts

 PASS  src/__tests__/authStore.test.ts| Command                 | Description                    |

| ----------------------- | ------------------------------ |

Test Suites: 4 passed, 4 total| `npm start`             | Start Expo development server  |

Tests:       36 passed, 36 total| `npm run android`       | Start on Android emulator      |

Snapshots:   0 total| `npm run ios`           | Start on iOS simulator         |

Time:        5.814 s| `npm run web`           | Start web version              |

```| `npm test`              | Run all tests                  |

| `npm run test:watch`    | Run tests in watch mode        |

## Architecture| `npm run test:coverage` | Run tests with coverage report |



### Data Flow## 🔥 Firebase Setup



```### 1. Create Firebase Project

+------------------+     +------------------+     +------------------+

|   Firebase       |---->|   Auth Store     |---->|    UI Layer      |1. Go to [Firebase Console](https://console.firebase.google.com)

|   Auth           |     |   (Zustand)      |     |  (React Native)  |2. Click "Add project" and follow the setup wizard

+------------------+     +------------------+     +------------------+3. Enable Google Analytics (optional)

                                                          |

                                                          v### 2. Enable Authentication

+------------------+     +------------------+     +------------------+

|   Firestore      |<--->|  Transaction     |<----|  useTransactions |1. Go to **Authentication** → **Sign-in method**

|   (Cloud)        |     |  Store (Zustand) |     |  Hook            |2. Enable **Email/Password** provider

+------------------+     +------------------+     +------------------+

                                 ^### 3. Create Firestore Database

                                 |

                        +------------------+1. Go to **Firestore Database** → **Create database**

                        |   SQLite         |2. Start in **test mode** (or production with rules below)

                        |   (Local)        |3. Choose a region close to your users

                        +------------------+

```### 4. Configure Security Rules



### Offline-First StrategyGo to **Firestore Database** → **Rules** and add:



1. **Write Operations:**```javascript

   - Data saved to SQLite first (immediate)rules_version = '2';

   - Synced to Firestore in background (async)service cloud.firestore {

  match /databases/{database}/documents {

2. **Read Operations:**    match /users/{userId} {

   - Data read from local SQLite      allow read, write: if request.auth != null && request.auth.uid == userId;

   - Fast, works offline

      match /transactions/{transactionId} {

3. **User Isolation:**        allow read, write: if request.auth != null && request.auth.uid == userId;

   - All transactions tagged with `userId`      }

   - Queries always filter by current user    }

  }

## Screens}

`````

| Screen | Route | Description |

| --------------- | ------------------------- | ------------------------------- |### 5. Add Firebase Config

| Login | `/(auth)/login` | Email/password authentication |

| Register | `/(auth)/register` | New account creation |Update `src/lib/firebase.ts` with your config:

| Home | `/(tabs)/` | Dashboard with balance overview |

| Transactions | `/(tabs)/transactions` | Transaction history list |```typescript

| Add Transaction | `/(tabs)/add-transaction` | Add or edit transaction |const firebaseConfig = {

| Insights | `/(tabs)/insights` | Charts and analytics | apiKey: "YOUR_API_KEY",

| Settings | `/(tabs)/settings` | App preferences | authDomain: "YOUR_PROJECT.firebaseapp.com",

projectId: "YOUR_PROJECT_ID",

## API Reference storageBucket: "YOUR_PROJECT.appspot.com",

messagingSenderId: "YOUR_SENDER_ID",

### useAuth Hook appId: "YOUR_APP_ID",

};

`typescript`

const {

user, // Current Firebase user## 🧪 Running Tests

isLoading, // Loading state

signIn, // (email, password) => PromiseFuduit includes comprehensive unit and integration tests using Jest.

signUp, // (email, password) => Promise

signOut, // () => Promise### Test Overview

} = useAuth();

````| Test File                  | Description                         | Tests    |

| -------------------------- | ----------------------------------- | -------- |

### useTransactions Hook| `authStore.test.ts`        | Authentication state management     | 8 tests  |

| `transactionStore.test.ts` | Transaction CRUD operations         | 12 tests |

```typescript| `transactionStats.test.ts` | Financial calculations & statistics | 10 tests |

const {| `integration.test.ts`      | End-to-end user workflows           | 6 tests  |

  transactions,       // Transaction[]

  isLoading,          // Loading state**Total: 36 tests**

  fetchTransactions,  // (filter?) => Promise

  addTransaction,     // (data) => Promise<{success, error?}>### Running Tests

  updateTransaction,  // (id, data) => Promise<{success, error?}>

  deleteTransaction,  // (id) => Promise<{success, error?}>```bash

  getTransactionById, // (id) => Promise<Transaction | null># Run all tests

} = useTransactions();npm test

````

# Run tests in watch mode (re-runs on file changes)

### Transaction Typenpm run test:watch

````typescript# Run tests with coverage report

interface Transaction {npm run test:coverage

  id: number;

  userId: string;# Run a specific test file

  amount: number;npm test -- authStore.test.ts

  category: string;```

  type: "income" | "expense";

  date: Date;### Expected Output

  note: string | null;

}```

``` PASS  src/__tests__/transactionStats.test.ts

 PASS  src/__tests__/transactionStore.test.ts

## Theme Colors PASS  src/__tests__/integration.test.ts

 PASS  src/__tests__/authStore.test.ts

| Color          | Hex       | CSS Class     | Usage                       |

| -------------- | --------- | ------------- | --------------------------- |Test Suites: 4 passed, 4 total

| Primary        | `#a3e635` | `lime-400`    | Buttons, highlights, income |Tests:       36 passed, 36 total

| Secondary      | `#f472b6` | `pink-400`    | Accents                     |Snapshots:   0 total

| Background     | `#121212` | `neutral-950` | App background              |Time:        5.814 s

| Surface        | `#1E1E1E` | `neutral-900` | Cards, inputs               |```

| Text Primary   | `#FFFFFF` | `white`       | Main text                   |

| Text Secondary | `#A3A3A3` | `neutral-400` | Secondary text              |### Test Categories

| Income         | `#22c55e` | `green-500`   | Income indicators           |

| Expense        | `#ef4444` | `red-500`     | Expense indicators          |#### 1. Auth Store Tests (`authStore.test.ts`)



## SecurityTests for authentication state management:



- **Authentication:** Firebase Auth with secure token management- ✅ Initial state verification (user null, isLoading true)

- **Data Isolation:** All data filtered by `userId`- ✅ User login state management (setUser with valid user)

- **Local Storage:** SQLite with user-scoped queries- ✅ User logout functionality (logout clears user)

- **Cloud Security:** Firestore rules enforce user ownership- ✅ Loading state handling (setLoading updates correctly)

- **No Plain Passwords:** Firebase handles password hashing- ✅ Authentication status tracking (isAuthenticated flag)

- ✅ Multiple state transitions

## Contributing- ✅ Null user handling

- ✅ State persistence verification

1. Fork the repository

2. Create a feature branch (`git checkout -b feature/amazing-feature`)#### 2. Transaction Store Tests (`transactionStore.test.ts`)

3. Commit your changes (`git commit -m 'Add amazing feature'`)

4. Push to the branch (`git push origin feature/amazing-feature`)Tests for transaction CRUD operations:

5. Open a Pull Request

- ✅ Initial state with empty transactions array

## License- ✅ Adding single transaction

- ✅ Adding multiple transactions

MIT License - see [LICENSE](LICENSE) for details.- ✅ Updating existing transaction by ID

- ✅ Updating non-existent transaction (no-op)

---- ✅ Deleting transaction by ID

- ✅ Deleting non-existent transaction (no-op)

Built with Expo and React Native- ✅ Setting multiple transactions (bulk load)

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
````

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
