import { Product, CategoryType } from '../types';

// Product service
// API calls for products, categories, search, etc.

export interface ProductResponse {
  success: boolean;
  products: Product[];
  message?: string;
}

export interface CategoryResponse {
  success: boolean;
  categories: CategoryType[];
  message?: string;
}

export const getProducts = async (): Promise<ProductResponse> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        products: [
          {
            id: 1,
            name: 'Helium ProMax 2.0',
            category: 'ProMax',
            price: '$1,299',
            rating: 4.8,
            image: '#90c9c4',
            specs: ['1.5 Ton', 'Inverter', '5 Star']
          },
          {
            id: 2,
            name: 'Helium EcoSmart Plus',
            category: 'EcoSmart',
            price: '$899',
            rating: 4.6,
            image: '#c5dfd3',
            specs: ['1 Ton', 'Energy Efficient', '4 Star']
          }
        ]
      });
    }, 1000);
  });
};

export const getCategories = async (): Promise<CategoryResponse> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        categories: ['All', 'ProMax', 'EcoSmart', 'Compact']
      });
    }, 500);
  });
};
