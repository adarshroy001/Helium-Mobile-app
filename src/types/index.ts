// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  PhoneOTP: undefined;
  NameInput: undefined;
  ProductVideos: undefined;
  MainApp: undefined;
  ProductDetail: { product: Product };
};

export type TabParamList = {
  Home: undefined;
  Shop: undefined;
  Referral: undefined;
  Support: undefined;
};

// Product types
export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  rating: number;
  image: string;
  specs: string[];
  discount?: string;
}

// User types
export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  countryCode: string;
}

// OTP types
export type OTPDigit = string;
export type OTPArray = [OTPDigit, OTPDigit, OTPDigit, OTPDigit, OTPDigit, OTPDigit];

// Category types
export type CategoryType = 'All' | 'ProMax' | 'EcoSmart' | 'Compact' | 'AC Units' | 'Accessories' | 'Parts' | 'Filters';

// FAQ types
export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

// Social Link types
export interface SocialLink {
  icon: string;
  label: string;
  action: () => void;
}

// Video types
export interface Video {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  thumbnail: string;
}

// Specification types
export interface Specification {
  label: string;
  value: string;
}

// Benefit types
export interface Benefit {
  icon: string;
  title: string;
  subtitle: string;
}

// Referral types
export interface ReferralStats {
  referralCode: string;
  totalReferrals: number;
  earnedAmount: number;
}
