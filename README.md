# Sales Tracker Mobile App

**Sales Tracker Mobile App** is a mobile application built using **React Native** and **Expo** to help businesses manage their sales records. The app allows users to scan QR codes, input sales quantities, store records locally, and sync data via email.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Features](#features)
- [Future Development](#future-development)


## Tech Stack

The app is built with the following technologies:

- **React Native**: Framework for building cross-platform mobile apps.
- **Expo**: Platform for building and running React Native apps.
- **Expo SQLite**: Local database for storing sales records on the device.
- **Expo Camera**: Used for scanning QR codes.
- **React Navigation**: Navigation library for routing between screens.
- **Tailwind CSS (via Nativewind)**: Utility-first CSS framework for styling the app.
- **Jest**: JavaScript testing framework for unit and integration testing.

## Installation

### Prerequisites
Before running the app, ensure the following are installed:
- **Node.js** (version 16 or above)
- **Expo CLI** (for running the app)

To install Expo CLI:

```bash
npm install -g expo-cli
```

### Steps to Run the App

1. Clone the repository:

   ```bash
   git clone https://github.com/emmanesguerra/sales-trackerv2-app.git
   ```

2. Navigate to the project folder:

   ```bash
   cd sales-trackerv2-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the Expo project:

   ```bash
   npm run android
   ```

5. Open the app on your mobile device using the **Expo Go** app (available on Android and iOS).

### Running on Android/iOS Emulator:

- For **Android**:

  ```bash
  expo run:android
  ```

## Folder Structure

Here's the folder structure for the Sales Tracker Mobile App:

```
app/
├── (tabs)                   # This folder contains the layout and routing for the tab navigation.
│   ├── _layout.tsx          # The layout for the tab navigation.
│   └── index.tsx            # Entry point for the main tab navigation.
├── components/              # Reusable UI components.
│   ├── View/                # Contains components related to displaying different views.
│   └── Camera.tsx           # Camera component used for QR scanning.
├── db/                      # Database-related files.
│   ├── init.tsx             # Initializes the SQLite database.
│   └── sales.tsx            # Contains functions related to saving and retrieving sales records.
├── services/                # Services that handle app's external functionalities.
│   ├── csv/                 # Functions for exporting data to CSV.
│   ├── mail/                # Handles email synchronization for sales records.
```

## Features

- **Scan QR Codes/Barcodes**: Users can scan QR codes to add products to their sales records.
- **Input Product Quantity**: After scanning, users can input the quantity of products sold.
- **Local Storage**: Sales records are stored in the phone's local SQLite database.
- **Sales History**: View a list of all sales records, including product names, quantities, and timestamps.
- **End-of-Day Sync**: Sync the sales records via email to be uploaded to the local server
- **Intuitive User Interface**: Designed for ease of use with a simple and clean layout.


## Future Development

The following features and improvements are planned for future releases:

- **Cloud Syncing**: Implement cloud synchronization to back up sales data and access it across multiple devices.
- **User Authentication**: Add user accounts and authentication for personalized tracking of sales records.
- **Offline Mode Enhancements**: Improve offline functionality by automatically syncing records when the device reconnects to the internet.
- **Sales Analytics**: Add data visualizations like charts and graphs to display sales trends and performance.
- **Multi-language Support**: Support multiple languages for a wider audience.
