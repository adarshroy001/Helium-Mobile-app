import { useState, useEffect } from 'react';
import { Product, User, ReferralStats } from '../types';
import * as AuthService from '../services/auth';
import * as ProductService from '../services/products';
import * as ReferralService from '../services/referral';

// Custom React hooks
// useAuth, useProducts, useReferral, etc.

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendOTP = async (phoneNumber: string, countryCode: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await AuthService.sendOTP({ phoneNumber, countryCode });
      return response.success;
    } catch (error) {
      console.error('Send OTP error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (phoneNumber: string, countryCode: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await AuthService.verifyOTP({ phoneNumber, countryCode, otp });
      if (response.success && response.user) {
        setUser(response.user);
      }
      return response.success;
    } catch (error) {
      console.error('Verify OTP error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    sendOTP,
    verifyOTP
  };
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProducts = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await ProductService.getProducts();
      if (response.success) {
        setProducts(response.products);
      }
    } catch (error) {
      console.error('Fetch products error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    isLoading,
    fetchProducts
  };
};

export const useReferral = (userId: string) => {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchReferralStats = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await ReferralService.getReferralStats(userId);
      if (response.success && response.stats) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Fetch referral stats error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchReferralStats();
    }
  }, [userId]);

  return {
    stats,
    isLoading,
    fetchReferralStats
  };
};
