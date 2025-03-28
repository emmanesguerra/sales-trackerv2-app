import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { requestStoragePermission } from '@/services/storagePermission';
import { sendMail } from '@/services/mail/sendMail';
import { generateCsv } from '@/services/csv/generateCsv';
import { useSQLiteContext } from 'expo-sqlite';
import { getNotSyncSalesRecords, updateAllSalesRecordsSyncStatus} from '@/db/sales';

export default function Guide() {

  const database = useSQLiteContext(); // Get SQLite instance

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const handleSendEmail = async () => {
    try {
      // Fetch unsync records
      const records = await getNotSyncSalesRecords(database);

      // Generate CSV
      const filePath = await generateCsv(records);

      sendMail(filePath);

      // update all non-sync records to is_sync = 1
      await updateAllSalesRecordsSyncStatus(database);

    } catch (error) {
      alert('There was an error processing the sales records.');
    }
  };

  return (
    <View style={styles.container}>
      {/* HOMEPAGE GUIDE */}
      <View style={styles.section}>
        <Text style={styles.header}>Homepage</Text>
        <View style={styles.item}>
          <Text style={styles.subHeader}>1. Align the QR code within the camera view</Text>
          <Text style={styles.subHeader}>2. Press <MaterialCommunityIcons name="qrcode-scan" size={16} color="black" /> to scan</Text>
          <Text style={styles.subHeader}>3. Verify the Item Name</Text>
          <Text style={styles.subHeader}>4. Verify the Sold Quantity</Text>
          <View style={styles.subSection}>
            <Text>- Sold Quantity can be changed manually or through <FontAwesome6 name="plus" size={16} color="black" /> and <FontAwesome6 name="minus" size={16} color="black" /> buttons</Text>
          </View>
          <Text style={styles.subHeader}>5. Tap "Save Record" to save the order</Text>
        </View>
      </View>

      {/* HISTORY PAGE GUIDE */}
      <View style={styles.section}>
        <Text style={styles.header}>Sales Page</Text>
        <View style={styles.item}>
          <Text style={styles.subHeader}>A. Changing the List of Records</Text>
          <View style={styles.subSection}>
            <Text>1. Press <Ionicons name="calendar-outline" size={16} color="black" /> or the Title to change the date</Text>
            <Text>2. Select a date and tap OK to refresh the lists</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.subHeader}>B. Changing the Display</Text>
          <View style={styles.subSection}>
            <Text>1. Press <Ionicons name="list" size={16} color="black" /> to change to List View</Text>
            <Text>2. Press <Ionicons name="apps-sharp" size={16} color="black" /> to change to Table View</Text>
          </View>
        </View>
      </View>

      {/* SYNCING DATA GUIDE */}
      <View style={styles.section}>
        <Text style={styles.header}>Syncing Data</Text>
        <Text>Press this <Feather name="send" size={16} color="black" /> below to send an email with the database attachment</Text>

        <View style={styles.submitContainer}>
          <TouchableOpacity style={styles.submit} className="flex-row justify-center items-center px-4 py-3" onPress={handleSendEmail}>
            <Feather style={styles.textShadow} name="send" size={24} color="white" />
            <Text style={styles.textShadow} className="text-white ml-2 text-2xl">Submit Records</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#F5EEDC',
  },
  section: {
    marginBottom: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  item: {
    marginBottom: 10,
  },
  subSection: {
    marginLeft: 20,
    marginBottom: 5,
  },
  submit: {
    backgroundColor: "#DDA853",
    borderWidth: 1,
    borderRadius: 50
  },
  submitContainer: {
    paddingHorizontal: 50,
    marginVertical: 25
  },
  textShadow: {
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
  }
});
