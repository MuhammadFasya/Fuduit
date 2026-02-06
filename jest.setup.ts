// Jest setup file - minimal setup for store/hook testing

// Mock zustand's create function to work in Node environment
jest.mock("zustand", () => {
  const actualZustand = jest.requireActual("zustand");
  return actualZustand;
});

// Mock Firebase
jest.mock("@/lib/firebase", () => ({
  auth: {},
  db: {},
  app: {},
}));

// Mock Firestore functions
jest.mock("@/lib/firestore", () => ({
  syncTransactionToCloud: jest.fn().mockResolvedValue({ success: true }),
  deleteTransactionFromCloud: jest.fn().mockResolvedValue({ success: true }),
  fetchTransactionsFromCloud: jest
    .fn()
    .mockResolvedValue({ success: true, transactions: [] }),
}));

// Mock drizzle-orm db
jest.mock("@/db/client", () => ({
  db: {
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockResolvedValue([]),
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn().mockResolvedValue([]),
    update: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue([]),
  },
}));
