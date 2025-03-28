import { SQLiteDatabase } from 'expo-sqlite';

// Insert a new sales record
export const insertSalesRecord = async (database: SQLiteDatabase, code: string, name: string, quantity: number) => {
    try {
        const localTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get local time (HH:MM)
        await database.runAsync(
            'INSERT INTO sales (code, name, qty, time) VALUES (?, ?, ?, ?);',
            [code, name, quantity, localTime]
        );
        console.log('Sales record inserted successfully');
    } catch (error) {
        console.error('Error inserting sales record:', error);
    }
};

// Get all sales records
export const getSalesRecords = async (database: SQLiteDatabase): Promise<any[]> => {
    try {
        const result = await database.getAllAsync(
            `SELECT * FROM sales ORDER BY id DESC;`
        );
        return result;
    } catch (error) {
        console.error('Error fetching sales records:', error);
        return [];
    }
};

// Get sales records by a specific date
export const getSalesRecordsByDate = async (database: SQLiteDatabase, date: string): Promise<any[]> => {
    try {
        const result = await database.getAllAsync(
            `SELECT * FROM sales WHERE date = ? ORDER BY id DESC;`,
            [date]
        );
        return result;
    } catch (error) {
        console.error('Error fetching sales records by date:', error);
        return [];
    }
};

// Get all not sync sales records
export const getNotSyncSalesRecords = async (database: SQLiteDatabase): Promise<any[]> => {
    try {
        const result = await database.getAllAsync(
            `SELECT * FROM sales WHERE is_sync = 0;`
        );
        return result;
    } catch (error) {
        console.error('Error fetching sales records:', error);
        return [];
    }
};

// Update isSync to 1 for all sales records
export const updateAllSalesRecordsSyncStatus = async (database: SQLiteDatabase) => {
    try {
        await database.runAsync('UPDATE sales SET is_sync = 1 WHERE is_sync = 0;');
        console.log('All sales records have been marked as synced.');
    } catch (error) {
        console.error('Error updating sync status for all records:', error);
    }
};

// Clear sales records
export const clearSalesRecords = async (database: SQLiteDatabase) => {
    try {
        await database.runAsync('DELETE FROM sales;');
        console.log('Sales records cleared');
    } catch (error) {
        console.error('Error clearing sales records:', error);
    }
};
