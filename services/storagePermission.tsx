import { PermissionsAndroid } from 'react-native';

export async function requestStoragePermission() {
  try {
    // Check the current permission status
    const permissionStatus = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );

    // If permission is already granted, no need to ask again
    if (PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission already granted');
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

    // Check if permission is granted after requesting
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission granted');
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
