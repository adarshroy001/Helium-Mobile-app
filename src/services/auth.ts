import { User } from '../types';

// Authentication service
// API calls for login, logout, OTP verification, etc.

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface OTPRequest {
  phoneNumber: string;
  countryCode: string;
}

export interface OTPVerification {
  phoneNumber: string;
  countryCode: string;
  otp: string;
}

export const sendOTP = async (request: OTPRequest): Promise<AuthResponse> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'OTP sent successfully'
      });
    }, 1000);
  });
};

export const verifyOTP = async (verification: OTPVerification): Promise<AuthResponse> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'OTP verified successfully',
        user: {
          id: '1',
          name: '',
          phoneNumber: verification.phoneNumber,
          countryCode: verification.countryCode
        },
        token: 'dummy-token'
      });
    }, 1000);
  });
};
