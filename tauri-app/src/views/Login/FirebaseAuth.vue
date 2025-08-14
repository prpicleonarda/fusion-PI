<template>
  <div v-if="!user" class="flex flex-col items-center justify-center font-mono">
    <button
      @click="handleGoogleSignIn"
      :disabled="loading"
      class="google-signin-btn flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2"
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
      <span class="font-mono font-semibold text-offblack">
        {{ loading ? "Signing in..." : "Sign in with Google" }}
      </span>
      <svg
        class="arrow-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M13 5l7 7-7 7M5 12h14"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>

  <!-- Error Messages -->
  <div v-if="error" class="error-message">
    {{ error }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { User } from "firebase/auth";
import { AuthService } from "../../firebase";

const router = useRouter();

// Reactive data
const user = ref<User | null>(null);
const loading = ref(false);
const error = ref("");
const isSuperAdmin = ref(false);

// Check super admin status
const checkSuperAdminStatus = async () => {
  if (user.value) {
    isSuperAdmin.value = await AuthService.isWorkspaceSuperAdmin(user.value);
  } else {
    isSuperAdmin.value = false;
  }
};

// Watch for user changes and redirect
watch(user, async (newUser) => {
  console.log(
    "FirebaseAuth - User changed:",
    newUser ? "Logged in" : "Not logged in"
  );
  if (newUser) {
    console.log(
      "FirebaseAuth - User logged in, checking super admin status..."
    );
    await checkSuperAdminStatus();
    console.log("FirebaseAuth - Redirecting to dashboard...");
    // Redirect to dashboard after successful login
    router.push("/dashboard");
  }
});

// Auth state listener
let unsubscribe: (() => void) | null = null;

onMounted(() => {
  console.log("FirebaseAuth - Component mounted, setting up auth listener...");
  // Listen to auth state changes
  unsubscribe = AuthService.onAuthStateChange(async (currentUser) => {
    console.log(
      "FirebaseAuth - Auth state changed:",
      currentUser ? "User logged in" : "User logged out"
    );
    user.value = currentUser;
    if (currentUser) {
      console.log("FirebaseAuth - Processing logged in user...");
      await checkSuperAdminStatus();
    } else {
      console.log(
        "FirebaseAuth - User logged out, clearing super admin status"
      );
      isSuperAdmin.value = false;
    }
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
    console.log("FirebaseAuth - Starting Google sign in...");
    loading.value = true;
    error.value = "";
    await AuthService.signInWithGoogle();
    console.log("FirebaseAuth - Google sign in completed successfully");
    // Note: The redirect will happen automatically via the watch
  } catch (err: any) {
    console.error("FirebaseAuth - Google sign in failed:", err);
    error.value = err.message || "Google sign in failed";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
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
}
</style>
