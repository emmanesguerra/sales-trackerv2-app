import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

type SalesRecord = { id: number; name: string; code: string; qty: number; date: string; time: string };

type TabularViewProps = {
    data: SalesRecord[];
};

const { height } = Dimensions.get('window');

const maxHeight = height * 0.7;

const TabularView: React.FC<TabularViewProps> = ({ data }) => {
    return (
        <View style={styles.container}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
                <Text style={[styles.cell, styles.cellHeader]}>Name</Text>
                <Text style={[styles.cell, styles.cellHeader, styles.center]}>Qty</Text>
                <Text style={[styles.cell, styles.cellHeader, styles.center]}>Time</Text>
            </View>

            {/* Scrollable Table Body */}
            {data.length === 0 ? (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No Data</Text>
                </View>
            ) : (
                // Scrollable Table Body
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.tableRow}>
                            <Text style={styles.cell}>{item.name}</Text>
                            <Text style={[styles.cell, styles.center]}>{item.qty}</Text>
                            <Text style={[styles.cell, styles.center]}>{item.time}</Text>
                        </View>
                    )}
                    contentContainerStyle={styles.tableBody}
                    style={{ maxHeight: maxHeight }} 
                />
            )}
        </View>
    );
};

export default TabularView;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#27548A',
        paddingVertical: 10,
        justifyContent: 'space-between',
        marginBottom: 5,
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
        paddingHorizontal: 5,
    },
    cellHeader: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    center: {
        textAlign: "center"
    },
    tableBody: {
        paddingBottom: 10,
        backgroundColor: '#FFF',
    },
    noDataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    noDataText: {
        fontSize: 18,
        color: '#999',
    },
});
