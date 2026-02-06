import { openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "./schema";

const DATABASE_NAME = "fuduit.db";

// Open the SQLite database
const expoDb = openDatabaseSync(DATABASE_NAME);

// Create the Drizzle ORM instance with schema
export const db = drizzle(expoDb, { schema });

// Export the raw expo-sqlite instance if needed for migrations
export { expoDb };
