import { Stack, Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { useEffect } from 'react';
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { setupDatabase } from '@/db/init';

const TabIcon = ({ focused, title, icon }: any) => {
  if (focused) {
    return (
      <ImageBackground style={styles.navigationBg} className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center">
        <MaterialCommunityIcons name={icon} style={styles.navigationIcon} />
        <Text className="ml-2" style={styles.navigationText}>{title}</Text>
      </ImageBackground>
    )
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <MaterialCommunityIcons name={icon} size={25} color='#FFF' />
    </View>
  )
}

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="sales_tracker.db" onInit={setupDatabase}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarStyle: {
            backgroundColor: "#183B4E",
            borderRadius: 50,
            height: 52,
            marginHorizontal: 20,
            marginBottom: 10,
            position: 'absolute',
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#183B4E'
          }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                title="Home"
                icon="home-circle-outline"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'Sales',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                title="Sales"
                icon="history"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="guide"
          options={{
            title: 'Guide',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                title="Guide"
                icon="information-outline"
              />
            ),
          }}
        />
      </Tabs>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  navigationBg: {
    backgroundColor: '#27548A',
    borderRadius: 50
  },
  navigationIcon: {
    color: '#FFF',
    fontSize: 25
  },
  navigationText: {
    color: '#FFF'
  }
});