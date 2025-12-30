# Fuduit - Architecture Overview

## 📐 System Architecture

### Architecture Pattern: **Clean Architecture + Local-First**

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Home    │  │Transact. │  │ Insights │  │Settings │ │
│  │  Screen  │  │  Screen  │  │  Screen  │  │ Screen  │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬────┘ │
│       │             │               │              │     │
│  ┌────▼──────────────▼───────────────▼──────────────▼─┐ │
│  │              UI Components Layer                   │ │
│  │  • Button • Card • Input • Modal • FAB             │ │
│  │  • TransactionItem • GoalCard • InsightCard        │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────▼─────────────────────────────┐
│                   State Management Layer                   │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                   Zustand Stores                     │ │
│  │  • transactionStore  • categoryStore                │ │
│  │  • incomeSourceStore • goalStore                    │ │
│  │  • insightStore                                     │ │
│  └──────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────▼─────────────────────────────┐
│                   Business Logic Layer                     │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                   Services                           │ │
│  │  • InsightEngine (Rule-based analysis)              │ │
│  │  • Future: ML-based insights                        │ │
│  │  • Future: Predictive analytics                     │ │
│  └──────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────▼─────────────────────────────┐
│                   Data Access Layer                        │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                   Repositories                       │ │
│  │  • TransactionRepository                            │ │
│  │  • CategoryRepository                               │ │
│  │  • IncomeSourceRepository                           │ │
│  │  • GoalRepository                                   │ │
│  └──────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────▼─────────────────────────────┐
│                   Persistence Layer                        │
│  ┌──────────────────────────────────────────────────────┐ │
│  │              SQLite Database (Local)                 │ │
│  │  • transactions  • categories                       │ │
│  │  • incomeSources • goals                            │ │
│  └──────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### Adding a Transaction

```
User Input (QuickAddModal)
    ↓
transactionStore.addTransaction()
    ↓
TransactionRepository.create()
    ↓
SQLite INSERT
    ↓
Update Zustand State
    ↓
UI Re-renders
```

### Generating Insights

```
User Opens Insights Screen
    ↓
insightStore.generateInsights()
    ↓
InsightEngine.generate()
    ↓
Loop through InsightRules
    ↓
Each rule analyzes transactions
    ↓
Return Insight[] array
    ↓
Update Zustand State
    ↓
UI displays InsightCards
```

---

## 🧩 Key Design Patterns

### 1. Repository Pattern

Abstracts database operations from business logic:

```typescript
// Instead of direct SQL in components
const result = await db.query("SELECT * FROM transactions");

// Use repositories
const transactions = await TransactionRepository.findAll();
```

### 2. Strategy Pattern (Insight Rules)

Each insight rule is a self-contained strategy:

```typescript
interface InsightRule {
  type: string;
  generate: (transactions: Transaction[]) => Insight | null;
}

// Easy to add/remove rules
InsightEngine.addRule(new CustomRule());
```

### 3. Singleton Pattern (Database)

Single database instance shared across the app:

```typescript
let database: SQLiteDatabase | null = null;

export const getDatabase = () => {
  if (!database) throw new Error("Not initialized");
  return database;
};
```

### 4. Observer Pattern (Zustand)

Components subscribe to state changes:

```typescript
const { transactions } = useTransactionStore();
// Auto re-renders when transactions change
```

---

## 🎯 Component Hierarchy

### UI Components (Dumb Components)

**Purpose**: Reusable, presentation-only
**Rules**:

- No business logic
- Accept props, emit events
- Styled with theme constants
- Examples: Button, Card, Input

### Domain Components (Smart Components)

**Purpose**: Business-specific UI
**Rules**:

- Can use stores
- Contains domain logic
- Examples: TransactionItem, InsightCard

### Screen Components (Container Components)

**Purpose**: Compose components
**Rules**:

- Minimal logic (mostly data fetching)
- Use stores for state
- Layout and composition only

---

## 🗄️ Database Schema

### Tables

**transactions**

```sql
id              TEXT PRIMARY KEY
type            TEXT (income/expense)
amount          REAL
categoryId      TEXT (FK → categories.id)
incomeSourceId  TEXT (FK → incomeSources.id)
description     TEXT
date            TEXT (ISO 8601)
createdAt       TEXT
updatedAt       TEXT
```

