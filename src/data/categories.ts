import type  Category  from "../types/category"

export const CATEGORIES: Category[] = [
  { slug: 'tech', name: 'tech', description: 'Sustainable essentials for everyday living',image:'../../../src/assets/products/tech.jpg' },
  { slug: 'kitchen', name: 'Kitchen', description: 'Reusable and compostable kitchenware' , image:'../../../src/assets/products/kitchen.jfif' },
  { slug: 'personal-care', name: 'Personal Care', description: 'Plastic-free hygiene and beauty' , image:'../../../src/assets/products/care.jfif' },
  { slug: 'garden', name: 'Garden', description: 'Tools and seeds for growing your own' , image:'../../../src/assets/products/garden.jpg' },
  { slug: 'baby', name: 'Baby & Kids', description: 'Non-toxic essentials for little ones' , image:'../../../src/assets/products/baby.jfif'  },
  { slug: 'pets', name: 'Pets', description: 'Eco-friendly pet care' ,image:'../../../src/assets/products/pet.jpg'  },
]

const CATEGORY_SLUGS = new Set(CATEGORIES.map((c) => c.slug))

export const isValidCategory = (slug: string | undefined): boolean =>!!slug && CATEGORY_SLUGS.has(slug.toLowerCase())

export const getCategory = (slug: string): Category | undefined => CATEGORIES.find((c) => c.slug === slug.toLowerCase())