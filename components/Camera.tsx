
import { CameraView, CameraMountError, CameraType, useCameraPermissions } from 'expo-camera'
import React, { useState, Component } from 'react'
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface QRCodeScannerProps {
    onScan: (data: string) => void;
}


const Camera: React.FC<QRCodeScannerProps> = ({ onScan }) => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [torch, setTorch] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [cameraKey, setCameraKey] = useState(0);
    const [cameraError, setCameraError] = useState<string | null>(null);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const handleScanResult = ({ data }: { data: string }) => {
        if (isScanning) {
            onScan(data);
            setIsScanning(false);
        }
    };

    const handleMountError = (event: CameraMountError) => {
        setCameraError(event.message);
    };
    
    const retryCamera = () => {
        setCameraError(null);
        setCameraKey(prevKey => prevKey + 1); // Change key to force re-render
    };

    return (
        <View>
            {cameraError ? (
                <View>
                    <Text style={{ color: 'red' }}>Camera Error: {cameraError}</Text>
                    <Button title="Retry Camera" onPress={retryCamera} />
                </View>
            ) : (
                <CameraView
                    key={cameraKey} // Changing key forces a fresh re-mount
                    onBarcodeScanned={handleScanResult}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "pdf417"],
                    }}
                    style={[styles.camera, styles.shadow]}
                    facing={facing}
                    enableTorch={torch}
                    zoom={1}
                    onMountError={handleMountError}
                >
                </CameraView>
            )}
            <View style={{ alignItems: "center", marginTop: 16 }}>
                <TouchableOpacity onPress={() => setIsScanning(true)} style={[styles.scanBtn, styles.shadow]} >
                    <MaterialCommunityIcons name="qrcode-scan" size={25} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Camera

const styles = StyleSheet.create({
    navigationIcon: {
        color: '#FFF',
        fontSize: 25
    },
    navigationText: {
        color: '#FFF'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        height: 250,
        width: 250,
        overflow: "hidden",
        borderRadius: 10,
        marginTop: 30,
        shadowColor: "#000"
    },
    scanBtn: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#183B4E",
        color: "#FFF",
        justifyContent: 'center',
        alignItems: 'center'
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