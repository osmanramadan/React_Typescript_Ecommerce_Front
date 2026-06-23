import type { Product } from "../types/product"

// Replace with a real API call once the backend is ready —
// see the async loader pattern further down.
export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Bamboo Cutlery Set', category: 'baby', price: 14.99, rating: 4.5, reviewCount: 128, image: '../../../src/assets/products/1.jfif', badge: 'bestseller', inStock: true },
  { id:2, name: 'Bamboo Toothbrush (4-pack)', category: 'personalcare', price: 11.0, rating: 4.5, reviewCount: 89, image: '../../../src/assets/products/2.jfif', badge: 'new', inStock: true },
  { id:3, name: 'Compost Bin, Countertop', category: 'baby', price: 27.0, rating: 4, reviewCount: 47, image: '../../../src/assets/products/3.jfif', inStock: false },
  { id:4, name: 'Seed Starter Kit', category: 'garden', price: 21.99, rating: 4.5, reviewCount: 36, image: '../../../src/assets/products/3.jpg', badge: 'new', inStock: true },
  { id:5, name: 'Reusable Produce Bags (5-pack)', category: 'kitchen', price: 12.0, rating: 4, reviewCount: 73, image: '../../../src/assets/products/2.jpg', inStock: true },
  { id:6, name: 'Reusable Produce Bags (5-pack)', category: 'kitchen', price: 12.0, rating: 4, reviewCount: 73, image: '../../../src/assets/products/1.jpg', inStock: true },
  { id:7, name: 'Wooden Baby Teether Set', category: 'tech', price: 16.5, rating: 5, reviewCount: 22, image: '../../../src/assets/products/2.jfif', badge: 'new', inStock: true },
  { id:8,oldPrice:22 , name: 'Wooden Baby Teether Set', category: 'tech', price: 16.5, rating: 5, reviewCount: 22, image: '../../../src/assets/products/3.jfif', badge: 'new', inStock: true },
  { id:9, name: 'Wooden Baby Teether Set', category: 'baby', price: 16.5, rating: 5, reviewCount: 22, image: '../../../src/assets/products/1.jpg', badge: 'new', inStock: true },
]