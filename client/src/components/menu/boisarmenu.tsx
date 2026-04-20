export interface BoisarMenuItem {
  id: number
  name: string
  type: string
  prices: number[]
  options?: string[]
  category: string
}

export interface BoisarMenuCategory {
  category: string
  items: BoisarMenuItem[]
}

export const boisarMenuData: BoisarMenuCategory[] = [
  {
    category: 'Soups',
    items: [
      { id: 1, name: 'Rustic Fresh Tomato', type: 'veg', prices: [149], category: 'Soups' },
      { id: 2, name: 'Cream of Soup', type: 'veg/nonVeg', prices: [159, 179], options: ['Mushroom', 'Corn', 'Chicken'], category: 'Soups' },
      { id: 3, name: 'Minestrone Tomato', type: 'veg', prices: [159], category: 'Soups' },
      { id: 4, name: 'Minestrone Pesto', type: 'veg', prices: [159], category: 'Soups' },
      { id: 5, name: 'Sweet Corn Soup', type: 'veg/nonVeg', prices: [139, 159, 189], category: 'Soups' },
      { id: 6, name: 'Manchow Soup', type: 'veg/nonVeg', prices: [149, 169, 199], category: 'Soups' },
      { id: 7, name: 'Tom Yum', type: 'veg/nonVeg', prices: [149, 169, 199], category: 'Soups' },
      { id: 8, name: 'Tom Kha', type: 'veg/nonVeg', prices: [159, 179, 209], category: 'Soups' },
      { id: 9, name: 'Hot & Sour', type: 'veg/nonVeg', prices: [149, 169, 199], category: 'Soups' },
    ],
  },
  {
    category: 'Momos',
    items: [
      { id: 10, name: 'Veg Cheese Momo', type: 'veg', prices: [189], category: 'Momos' },
      { id: 11, name: 'Veg Tibetan Momo', type: 'veg', prices: [199], category: 'Momos' },
      { id: 12, name: 'Paneer Chilli Momo', type: 'veg', prices: [199], category: 'Momos' },
      { id: 13, name: 'Chicken Cheese Momo', type: 'nonVeg', prices: [219], category: 'Momos' },
      { id: 14, name: 'Chicken Tibetan Momo', type: 'nonVeg', prices: [229], category: 'Momos' },
      { id: 15, name: 'Chicken Chilli Momo', type: 'nonVeg', prices: [229], category: 'Momos' },
    ],
  },
  {
    category: 'Garlic Bread & Anti-Pasto',
    items: [
      { id: 16, name: 'Plain Garlic Bread', type: 'veg', prices: [149], category: 'Garlic Bread & Anti-Pasto' },
      { id: 17, name: 'Cheese Garlic Bread', type: 'veg', prices: [179], category: 'Garlic Bread & Anti-Pasto' },
      { id: 18, name: 'Cheese Chilli Garlic Bread', type: 'veg', prices: [179], category: 'Garlic Bread & Anti-Pasto' },
      { id: 19, name: 'Garlic Bread Delight', type: 'veg', prices: [189], category: 'Garlic Bread & Anti-Pasto' },
      { id: 20, name: 'Garlic Bread Corn Jalapeno', type: 'veg', prices: [199], category: 'Garlic Bread & Anti-Pasto' },
      { id: 21, name: 'Garlic Bread Supreme', type: 'veg', prices: [219], category: 'Garlic Bread & Anti-Pasto' },
    ],
  },
  {
    category: 'Baos',
    items: [
      { id: 22, name: 'BBQ Paneer Bao', type: 'veg', prices: [239], category: 'Baos' },
      { id: 23, name: 'BBQ Chicken Bao', type: 'nonVeg', prices: [269], category: 'Baos' },
      { id: 24, name: 'Devils Bao', type: 'veg/nonVeg', prices: [249, 269], category: 'Baos' },
      { id: 25, name: 'Thai Basil Bao', type: 'veg/nonVeg', prices: [249, 269], category: 'Baos' },
      { id: 26, name: 'Korean Fried Bao', type: 'veg/nonVeg', prices: [249, 269], category: 'Baos' },
      { id: 27, name: 'Prawns Chilly Basil Bao', type: 'seafood', prices: [289], category: 'Baos' },
    ],
  },
  {
    category: 'Fries',
    items: [
      { id: 28, name: 'Classic Fries', type: 'veg', prices: [149], category: 'Fries' },
      { id: 29, name: 'Cheesy Fries', type: 'veg', prices: [179], category: 'Fries' },
      { id: 30, name: 'Peri Peri Fries', type: 'veg', prices: [159], category: 'Fries' },
      { id: 31, name: 'NYK Style Fries', type: 'nonVeg', prices: [249], category: 'Fries' },
      { id: 32, name: 'Butter Chicken Fries', type: 'nonVeg', prices: [249], category: 'Fries' },
    ],
  },
  {
    category: 'Pizza',
    items: [
      { id: 33, name: 'Margherita', type: 'veg', prices: [189, 249], category: 'Pizza' },
      { id: 34, name: 'Farmhouse', type: 'veg', prices: [219, 319], category: 'Pizza' },
      { id: 35, name: 'Tandoori Paneer', type: 'veg', prices: [289, 429], category: 'Pizza' },
      { id: 36, name: 'Mexican Veg Pizza', type: 'veg', prices: [259, 359], category: 'Pizza' },
      { id: 37, name: 'Peri Peri Chicken', type: 'nonVeg', prices: [269, 369], category: 'Pizza' },
      { id: 38, name: 'BBQ Chicken', type: 'nonVeg', prices: [269, 369], category: 'Pizza' },
    ],
  },
  {
    category: 'Pasta',
    items: [
      { id: 39, name: 'Arrabiata', type: 'veg', prices: [249, 269], category: 'Pasta' },
      { id: 40, name: 'Alfredo', type: 'veg', prices: [249, 269], category: 'Pasta' },
      { id: 41, name: 'Aglio Olio', type: 'veg', prices: [249, 269], category: 'Pasta' },
      { id: 42, name: 'Creamy Pesto', type: 'veg', prices: [249, 269], category: 'Pasta' },
      { id: 43, name: 'Bolognese', type: 'nonVeg', prices: [279], category: 'Pasta' },
    ],
  },
  {
    category: 'Starters',
    items: [
      { id: 44, name: 'Exotic Pan Tossed Veg', type: 'veg', prices: [249], category: 'Starters' },
      { id: 45, name: 'Crispy Chilli Potato', type: 'veg', prices: [249], category: 'Starters' },
      { id: 46, name: 'Chicken Lollipop', type: 'nonVeg', prices: [269], category: 'Starters' },
      { id: 47, name: 'Chicken Popcorn', type: 'nonVeg', prices: [269], category: 'Starters' },
      { id: 48, name: 'Butter Garlic Prawns', type: 'seafood', prices: [319], category: 'Starters' },
    ],
  },
  {
    category: 'Rice & Noodles',
    items: [
      { id: 49, name: 'Fried Rice', type: 'veg/nonVeg/seafood', prices: [239, 259, 299], category: 'Rice & Noodles' },
      { id: 50, name: 'Sichuan Rice / Noodles', type: 'veg/nonVeg/seafood', prices: [249, 269, 319], category: 'Rice & Noodles' },
      { id: 51, name: 'Hakka Noodles', type: 'veg/nonVeg/seafood', prices: [249, 269, 319], category: 'Rice & Noodles' },
      { id: 52, name: 'Triple Sichuan Rice', type: 'veg/nonVeg/seafood', prices: [279, 299, 349], category: 'Rice & Noodles' },
    ],
  },
  {
    category: 'Desserts',
    items: [
      { id: 53, name: 'Choco Lava Cake', type: 'veg', prices: [129], category: 'Desserts' },
      { id: 54, name: 'Sizzling Brownie', type: 'veg', prices: [189], category: 'Desserts' },
      { id: 55, name: 'Baked Cheesecake', type: 'veg', prices: [229], category: 'Desserts' },
    ],
  },
  {
    category: 'Beverages',
    items: [
      { id: 56, name: 'Ice Tea', type: 'veg', prices: [149], category: 'Beverages' },
      { id: 57, name: 'Shakes', type: 'veg', prices: [169], category: 'Beverages' },
      { id: 58, name: 'Mojito', type: 'veg', prices: [159], category: 'Beverages' },
      { id: 59, name: 'Mocktails', type: 'veg', prices: [159, 189], category: 'Beverages' },
      { id: 60, name: 'Fresh Lime Soda', type: 'veg', prices: [89], category: 'Beverages' },
      { id: 61, name: 'Cold Coffee', type: 'veg', prices: [189], category: 'Beverages' },
    ],
  },
]
