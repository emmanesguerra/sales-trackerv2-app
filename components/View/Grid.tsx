import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';

type SalesRecord = { id: number; name: string; code: string; qty: number; date: string; time: string };

type RowViewProps = {
    data: SalesRecord[];
};

const { height } = Dimensions.get('window');

const maxHeight = height * 0.78;

const RowView: React.FC<RowViewProps> = ({ data }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.record}>
                    <Text style={styles.name}>{item.name} ({item.code})</Text>
                    <Text style={styles.details}>{item.qty} pcs - {item.time}</Text>
                </View>
            )}
            ListEmptyComponent={<Text style={styles.empty}>No sales records found</Text>}
            style={{ maxHeight: maxHeight }} 
        />
    );
};

const styles = StyleSheet.create({
    record: {
        backgroundColor: '#FFF',
        padding: 10,
        marginBottom: 8,
        borderRadius: 5,
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
        paddingVertical: 20,
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
    },
});

export default RowView;
