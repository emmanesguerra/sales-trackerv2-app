import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, TextInput } from "react-native"
import Camera from '@/components/Camera'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useSQLiteContext } from 'expo-sqlite';
import { insertSalesRecord, getSalesRecords } from '@/db/sales';

export default function Index() {
  const [scannedText, setScannedText] = useState<string>('')
  const [code, setCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const database = useSQLiteContext();

  const saveRecord = async () => {
    await insertSalesRecord(database, code, name, quantity);
};

  const handleScan = (data: string) => {
    const [scannedCode, scannedName] = data.split("|"); // Splitting data
    setCode(scannedCode);
    setName(scannedName);
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const handleSave = () => {
    if (code.trim() && quantity > 0) {
      // insertSalesRecord(scannedText, quantity);
      saveRecord();
      alert('Sales record saved successfully!');
      setCode('');
      setName('');
      setQuantity(0);
    } else {
      alert('Please scan a product and enter a valid quantity.');
    }
  };

  return (
    <View className="flex-1 items-center" style={styles.mainBg} >
      <Camera onScan={handleScan} />

      {code && name ? (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={styles.itemCode}>Code: {code}</Text>
          <Text style={styles.itemName}>Item: {name}</Text>
          <Text style={styles.itemQuantity}>Sold Quantity</Text>

          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
              <FontAwesome6 name="minus" size={20} color="white" />
            </TouchableOpacity>

            <TextInput
              style={styles.quantityInput}
              placeholder="Enter quantity"
              keyboardType="numeric"
              value={String(quantity)}
              onChangeText={text => setQuantity(Number(text))}
            />

            <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
              <FontAwesome6 name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.submit, styles.shadow]} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Record</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={{ padding: 60, fontSize: 18, color: "#FFF", textAlign: "center" }}>
          Please scan a valid QR code to begin
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainBg: {
    backgroundColor: '#125172',
  },
  itemCode: {
    fontSize: 12,
    color: "#F5EEDC",
  },
  itemName: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "bold",
  },
  itemQuantity: {
    fontSize: 15,
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityInput: {
    height: 50,
    width: 90,
    borderColor: '#183B4E',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#27548A',
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#183B4E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3
  },
  submit: {
    backgroundColor: '#DDA853',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#183B4E',
  },
  shadow: {
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 9,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      elevation: 24,
  }
});