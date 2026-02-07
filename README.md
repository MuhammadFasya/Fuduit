# Fuduit - Personal Finance Tracker# Fuduit - Personal Finance Tracker# Fuduit - Personal Finance Tracker# Fuduit - Personal Finance Tracker

A fun and playful personal finance tracker built with Expo and React Native. Track your income and expenses, view insights, and manage your financial life with a beautiful dark-themed UI.A fun and playful personal finance tracker built with Expo and React Native. Track your income and expenses, view insights, and manage your financial life with a beautiful dark-themed UI.A fun and playful personal finance tracker built with Expo and React Native. Track your income and expenses, view insights, and manage your financial life with a beautiful dark-themed UI.A fun and playful personal finance tracker built with Expo and React Native.

![Fuduit App](./assets/icon.png)![Fuduit App](./assets/icon.png)![Fuduit App](./assets/icon.png)## 🚀 Tech Stack

## Table of Contents## Table of Contents## 📋 Table of Contents- **Framework:** Expo SDK 50+ (Managed Workflow)

- [Features](#features)- [Features](#features)- **Language:** TypeScript (Strict)

- [Tech Stack](#tech-stack)

- [Project Structure](#project-structure)- [Tech Stack](#tech-stack)

- [Getting Started](#getting-started)

- [Firebase Setup](#firebase-setup)- [Project Structure](#project-structure)- [Features](#-features)- **Routing:** Expo Router v3

- [Running Tests](#running-tests)

- [Architecture](#architecture)- [Getting Started](#getting-started)

- [Screens](#screens)

- [API Reference](#api-reference)- [Firebase Setup](#firebase-setup)- [Tech Stack](#-tech-stack)- **Styling:** NativeWind v4 (Tailwind CSS) + Reanimated

- [Theme Colors](#theme-colors)

- [License](#license)- [Running Tests](#running-tests)

## Features- [Architecture](#architecture)- [Project Structure](#-project-structure)- **State:** Zustand

- **Secure Authentication** - Firebase Email/Password authentication- [Screens](#screens)

- **Transaction Management** - Add, edit, and delete income/expenses

- **Financial Insights** - View charts and spending analytics- [API Reference](#api-reference)- [Getting Started](#-getting-started)- **Database:** expo-sqlite/next + drizzle-orm

- **Dark Mode** - Beautiful dark-themed UI with lime green accents

- **Offline-First** - Local SQLite database with cloud sync- [Theme Colors](#theme-colors)

- **Cloud Backup** - Firestore synchronization for data backup

- **Smooth Animations** - React Native Reanimated for fluid UX- [License](#license)- [Firebase Setup](#-firebase-setup)- **Auth:** Firebase Authentication

- **Fully Tested** - Unit and integration tests with Jest

## Features- [Running Tests](#-running-tests)- **Icons:** lucide-react-native

## Tech Stack

- **Secure Authentication** - Firebase Email/Password authentication- [Architecture](#-architecture)

| Category | Technology | Version |

| ---------------- | ------------------------- | -------- |- **Transaction Management** - Add, edit, and delete income/expenses

| Framework | Expo SDK | ~52.0.0 |

| Language | TypeScript | ^5.1.0 |- **Financial Insights** - View charts and spending analytics- [Screens](#-screens)## 📁 Project Structure

| Routing | Expo Router | ~4.0.0 |

| Styling | NativeWind (Tailwind CSS) | ^2.0.11 |- **Dark Mode** - Beautiful dark-themed UI with lime green accents

| Animations | React Native Reanimated | ~3.16.1 |

| State Management | Zustand | ^4.4.0 |- **Offline-First** - Local SQLite database with cloud sync- [API Reference](#-api-reference)

| Local Database | expo-sqlite + Drizzle ORM | ~15.1.0 |

| Authentication | Firebase Auth | ^10.7.0 |- **Cloud Backup** - Firestore synchronization for data backup

| Cloud Database | Firebase Firestore | ^10.7.0 |

| Icons | lucide-react-native | ^0.460.0 |- **Smooth Animations** - React Native Reanimated for fluid UX- [Theme Colors](#-theme-colors)```

| Testing | Jest + ts-jest | ^29.7.0 |

- **Fully Tested** - Unit and integration tests with Jest

## Project Structure

- [License](#-license)/src

`````

/src## Tech Stack

├── /app                        # Expo Router pages

│   ├── /(auth)                 # Authentication screens/app # Expo Router pages

│   │   ├── _layout.tsx         # Auth layout (no tabs)

│   │   ├── login.tsx           # Login screen| Category | Technology | Version |

│   │   └── register.tsx        # Registration screen

│   ├── /(tabs)                 # Main app tabs| ---------------- | ------------------------- | -------- |## ✨ Features /(auth) # Authentication screens

│   │   ├── _layout.tsx         # Tab navigator layout

│   │   ├── index.tsx           # Home/Dashboard screen| Framework | Expo SDK | ~52.0.0 |

│   │   ├── transactions.tsx    # Transaction history

│   │   ├── add-transaction.tsx # Add/Edit transaction| Language | TypeScript | ^5.1.0 | /(tabs) # Main app tabs

│   │   ├── insights.tsx        # Charts & analytics

│   │   └── settings.tsx        # App settings| Routing | Expo Router | ~4.0.0 |

│   ├── _layout.tsx             # Root layout with providers

│   └── +not-found.tsx          # 404 screen| Styling | NativeWind (Tailwind CSS) | ^2.0.11 |- 🔐 **Secure Authentication** - Firebase Email/Password authentication \_layout.tsx # Root layout with providers

├── /components

│   └── /ui                     # Reusable UI components| Animations | React Native Reanimated | ~3.16.1 |

│       └── Animated.tsx        # Animated components

├── /constants| State Management | Zustand | ^4.4.0 |- 💰 **Transaction Management** - Add, edit, and delete income/expenses +not-found.tsx # 404 screen

│   └── theme.ts                # Theme colors & constants

├── /db| Local Database | expo-sqlite + Drizzle ORM | ~15.1.0 |

│   ├── client.ts               # SQLite database client

│   ├── migrations.ts           # Database migrations| Authentication | Firebase Auth | ^10.7.0 |- 📊 **Financial Insights** - View charts and spending analytics /components

│   └── schema.ts               # Drizzle ORM schema

├── /features| Cloud Database | Firebase Firestore | ^10.7.0 |

│   ├── /auth

│   │   └── /hooks| Icons | lucide-react-native | ^0.460.0 |- 🌙 **Dark Mode** - Beautiful dark-themed UI with lime green accents /ui # Base UI components

│   │       └── useAuth.ts      # Authentication hook

│   └── /transactions| Testing | Jest + ts-jest | ^29.7.0 |

│       └── /hooks

│           └── useTransactions.ts  # Transaction CRUD hook- 📱 **Offline-First** - Local SQLite database with cloud sync /constants # Theme and constants

├── /lib

│   ├── firebase.ts             # Firebase initialization## Project Structure

│   └── firestore.ts            # Firestore sync functions

├── /store- ☁️ **Cloud Backup** - Firestore synchronization for data backup /db # Database setup (SQLite + Drizzle)

│   ├── authStore.ts            # Authentication state

│   └── transactionStore.ts     # Transaction state````

├── /__tests__                  # Test files

│   ├── authStore.test.ts/src- ✨ **Smooth Animations** - React Native Reanimated for fluid UX /features

│   ├── transactionStore.test.ts

│   ├── transactionStats.test.ts├── /app                    # Expo Router pages

│   └── integration.test.ts

├── global.css                  # Tailwind CSS imports│   ├── /(auth)             # Authentication screens- 🧪 **Fully Tested** - Unit and integration tests with Jest /auth # Auth feature module

└── metro.config.js             # Metro bundler config

```│   │   ├── _layout.tsx     # Auth layout (no tabs)



## Getting Started│   │   ├── login.tsx       # Login screen  /transactions # Transactions feature module



### Prerequisites│   │   └── register.tsx    # Registration screen



- Node.js 18+│   ├── /(tabs)             # Main app tabs## 🚀 Tech Stack /lib # Third-party integrations

- npm or yarn

- Expo Go app (SDK 52) on your phone│   │   ├── _layout.tsx     # Tab navigator layout

- Firebase project (for authentication)

│   │   ├── index.tsx       # Home/Dashboard screen/store # Zustand stores

### Installation

│   │   ├── transactions.tsx    # Transaction history

1. **Clone the repository:**

│   │   ├── add-transaction.tsx # Add/Edit transaction| Category | Technology | Version |```

   ```bash

   git clone https://github.com/MuhammadFasya/Fuduit.git│   │   ├── insights.tsx    # Charts & analytics

   cd Fuduit

   ```│   │   └── settings.tsx    # App settings|----------|------------|---------|



2. **Install dependencies:**│   ├── _layout.tsx         # Root layout with providers



   ```bash│   └── +not-found.tsx      # 404 screen| Framework | Expo SDK | ~52.0.0 |## 🛠 Getting Started

   npm install --legacy-peer-deps

   ```├── /components



3. **Configure Firebase** (see [Firebase Setup](#firebase-setup))│   └── /ui                 # Reusable UI components| Language | TypeScript | ^5.1.0 |



4. **Start the development server:**│       └── Animated.tsx    # Animated components



   ```bash├── /constants| Routing | Expo Router | ~4.0.0 |### Prerequisites

   npm start

   ```│   └── theme.ts            # Theme colors & constants



5. **Run on your device:**├── /db| Styling | NativeWind (Tailwind CSS) | ^4.0.0 |

   - Scan QR code with Expo Go app (Android)

   - Scan QR code with Camera app (iOS)│   ├── client.ts           # SQLite database client



### Available Scripts│   ├── migrations.ts       # Database migrations| Animations | React Native Reanimated | ~3.16.1 |- Node.js 18+



| Command                 | Description                    |│   └── schema.ts           # Drizzle ORM schema

| ----------------------- | ------------------------------ |

| `npm start`             | Start Expo development server  |├── /features| State Management | Zustand | ^4.4.0 |- npm or yarn

| `npm run android`       | Start on Android emulator      |

| `npm run ios`           | Start on iOS simulator         |│   ├── /auth

| `npm run web`           | Start web version              |

| `npm test`              | Run all tests                  |│   │   └── /hooks| Local Database | expo-sqlite + Drizzle ORM | ~15.1.0 |- Expo CLI (`npm install -g expo-cli`)

| `npm run test:watch`    | Run tests in watch mode        |

| `npm run test:coverage` | Run tests with coverage report |│   │       └── useAuth.ts  # Authentication hook



## Firebase Setup│   └── /transactions| Authentication | Firebase Auth | ^10.7.0 |



### 1. Create Firebase Project│       └── /hooks



1. Go to [Firebase Console](https://console.firebase.google.com)│           └── useTransactions.ts  # Transaction CRUD hook| Cloud Database | Firebase Firestore | ^10.7.0 |### Installation

2. Click "Add project" and follow the setup wizard

3. Enable Google Analytics (optional)├── /lib



### 2. Enable Authentication│   ├── firebase.ts         # Firebase initialization| Icons | lucide-react-native | ^0.460.0 |



1. Go to **Authentication** > **Sign-in method**│   └── firestore.ts        # Firestore sync functions

2. Enable **Email/Password** provider

├── /store| Testing | Jest + ts-jest | ^29.7.0 |1. Install dependencies:

### 3. Create Firestore Database

│   ├── authStore.ts        # Authentication state

1. Go to **Firestore Database** > **Create database**

2. Start in **test mode** (or production with rules below)│   └── transactionStore.ts # Transaction state## 📁 Project Structure ```bash

3. Choose a region close to your users

├── /__tests__              # Test files

### 4. Configure Security Rules

│   ├── authStore.test.tsnpm install

Go to **Firestore Database** > **Rules** and add:

│   ├── transactionStore.test.ts

```javascript

rules_version = '2';│   ├── transactionStats.test.ts`   `

service cloud.firestore {

  match /databases/{database}/documents {│   └── integration.test.ts

    match /users/{userId} {

      allow read, write: if request.auth != null && request.auth.uid == userId;├── global.css              # Tailwind CSS imports/src



      match /transactions/{transactionId} {└── metro.config.js         # Metro bundler config

        allow read, write: if request.auth != null && request.auth.uid == userId;

      }```├── /app # Expo Router pages2. Configure Firebase:

    }

  }

}

```## Getting Started│ ├── /(auth) # Authentication screens - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)



### 5. Add Firebase Config



Create a `.env` file in the project root with your Firebase config:### Prerequisites│ │ ├── \_layout.tsx # Auth layout (no tabs) - Enable Authentication with Email/Password



`````

EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key

EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com- Node.js 18+│ │ ├── login.tsx # Login screen - Copy your config to `src/lib/firebase.ts`

EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com- npm or yarn

EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id

EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id- Expo Go app (SDK 52) on your phone│ │ └── register.tsx # Registration screen

`````

- Firebase project (for authentication)

## Running Tests

│ ├── /(tabs) # Main app tabs3. Start the development server:

Fuduit includes comprehensive unit and integration tests using Jest.

### Installation

### Test Overview

│ │ ├── \_layout.tsx # Tab navigator layout

| Test File                  | Description                         | Tests    |

| -------------------------- | ----------------------------------- | -------- |1. **Clone the repository:**

| `authStore.test.ts`        | Authentication state management     | 8 tests  |

| `transactionStore.test.ts` | Transaction CRUD operations         | 12 tests |│ │ ├── index.tsx # Home/Dashboard screen ```bash

| `transactionStats.test.ts` | Financial calculations & statistics | 10 tests |

| `integration.test.ts`      | End-to-end user workflows           | 6 tests  |   ```bash



**Total: 36 tests**   git clone https://github.com/MuhammadFasya/Fuduit.git│ │ ├── transactions.tsx # Transaction history npm start



### Running Tests   cd Fuduit



```bash   ```│ │ ├── add-transaction.tsx # Add/Edit transaction ```

# Run all tests

npm test



# Run tests in watch mode (re-runs on file changes)2. **Install dependencies:**│ │ ├── insights.tsx # Charts & analytics

npm run test:watch



# Run tests with coverage report

npm run test:coverage   ```bash│ │ └── settings.tsx # App settings4. Run on your device:



# Run a specific test file   npm install --legacy-peer-deps

npm test -- authStore.test.ts

```   ```│ ├── \_layout.tsx # Root layout with providers - Press `i` for iOS Simulator



### Expected Output



```3. **Configure Firebase** (see [Firebase Setup](#firebase-setup))│ └── +not-found.tsx # 404 screen - Press `a` for Android Emulator

 PASS  src/__tests__/transactionStats.test.ts

 PASS  src/__tests__/transactionStore.test.ts

 PASS  src/__tests__/integration.test.ts

 PASS  src/__tests__/authStore.test.ts4. **Start the development server:**├── /components - Scan QR code with Expo Go app



Test Suites: 4 passed, 4 total

Tests:       36 passed, 36 total

Snapshots:   0 total   ```bash│ └── /ui # Reusable UI components

Time:        5.814 s

```   npm start



### Test Categories   ```│ └── Animated.tsx # Animated components## 📦 Key Dependencies



#### 1. Auth Store Tests (authStore.test.ts)



Tests for authentication state management:5. **Run on your device:**├── /constants



- Initial state verification (user null, isLoading true)   - Scan QR code with Expo Go app (Android)

- User login state management (setUser with valid user)

- User logout functionality (logout clears user)   - Scan QR code with Camera app (iOS)│ └── theme.ts # Theme colors & constants| Package | Version | Purpose |

- Loading state handling (setLoading updates correctly)

- Authentication status tracking (isAuthenticated flag)

- Multiple state transitions

- Null user handling### Available Scripts├── /db| ----------------------- | ------- | -------------------- |

- State persistence verification



#### 2. Transaction Store Tests (transactionStore.test.ts)

| Command                 | Description                    |│ ├── client.ts # SQLite database client| expo | ~50.0.0 | Framework |

Tests for transaction CRUD operations:

| ----------------------- | ------------------------------ |

- Initial state with empty transactions array

- Adding single transaction| `npm start`             | Start Expo development server  |│ ├── migrations.ts # Database migrations| expo-router | ~3.4.0 | File-based routing |

- Adding multiple transactions

- Updating existing transaction by ID| `npm run android`       | Start on Android emulator      |

- Updating non-existent transaction (no-op)

- Deleting transaction by ID| `npm run ios`           | Start on iOS simulator         |│ └── schema.ts # Drizzle ORM schema| nativewind | ^4.0.0 | Tailwind CSS styling |

- Deleting non-existent transaction (no-op)

- Setting multiple transactions (bulk load)| `npm run web`           | Start web version              |

- Clearing all transactions

- State immutability verification| `npm test`              | Run all tests                  |├── /features| drizzle-orm | ^0.29.0 | SQL ORM |

- Transaction ordering

- Partial update handling| `npm run test:watch`    | Run tests in watch mode        |



#### 3. Transaction Statistics Tests (transactionStats.test.ts)| `npm run test:coverage` | Run tests with coverage report |│ ├── /auth| expo-sqlite | ~13.2.0 | Local database |



Tests for financial calculations:



- Total income calculation## Firebase Setup│ │ └── /hooks| firebase | ^10.7.0 | Authentication |

- Total expense calculation

- Net balance calculation (income - expense)

- Category-wise grouping and totals

- Monthly aggregation### 1. Create Firebase Project│ │ └── useAuth.ts # Authentication hook| zustand | ^4.4.0 | State management |

- Percentage calculations

- Empty data handling (returns 0)

- Single transaction handling

- Large number handling1. Go to [Firebase Console](https://console.firebase.google.com)│ └── /transactions| react-native-reanimated | ~3.6.0 | Animations |

- Decimal precision

2. Click "Add project" and follow the setup wizard

#### 4. Integration Tests (integration.test.ts)

3. Enable Google Analytics (optional)│ └── /hooks

Tests for end-to-end user workflows:



- User registration > login > add transaction flow

- Multi-transaction management workflow### 2. Enable Authentication│ └── useTransactions.ts # Transaction CRUD hook## 🎨 Theme Colors

- User data isolation (User A can't see User B data)

- Transaction filtering by type

- Complete CRUD workflow (create, read, update, delete)

- Error handling for unauthenticated operations1. Go to **Authentication** > **Sign-in method**├── /lib



### Test Configuration2. Enable **Email/Password** provider



Tests are configured in `jest.config.js`:│ ├── firebase.ts # Firebase initialization| Color | Hex | Usage |



```javascript### 3. Create Firestore Database

module.exports = {

  preset: "ts-jest",│ └── firestore.ts # Firestore sync functions| ---------- | --------- | ------------------- |

  testEnvironment: "node",

  roots: ["<rootDir>/src"],1. Go to **Firestore Database** > **Create database**

  testMatch: ["**/__tests__/**/*.test.ts"],

  moduleNameMapper: {2. Start in **test mode** (or production with rules below)├── /store| Primary | `#a3e635` | Buttons, highlights |

    "^@/(.*)$": "<rootDir>/src/$1",

  },3. Choose a region close to your users

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  transform: {│ ├── authStore.ts # Authentication state| Secondary | `#f472b6` | Accents |

    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],

  },### 4. Configure Security Rules

};

```│ └── transactionStore.ts # Transaction state| Background | `#121212` | App background |



### Writing New TestsGo to **Firestore Database** > **Rules** and add:



To add new tests, create a file in `src/__tests__/` with the `.test.ts` extension:├── /**tests** # Test files| Surface | `#1E1E1E` | Cards, inputs |



```typescript```javascript

// src/__tests__/myFeature.test.ts

describe("My Feature", () => {rules_version = '2';│ ├── authStore.test.ts # Auth store tests| Income | `#22c55e` | Income indicators |

  beforeEach(() => {

    // Setup before each testservice cloud.firestore {

  });

  match /databases/{database}/documents {│ ├── transactionStore.test.ts # Transaction store tests| Expense | `#ef4444` | Expense indicators |

  it("should do something", () => {

    // Arrange    match /users/{userId} {

    const input = "test";

      allow read, write: if request.auth != null && request.auth.uid == userId;│ ├── transactionStats.test.ts # Statistics tests

    // Act

    const result = myFunction(input);



    // Assert      match /transactions/{transactionId} {│ └── integration.test.ts # Integration tests## 🏗 Architecture

    expect(result).toBe("expected");

  });        allow read, write: if request.auth != null && request.auth.uid == userId;

});

```      }├── global.css # Tailwind CSS imports



## Architecture    }



### Data Flow  }└── metro.config.js # Metro bundler config### Hybrid Local-First



```}

+------------------+     +------------------+     +------------------+

|   Firebase       |---->|   Auth Store     |---->|    UI Layer      |````

|   Auth           |     |   (Zustand)      |     |  (React Native)  |

+------------------+     +------------------+     +------------------+### 5. Add Firebase Config- **Authentication:** Firebase Auth (Identity only)

                                                          |

                                                          vCreate a `.env` file in the project root with your Firebase config:## 🛠 Getting Started- **Data Storage:** Local SQLite database

+------------------+     +------------------+     +------------------+

|   Firestore      |<--->|  Transaction     |<----|  useTransactions |```- **Security:** Data isolated per user via `user_id` column

|   (Cloud)        |     |  Store (Zustand) |     |  Hook            |

+------------------+     +------------------+     +------------------+EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key

                                 ^

                                 |EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com### Prerequisites

                        +------------------+

                        |   SQLite         |EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

                        |   (Local)        |

                        +------------------+EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com### State Management

`````

EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id

### Offline-First Strategy

EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id- Node.js 18+

1. **Write Operations:**
   - Data saved to SQLite first (immediate)`````

   - Synced to Firestore in background (async)

- npm or yarn- **Global State:** Zustand stores

2. **Read Operations:**
   - Data read from local SQLite## Running Tests

   - Fast, works offline

- Expo Go app (SDK 52) on your phone- **Server State:** Local SQLite queries via Drizzle ORM

3. **User Isolation:**
   - All transactions tagged with `userId`Fuduit includes comprehensive unit and integration tests using Jest.

   - Queries always filter by current user

- Firebase project (for authentication)

## Screens

### Test Overview

| Screen | Route | Description |

| --------------- | ------------------------- | ------------------------------- |## 📄 License

| Login | `/(auth)/login` | Email/password authentication |

| Register | `/(auth)/register` | New account creation || Test File | Description | Tests |

| Home | `/(tabs)/` | Dashboard with balance overview |

| Transactions | `/(tabs)/transactions` | Transaction history list || -------------------------- | ----------------------------------- | -------- |### Installation

| Add Transaction | `/(tabs)/add-transaction` | Add or edit transaction |

| Insights | `/(tabs)/insights` | Charts and analytics || `authStore.test.ts` | Authentication state management | 8 tests |

| Settings | `/(tabs)/settings` | App preferences |

| `transactionStore.test.ts` | Transaction CRUD operations | 12 tests |MIT

## API Reference

| `transactionStats.test.ts` | Financial calculations & statistics | 10 tests |

### useAuth Hook

| `integration.test.ts` | End-to-end user workflows | 6 tests |1. **Clone the repository:**

`````typescript

const {   ```bash

  user,       // Current Firebase user

  isLoading,  // Loading state**Total: 36 tests**   git clone https://github.com/MuhammadFasya/Fuduit.git

  signIn,     // (email, password) => Promise

  signUp,     // (email, password) => Promise   cd Fuduit

  signOut,    // () => Promise

} = useAuth();### Running Tests````

`````

### useTransactions Hook

````bash2. **Install dependencies:**

```typescript

const {# Run all tests

  transactions,       // Transaction[]

  isLoading,          // Loading statenpm test   ```bash

  fetchTransactions,  // (filter?) => Promise

  addTransaction,     // (data) => Promise<{success, error?}>   npm install --legacy-peer-deps

  updateTransaction,  // (id, data) => Promise<{success, error?}>

  deleteTransaction,  // (id) => Promise<{success, error?}># Run tests in watch mode (re-runs on file changes)   ```

  getTransactionById, // (id) => Promise<Transaction | null>

} = useTransactions();npm run test:watch

````

3. **Configure Firebase** (see [Firebase Setup](#-firebase-setup))

### Transaction Type

# Run tests with coverage report

````typescript

interface Transaction {npm run test:coverage4. **Start the development server:**

  id: number;

  userId: string;

  amount: number;

  category: string;# Run a specific test file   ```bash

  type: "income" | "expense";

  date: Date;npm test -- authStore.test.ts   npm start

  note: string | null;

}```   ```

````

## Theme Colors

### Expected Output5. **Run on your device:**

| Color | Hex | CSS Class | Usage |

| -------------- | --------- | ------------- | --------------------------- | - Scan QR code with Expo Go app (Android)

| Primary | `#a3e635` | `lime-400` | Buttons, highlights, income |

| Secondary | `#f472b6` | `pink-400` | Accents |``` - Scan QR code with Camera app (iOS)

| Background | `#121212` | `neutral-950` | App background |

| Surface | `#1E1E1E` | `neutral-900` | Cards, inputs | PASS src/**tests**/transactionStats.test.ts

| Text Primary | `#FFFFFF` | `white` | Main text |

| Text Secondary | `#A3A3A3` | `neutral-400` | Secondary text | PASS src/**tests**/transactionStore.test.ts### Available Scripts

| Income | `#22c55e` | `green-500` | Income indicators |

| Expense | `#ef4444` | `red-500` | Expense indicators | PASS src/**tests**/integration.test.ts

## Security PASS src/**tests**/authStore.test.ts| Command | Description |

- **Authentication:** Firebase Auth with secure token management| ----------------------- | ------------------------------ |

- **Data Isolation:** All data filtered by `userId`

- **Local Storage:** SQLite with user-scoped queriesTest Suites: 4 passed, 4 total| `npm start` | Start Expo development server |

- **Cloud Security:** Firestore rules enforce user ownership

- **No Plain Passwords:** Firebase handles password hashingTests: 36 passed, 36 total| `npm run android` | Start on Android emulator |

## ContributingSnapshots: 0 total| `npm run ios` | Start on iOS simulator |

1. Fork the repositoryTime: 5.814 s| `npm run web` | Start web version |

2. Create a feature branch (`git checkout -b feature/amazing-feature`)

3. Commit your changes (`git commit -m 'Add amazing feature'`)```| `npm test` | Run all tests |

4. Push to the branch (`git push origin feature/amazing-feature`)

5. Open a Pull Request| `npm run test:watch` | Run tests in watch mode |

## License## Architecture| `npm run test:coverage` | Run tests with coverage report |

MIT License - see [LICENSE](LICENSE) for details.

---### Data Flow## 🔥 Firebase Setup

Built with Expo and React Native

````### 1. Create Firebase Project

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

````

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
