import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Button, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { getSalesRecords } from '@/db/sales';
import { useFocusEffect } from 'expo-router';

type SalesRecord = { id: number; code: string; name: string; qty: number; date: string; time: string };

export default function History() {
  const database = useSQLiteContext(); // Get SQLite instance
  const [data, setData] = useState<SalesRecord[]>([]);
  const [loading, setLoading] = useState(false);

  // Load sales data from SQLite
  const loadData = async () => {
    setLoading(true);
    const records = await getSalesRecords(database);
    setData(records);
    setLoading(false);
  };


  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sales History</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.record}>
            <Text style={styles.name}>{item.name} ({item.code})</Text>
            <Text style={styles.details}>{item.qty} pcs - {item.date} {item.time}</Text>
          </View>
        )}
      />

      {data.length === 0 && <Text style={styles.empty}>No sales records found</Text>}



      <Text style={styles.title}>Sales History</Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.cellHeader]}>Name</Text>
        <Text style={[styles.cell, styles.cellHeader]}>Qty</Text>
        <Text style={[styles.cell, styles.cellHeader]}>Time</Text>
      </View>

      {/* Table Rows */}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.qty}</Text>
            <Text style={styles.cell}>{item.time}</Text>
          </View>
        )}
      />

      {data.length === 0 && <Text style={styles.empty}>No sales records found</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  record: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 8,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
  empty: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },


  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#27548A',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#C1C1C1',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  cellHeader: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
