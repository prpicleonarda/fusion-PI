import { User } from "firebase/auth";

// Account type constants
export const ACCOUNT_TYPES = {
  USER: "user",
  WORKSPACE: "workspace",
  ADMIN: "admin",
} as const;

export type AccountType = (typeof ACCOUNT_TYPES)[keyof typeof ACCOUNT_TYPES];

// Helper functions
export const isLoggedIn = (user: User | null): boolean => {
  return !!user;
};

export const getUserEmail = (user: User | null): string => {
  return user?.email || "";
};

export const getUserName = (user: User | null): string => {
  return user?.displayName || user?.email || "Guest";
};

export const getUserPhoto = (user: User | null): string => {
  return user?.photoURL || "";
};

export const isGmailUser = (user: User | null): boolean => {
  return user?.email?.endsWith("@gmail.com") || false;
};

export const isGoogleWorkspaceUser = (user: User | null): boolean => {
  if (!user?.email) return false;

  const isGoogleProvider = user.providerData.some(
    (provider) => provider.providerId === "google.com"
  );

  if (!isGoogleProvider) return false;

  const domain = user.email.split("@")[1];
  const googleDomains = ["gmail.com", "googlemail.com", "google.com"];

  return !googleDomains.includes(domain);
};

export const getAccountType = (user: User | null): AccountType => {
  if (isGmailUser(user)) return ACCOUNT_TYPES.USER;
  if (isGoogleWorkspaceUser(user)) return ACCOUNT_TYPES.WORKSPACE;
  return ACCOUNT_TYPES.USER;
};

export const hasPermission = (
  user: User | null,
  permission: string
): boolean => {
  if (!user) return false;

  switch (permission) {
    case "admin":
      return getAccountType(user) === ACCOUNT_TYPES.ADMIN;
    case "workspace":
      return (
        getAccountType(user) === ACCOUNT_TYPES.WORKSPACE ||
        getAccountType(user) === ACCOUNT_TYPES.ADMIN
      );
    case "authenticated":
      return isLoggedIn(user);
    default:
      return false;
  }
};

// Role-based access control
export const canAccessFeature = (
  user: User | null,
  feature: string
): boolean => {
  if (!user) return false;

  const accountType = getAccountType(user);

  switch (feature) {
    case "admin-panel":
      return accountType === ACCOUNT_TYPES.ADMIN;
    case "workspace-features":
      return (
        accountType === ACCOUNT_TYPES.WORKSPACE ||
        accountType === ACCOUNT_TYPES.ADMIN
      );
    case "basic-features":
      return !!user;
    default:
      return false;
  }
};
