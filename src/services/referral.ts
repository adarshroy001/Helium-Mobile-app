// Referral service
// API calls for referral codes, rewards, tracking, etc.

export interface ReferralStats {
  referralCode: string;
  totalReferrals: number;
  earnedAmount: number;
}

export interface ReferralResponse {
  success: boolean;
  stats?: ReferralStats;
  message?: string;
}

export const getReferralStats = async (userId: string): Promise<ReferralResponse> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        stats: {
          referralCode: 'HELIUM2024',
          totalReferrals: 12,
          earnedAmount: 480
        }
      });
    }, 1000);
  });
};

export const shareReferralCode = async (code: string): Promise<ReferralResponse> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Referral code shared successfully'
      });
    }, 500);
  });
};