**categories**

```sql
id          TEXT PRIMARY KEY
name        TEXT
icon        TEXT (emoji)
color       TEXT (theme color key)
type        TEXT (expense)
createdAt   TEXT
updatedAt   TEXT
```

**incomeSources**

```sql
id          TEXT PRIMARY KEY
name        TEXT
icon        TEXT (emoji)
color       TEXT (theme color key)
createdAt   TEXT
updatedAt   TEXT
```

**goals**

```sql
id             TEXT PRIMARY KEY
name           TEXT
targetAmount   REAL
currentAmount  REAL
deadline       TEXT (ISO 8601, optional)
color          TEXT
createdAt      TEXT
updatedAt      TEXT
```

### Indexes

```sql
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_categoryId ON transactions(categoryId);
```

---

## 🚀 Performance Considerations

### 1. Database Queries

- Use indexes on frequently queried columns
- Batch inserts for bulk operations
- Lazy load historical data

### 2. State Management

- Only subscribe to needed state slices
- Use selectors to prevent unnecessary re-renders
- Debounce frequent updates

### 3. Rendering

- Use `React.memo()` for expensive components
- Virtualize long lists (FlatList)
- Optimize images and assets

### 4. Charts

- Limit data points (max 12 months for line charts)
- Use chart libraries with native bindings
- Cache chart data in state

---

## 🔒 Security & Privacy

### No Authentication = No Leak

- No user accounts
- No passwords to steal
- No login tokens

### Local-Only Storage

- Data never transmitted
- No API endpoints
- No cloud backups (by default)

### Future Encryption (v2.0)

- Optional cloud backup with E2E encryption
- Device-level encryption using Expo SecureStore
- User controls encryption keys

---

## 🔮 Future Architecture (v2.0)

### AI-Powered Insights

```
┌─────────────────────────────┐
│     Insight Engine v2.0     │
├─────────────────────────────┤
│  Rule-Based Rules (Legacy)  │
│  ┌───────────────────────┐  │
│  │ • SpendingAnomaly     │  │
│  │ • CategoryFrequency   │  │
│  └───────────────────────┘  │
│                             │
│  ML-Based Rules (New)       │
│  ┌───────────────────────┐  │
│  │ • NLP Transaction     │  │
│  │   Categorization      │  │
│  │ • Predictive Spending │  │
│  │ • Personalized Tips   │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### Optional Cloud Sync

```
Local SQLite ←→ Sync Engine ←→ Encrypted Cloud Storage
     ↑                              ↓
     └──────── Conflict Resolution ──┘
```

---

## 📊 Scalability

### Current Limits

- **Transactions**: Tested up to 10,000 transactions
- **Categories**: Up to 50 custom categories
- **Goals**: Up to 20 active goals
- **Charts**: Max 12 months of data displayed

### Optimization Strategies (if needed)

1. **Pagination**: Load transactions in chunks
2. **Aggregation**: Pre-calculate monthly totals
3. **Archiving**: Move old data to separate table
4. **Indexing**: Add composite indexes for complex queries

---

## 🧪 Testing Strategy

### Unit Tests (Future)

```typescript
// Example test structure
describe("InsightEngine", () => {
  it("detects spending anomaly", () => {
    const transactions = mockTransactions();
    const insight = new SpendingAnomalyRule().generate(transactions);
    expect(insight).toBeDefined();
  });
});
```

### Integration Tests

- Test database operations
- Test store actions
- Test navigation flows

### E2E Tests (Future)

- Test complete user workflows
- Test offline functionality
- Test data persistence

---

## 🛠️ Development Workflow

### 1. Start Development

```bash
npm start
```

### 2. Make Changes

- Edit files in `src/`
- Hot reload applies changes automatically

### 3. Test on Device

- Scan QR code with Expo Go
- Changes reflect immediately

### 4. Build for Production

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

---

## 📚 Resources

### Documentation

- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [SQLite Docs](https://www.sqlite.org/docs.html)

### Learning Resources

- [React Native Tutorial](https://reactnative.dev/docs/tutorial)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Expo SQLite Guide](https://docs.expo.dev/versions/latest/sdk/sqlite/)

---

**Built with ❤️ for privacy-conscious individuals**
