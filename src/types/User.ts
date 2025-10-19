export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  telegram?: string;
  level: number;
  referralCode: string;
  referredByCode?: string | null;
  joinedReferralOwner?: string | null;
  role: "admin" | "moderator" | "user";
  isBanned: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
