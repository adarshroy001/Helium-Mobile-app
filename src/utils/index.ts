// Utility functions
// Format phone numbers, validate emails, format currency, etc.

export const formatPhoneNumber = (phoneNumber: string, countryCode: string): string => {
  return `${countryCode} ${phoneNumber}`;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
};

export const formatOTP = (otp: string[]): string => {
  return otp.join('');
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
