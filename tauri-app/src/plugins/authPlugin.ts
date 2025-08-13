import type { App } from "vue";
import { User } from "firebase/auth";
import {
  ACCOUNT_TYPES,
  getAccountType,
  hasPermission,
  canAccessFeature,
} from "../utils/authHelpers";

export const authPlugin = {
  install(app: App) {
    // Global properties
    app.config.globalProperties.$auth = {
      // Account types
      ACCOUNT_TYPES,

      // Helper functions
      // User is always logged in if they're auth (i.e., if user is not null)
      isLoggedIn: (user: User | null) => !!user,
      getUserEmail: (user: User | null) => user?.email || "",
      getUserName: (user: User | null) =>
        user?.displayName || user?.email || "",
      getUserPhoto: (user: User | null) => user?.photoURL || "",
      getAccountType,
      hasPermission,
      canAccessFeature,

      // Quick checks
      isGmail: (user: User | null) =>
        user?.email?.endsWith("@gmail.com") || false,
      isWorkspace: (user: User | null) =>
        getAccountType(user) === ACCOUNT_TYPES.WORKSPACE ||
        getAccountType(user) === ACCOUNT_TYPES.ADMIN,
      isAdmin: (user: User | null) =>
        getAccountType(user) === ACCOUNT_TYPES.ADMIN,
    };

    // Global mixin for components
    app.mixin({
      computed: {
        $isLoggedIn() {
          // User is always logged in if they're auth (i.e., if user is not null)
          return !!this.$store?.state?.user;
        },
        $accountType() {
          return this.$auth.getAccountType(this.$store?.state?.user || null);
        },
        $isAdmin() {
          return this.$auth.isAdmin(this.$store?.state?.user || null);
        },
        $isWorkspace() {
          return this.$auth.isWorkspace(this.$store?.state?.user || null);
        },
      },
      methods: {
        $hasPermission(permission: string) {
          return this.$auth.hasPermission(
            this.$store?.state?.user || null,
            permission
          );
        },
        $canAccessFeature(feature: string) {
          return this.$auth.canAccessFeature(
            this.$store?.state?.user || null,
            feature
          );
        },
      },
    });
  },
};
