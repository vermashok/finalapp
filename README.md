React Native App Backend & Mobile Integration

This project consists of a Node.js backend API server and a React Native mobile application. The implementation is based on the logic provided in this Gist reference.

🛠 Backend Setup & Installation

Follow these steps to set up the API server located at vermashok/app-backend.

1. Clone and Install

First, clone the repository and install the necessary dependencies:

git clone [https://github.com/vermashok/app-backend.git](https://github.com/vermashok/app-backend.git)
cd app-backend
npm install


2. Configure Database (Constants.js)

You must define your connection string in the constants.js file.

Locate constants.js in the project root.

// constants.js example
export const DATABASE_URL = "http://localhost:3000/api/";


3. Network & Firewall Configuration (Crucial)

To allow your mobile device to communicate with your local server, you must configure your network settings:

Find Local IP: Run ipconfig (Windows) or ifconfig (Mac/Linux). Your IP will look like 192.168.1.1XX.

Turn Off Firewall: * Locally: Temporarily disable your OS firewall or create an "Inbound Rule" to allow the specific port (e.g., 3000, 4000).

Access: Ensure the server is accessed via http://192.168.1.1XX:PORT rather than localhost.

Run Server:

npm run start


📱 React Native Mobile App (Expo)

This application is built using React Native. We use Expo to run and build the app efficiently.

1. Run in Development

To start the project and generate a QR code for testing:

npx expo start


Scan QR: Open the Expo Go app on your phone and scan the QR code displayed in your terminal.

Note: Both your computer and your mobile phone must be on the same Wi-Fi network (192.168.1.XX).

2. Build Commands

To generate standalone files for the mobile app, use the following Expo commands:

For Android (APK/AAB):




🔗 Important Links

Backend Repository: github.com/vermashok/app-backend

Logic Implementation Gist: [gist.github.com/gauravre/...](https://gist.github.com/gauravre/732ebe9fb92a1a5919be015c0ab3da8a)

Developed as a full-stack React Native solution.