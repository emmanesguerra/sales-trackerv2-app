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
            `SELECT code, name, qty, date, time FROM sales ORDER BY date DESC, time DESC;`
        );
        return result;
    } catch (error) {
        console.error('Error fetching sales records:', error);
        return [];
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
