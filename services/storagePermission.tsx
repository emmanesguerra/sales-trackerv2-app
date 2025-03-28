import { PermissionsAndroid } from 'react-native';

export async function requestStoragePermission() {
  try {
    // Check the current permission status
    const permissionStatus = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );

    // If permission is already granted, no need to ask again
    if (PermissionsAndroid.RESULTS.GRANTED) {
      return; // Exit the function if permission is granted
    }

    // If permission is not granted, request it
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your storage to save files.',
        buttonPositive: 'OK',
      }
    );
    
  } catch (err) {
    throw err;
  }
}
