import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "./config";

export class AuthService {
  // Google Sign In
  static async signInWithGoogle(): Promise<UserCredential> {
    try {
      const provider = new GoogleAuthProvider();
      // Add scopes for Google Workspace detection
      provider.addScope("profile");
      provider.addScope("email");
      // Add Admin SDK scopes to check user roles
      provider.addScope(
        "https://www.googleapis.com/auth/admin.directory.user.readonly"
      );
      provider.addScope(
        "https://www.googleapis.com/auth/admin.directory.rolemanagement.readonly"
      );

      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  }

  // Check if user is Google Workspace Super Admin
  static async isWorkspaceSuperAdmin(user: User): Promise<boolean> {
    try {
      // Check if user has a Google Workspace domain (not @gmail.com)
      if (user.email && !user.email.endsWith("@gmail.com")) {
        const isGoogleProvider = user.providerData.some(
          (provider) => provider.providerId === "google.com"
        );

        if (isGoogleProvider) {
          const domain = user.email.split("@")[1];
          const googleDomains = ["gmail.com", "googlemail.com", "google.com"];

          if (!googleDomains.includes(domain)) {
            // Get the ID token to make authenticated requests to Google APIs
            const idToken = await user.getIdToken();

            // Check if user is super admin using Google Admin SDK
            return await this.checkSuperAdminStatus(user.email, idToken);
          }
        }
      }
      return false;
    } catch (error) {
      console.error("Error checking super admin status:", error);
      return false;
    }
  }

  // Check super admin status using Google Admin SDK
  private static async checkSuperAdminStatus(
    email: string,
    idToken: string
  ): Promise<boolean> {
    try {
      // Use Google Admin SDK to check user roles
      // This requires the user to have granted the necessary scopes
      const response = await fetch(
        `https://admin.googleapis.com/admin/directory/v1/users/${email}?fields=isAdmin,isEnforcedIn2Sv,isEnrolledIn2Sv,isSuperAdmin`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        // Check if user is a super admin
        return userData.isSuperAdmin === true;
      } else {
        console.warn("Could not fetch user admin status:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Error calling Google Admin API:", error);
      return false;
    }
  }

  // Sign out
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  }

  // Get current user
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  // Listen to auth state changes
  static onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }
}
