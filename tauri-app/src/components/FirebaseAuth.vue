<template>
  <div class="auth-container">
    <div v-if="!user" class="auth-section">
      <h3>Sign In with Google</h3>
      <p>Click the button below to sign in with your Google account</p>

      <button
        @click="handleGoogleSignIn"
        :disabled="loading"
        class="google-signin-btn"
      >
        <svg class="google-icon" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {{ loading ? "Signing in..." : "Sign in with Google" }}
      </button>
    </div>

    <!-- User Profile -->
    <div v-else class="user-profile">
      <div class="user-info">
        <img
          v-if="user.photoURL"
          :src="user.photoURL"
          :alt="user.displayName || 'User'"
          class="user-avatar"
        />
        <div class="user-details">
          <h3>Welcome, {{ user.displayName || user.email }}!</h3>
          <p class="user-email">{{ user.email }}</p>
          <p class="user-id">User ID: {{ user.uid }}</p>
        </div>
      </div>
      <button @click="handleSignOut" class="signout-btn">Sign Out</button>
    </div>

    <!-- Error Messages -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { User } from "firebase/auth";
import { AuthService } from "../firebase";

// Reactive data
const user = ref<User | null>(null);
const loading = ref(false);
const error = ref("");

// Auth state listener
let unsubscribe: (() => void) | null = null;

onMounted(() => {
  // Listen to auth state changes
  unsubscribe = AuthService.onAuthStateChange((currentUser) => {
    user.value = currentUser;
  });
});

onUnmounted(() => {
  // Clean up listener
  if (unsubscribe) {
    unsubscribe();
  }
});

// Methods
const handleGoogleSignIn = async () => {
  try {
    loading.value = true;
    error.value = "";
    await AuthService.signInWithGoogle();
  } catch (err: any) {
    error.value = err.message || "Google sign in failed";
  } finally {
    loading.value = false;
  }
};

const handleSignOut = async () => {
  try {
    await AuthService.signOut();
  } catch (err: any) {
    error.value = err.message || "Sign out failed";
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.auth-section {
  text-align: center;
  background: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.auth-section h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
  font-size: 1.5rem;
}

.auth-section p {
  color: #666;
  margin-bottom: 25px;
  font-size: 1rem;
}

.google-signin-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 12px 24px;
  background: #ffffff;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.google-signin-btn:hover:not(:disabled) {
  background: #f8f9fa;
  border-color: #adb5bd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.google-signin-btn:disabled {
  background: #f8f9fa;
  color: #adb5bd;
  cursor: not-allowed;
  box-shadow: none;
}

.google-icon {
  width: 20px;
  height: 20px;
}

.user-profile {
  background: #e8f5e8;
  padding: 25px;
  border-radius: 12px;
  border: 1px solid #c3e6c3;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-details h3 {
  margin: 0 0 8px 0;
  color: #2d5a2d;
  font-size: 1.3rem;
}

.user-email {
  margin: 0 0 5px 0;
  color: #4a7c4a;
  font-size: 0.95rem;
}

.user-id {
  margin: 0;
  color: #6b8e6b;
  font-size: 0.85rem;
  font-family: monospace;
}

.signout-btn {
  width: 100%;
  padding: 12px 24px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.signout-btn:hover {
  background: #c82333;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
  border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
  .auth-container {
    padding: 15px;
  }

  .user-info {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .user-avatar {
    width: 80px;
    height: 80px;
  }
}
</style>
