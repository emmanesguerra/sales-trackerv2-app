import { SQLiteDatabase } from 'expo-sqlite';

// Setup tables (Pass database as a parameter)
export const setupDatabase = async (database: SQLiteDatabase) => {
    try {
        await database.execAsync(
            `
            CREATE TABLE IF NOT EXISTS sales (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                code TEXT NOT NULL, 
                name TEXT NOT NULL, 
                qty INTEGER NOT NULL, 
                date DATE DEFAULT (DATE('now')), 
                time TIME,
                is_sync INTEGER DEFAULT 0
            );`
        );
    } catch (error) {
        throw error;
    }
};
