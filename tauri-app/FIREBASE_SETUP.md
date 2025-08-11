# Firebase Setup Guide for Tauri App (Google Authentication)

This guide will help you set up Firebase with Google Authentication in your Tauri + Vue.js application.

## Prerequisites

1. **Firebase Project**: You need a Firebase project created at [Firebase Console](https://console.firebase.google.com/)
2. **Rust Installation**: Make sure Rust is installed (required for Tauri)

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard

## Step 2: Enable Google Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Google" authentication
5. Click on "Google" to configure it
6. Add your authorized domain (localhost for development)
7. Click "Save"

## Step 3: Enable Firestore Database

1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (you can secure it later)
4. Select a location for your database
5. Click "Done"

## Step 4: Get Firebase Configuration

1. Click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname
6. Copy the configuration object

## Step 5: Configure Environment Variables

1. Copy `env.example` to `.env` in your project root
2. Fill in your Firebase configuration values:

```bash
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Step 6: Test the Setup

1. Run your development server:

   ```bash
   npm run dev
   ```

2. Or run with Tauri:

   ```bash
   npm run tauri dev
   ```

3. Navigate to the Firebase Authentication section in your app
4. Click "Sign in with Google" and complete the Google OAuth flow

## Available Services

### Authentication (`AuthService`)

- `signInWithGoogle()` - Sign in with Google account
- `signOut()` - Sign out current user
- `getCurrentUser()` - Get current authenticated user
- `onAuthStateChange(callback)` - Listen to auth state changes

### Firestore (`FirestoreService`)

- `getDocument(collection, id)` - Get a single document
- `getDocuments(collection, constraints)` - Get multiple documents
- `addDocument(collection, data)` - Add new document
- `updateDocument(collection, id, data)` - Update existing document
- `deleteDocument(collection, id)` - Delete document
- Helper methods for common queries (where, orderBy, limit)

## Security Rules

### Firestore Security Rules

Update your Firestore security rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Allow authenticated users to read public data
    match /public/{document=**} {
      allow read: if request.auth != null;
    }
  }
}
```

### Authentication Rules

- Google authentication is enabled by default
- Users will be redirected to Google's OAuth consent screen
- Make sure your domain is authorized in Firebase Console

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/popup-closed-by-user)"**

   - User closed the Google sign-in popup
   - This is normal behavior, just try again

2. **"Firebase: Error (auth/popup-blocked)"**

   - Popup blocker is preventing the Google sign-in
   - Allow popups for your domain or use redirect method

3. **"Firebase: Error (auth/unauthorized-domain)"**

   - Your domain is not authorized in Firebase Console
   - Add localhost and your production domain to authorized domains

4. **"Failed to get cargo metadata"**
   - Install Rust: https://rustup.rs/
   - Restart your terminal after installation

### Debug Mode

Enable Firebase debug mode in your browser console:

```javascript
localStorage.setItem("debug", "firebase:*");
```

## Next Steps

1. **Add user profile management** with additional user data
2. **Implement real-time listeners** for live data updates
3. **Add offline support** with Firestore offline persistence
4. **Implement file uploads** using Firebase Storage
5. **Set up Firebase Hosting** for web deployment
6. **Add additional OAuth providers** (GitHub, Twitter, etc.)

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase JavaScript SDK](https://firebase.google.com/docs/web/setup)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Google Sign-In for Web](https://developers.google.com/identity/sign-in/web)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
