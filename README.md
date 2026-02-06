# Fuduit - Personal Finance Tracker

A fun and playful personal finance tracker built with Expo and React Native.

## 🚀 Tech Stack

- **Framework:** Expo SDK 50+ (Managed Workflow)
- **Language:** TypeScript (Strict)
- **Routing:** Expo Router v3
- **Styling:** NativeWind v4 (Tailwind CSS) + Reanimated
- **State:** Zustand
- **Database:** expo-sqlite/next + drizzle-orm
- **Auth:** Firebase Authentication
- **Icons:** lucide-react-native

## 📁 Project Structure

```
/src
  /app                    # Expo Router pages
    /(auth)               # Authentication screens
    /(tabs)               # Main app tabs
    _layout.tsx           # Root layout with providers
    +not-found.tsx        # 404 screen
  /components
    /ui                   # Base UI components
  /constants              # Theme and constants
  /db                     # Database setup (SQLite + Drizzle)
  /features
    /auth                 # Auth feature module
    /transactions         # Transactions feature module
  /lib                    # Third-party integrations
  /store                  # Zustand stores
```

## 🛠 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication with Email/Password
   - Copy your config to `src/lib/firebase.ts`

3. Start the development server:

   ```bash
   npm start
   ```

4. Run on your device:
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app

## 📦 Key Dependencies

| Package                 | Version | Purpose              |
| ----------------------- | ------- | -------------------- |
| expo                    | ~50.0.0 | Framework            |
| expo-router             | ~3.4.0  | File-based routing   |
| nativewind              | ^4.0.0  | Tailwind CSS styling |
| drizzle-orm             | ^0.29.0 | SQL ORM              |
| expo-sqlite             | ~13.2.0 | Local database       |
| firebase                | ^10.7.0 | Authentication       |
| zustand                 | ^4.4.0  | State management     |
| react-native-reanimated | ~3.6.0  | Animations           |

## 🎨 Theme Colors

| Color      | Hex       | Usage               |
| ---------- | --------- | ------------------- |
| Primary    | `#a3e635` | Buttons, highlights |
| Secondary  | `#f472b6` | Accents             |
| Background | `#121212` | App background      |
| Surface    | `#1E1E1E` | Cards, inputs       |
| Income     | `#22c55e` | Income indicators   |
| Expense    | `#ef4444` | Expense indicators  |

## 🏗 Architecture

### Hybrid Local-First

- **Authentication:** Firebase Auth (Identity only)
- **Data Storage:** Local SQLite database
- **Security:** Data isolated per user via `user_id` column

### State Management

- **Global State:** Zustand stores
- **Server State:** Local SQLite queries via Drizzle ORM

## 📄 License

MIT
