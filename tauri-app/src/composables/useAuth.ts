import { ref, computed, onMounted, onUnmounted } from "vue";
import { User } from "firebase/auth";
import { AuthService } from "../firebase/auth";

export function useAuth() {
  // Reactive state
  const user = ref<User | null>(null);
  const loading = ref(true);
  const isSuperAdmin = ref(false);
  const accountType = ref<"user" | "workspace" | "admin">("user");

  // Computed properties
  const isLoggedIn = computed(() => !!user.value);
  const isWorkspaceUser = computed(
    () => accountType.value === "workspace" || accountType.value === "admin"
  );
  const isAdmin = computed(() => accountType.value === "admin");
  const userEmail = computed(() => user.value?.email || "");
  const userName = computed(
    () => user.value?.displayName || user.value?.email || ""
  );
  const userPhoto = computed(() => user.value?.photoURL || "");

  // Helper functions
  const checkAccountType = async (currentUser: User) => {
    try {
      if (!currentUser.email) {
        // Should not happen, but fallback to "user"
        accountType.value = "user";
        return;
      }

      // Check if it's a Gmail account
      if (currentUser.email.endsWith("@gmail.com")) {
        accountType.value = "user";
        return;
      }

      // Check if it's a Google Workspace account
      const isGoogleProvider = currentUser.providerData.some(
        (provider) => provider.providerId === "google.com"
      );

      if (isGoogleProvider) {
        const domain = currentUser.email.split("@")[1];
        const googleDomains = ["gmail.com", "googlemail.com"];

        if (!googleDomains.includes(domain)) {
          // Check if super admin
          const isAdmin = await AuthService.isWorkspaceSuperAdmin(currentUser);
          accountType.value = isAdmin ? "admin" : "workspace";
        } else {
          accountType.value = "user";
        }
      } else {
        accountType.value = "user";
      }
    } catch (error) {
      console.error("Error checking account type:", error);
      accountType.value = "user";
    }
  };

  const signIn = async () => {
    try {
      loading.value = true;
      await AuthService.signInWithGoogle();
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const signOut = async () => {
    try {
      await AuthService.signOut();
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  // Auth state listener
  let unsubscribe: (() => void) | null = null;

  onMounted(() => {
    unsubscribe = AuthService.onAuthStateChange(async (currentUser) => {
      user.value = currentUser;

      if (currentUser) {
        await checkAccountType(currentUser);
      } else {
        // User is logged out, so this composable should not be used
        accountType.value = "user";
        isSuperAdmin.value = false;
      }

      loading.value = false;
    });
  });

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  return {
    // State
    user,
    loading,
    isSuperAdmin,
    accountType,

    // Computed
    isLoggedIn,
    isWorkspaceUser,
    isAdmin,
    userEmail,
    userName,
    userPhoto,

    // Methods
    signIn,
    signOut,
    checkAccountType,
  };
}
