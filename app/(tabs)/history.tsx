import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { getSalesRecordsByDate } from '@/db/sales';
import { useFocusEffect } from 'expo-router';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import GridView from '@/components/View/Grid';
import TabularView from '@/components/View/Tabular';

type SalesRecord = { id: number; code: string; name: string; qty: number; date: string; time: string };

export default function History() {
  const database = useSQLiteContext(); // Get SQLite instance
  const [data, setData] = useState<SalesRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [displayGrid, setDisplayGrid] = useState(false); // toggle state

  const toggleDisplay = () => {
    setDisplayGrid((prevState) => !prevState); // toggle between the two icons
  };

  const onChange = async (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    
    const formattedDate = formatDate(currentDate);
    const records = await getSalesRecordsByDate(database, formattedDate);
    setData(records);
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Load sales data from SQLite
  const loadData = async () => {
    setLoading(true);
    const formattedDate = formatDate(date);
    const records = await getSalesRecordsByDate(database, formattedDate);
    setData(records);
    setLoading(false);
  };


  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView className="flex flex-row items-center justify-between p-2">
        <TouchableOpacity onPress={showDatepicker}>
          <Ionicons name="calendar-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={showDatepicker}>
          <Text className="text-lg font-bold">{`Sales for ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}</Text>
        </TouchableOpacity>
        {displayGrid ? (
          <Ionicons name="apps-sharp" size={24} color="black" className="mx-2" onPress={toggleDisplay} />
        ) : (
          <Ionicons name="list" size={24} color="black" className="mx-2" onPress={toggleDisplay} />
        )}
      </SafeAreaView>

      {displayGrid ? <GridView data={data} /> : <TabularView data={data} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5EEDC',
  },
});
