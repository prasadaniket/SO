export interface MenuEntry {
  id: number
  name: string
  price: number | null
  priceVariants?: Record<string, number>
  isVeg: boolean
  category: string
}

export const vasaiMenu: MenuEntry[] = [
  // Starters
  { id: 1, name: 'Garlic Bread', price: 120, isVeg: true, category: 'Starters' },
  { id: 2, name: 'Garlic Bread with Cheese', price: 160, isVeg: true, category: 'Starters' },
  { id: 3, name: 'Chicken Wings', price: 230, isVeg: false, category: 'Starters' },
  { id: 4, name: 'Nachos with Salsa', price: 160, isVeg: true, category: 'Starters' },

  // Soups
  { id: 5, name: 'Tomato Basil Soup', price: 140, isVeg: true, category: 'Soups' },
  { id: 6, name: 'Chicken Corn Soup', price: 170, isVeg: false, category: 'Soups' },

  // Pizzas
  { id: 7, name: 'Margherita', price: null, priceVariants: { Regular: 280, Medium: 380, Large: 480 }, isVeg: true, category: 'Pizzas' },
  { id: 8, name: 'Paneer Tikka', price: null, priceVariants: { Regular: 330, Medium: 430, Large: 530 }, isVeg: true, category: 'Pizzas' },
  { id: 9, name: 'Farm House', price: null, priceVariants: { Regular: 310, Medium: 410, Large: 510 }, isVeg: true, category: 'Pizzas' },
  { id: 10, name: 'Chicken BBQ', price: null, priceVariants: { Regular: 350, Medium: 450, Large: 570 }, isVeg: false, category: 'Pizzas' },
  { id: 11, name: 'Chicken Tikka', price: null, priceVariants: { Regular: 360, Medium: 470, Large: 590 }, isVeg: false, category: 'Pizzas' },
  { id: 12, name: 'Pepperoni', price: null, priceVariants: { Regular: 370, Medium: 480, Large: 600 }, isVeg: false, category: 'Pizzas' },

  // Pastas
  { id: 13, name: 'Arrabbiata', price: 230, isVeg: true, category: 'Pastas' },
  { id: 14, name: 'White Sauce Pasta', price: 240, isVeg: true, category: 'Pastas' },
  { id: 15, name: 'Chicken Alfredo', price: 290, isVeg: false, category: 'Pastas' },
  { id: 16, name: 'Chicken Arrabbiata', price: 280, isVeg: false, category: 'Pastas' },

  // Beverages
  { id: 17, name: 'Coca Cola', price: 60, isVeg: true, category: 'Beverages' },
  { id: 18, name: 'Fresh Lime Soda', price: 80, isVeg: true, category: 'Beverages' },
  { id: 19, name: 'Virgin Mojito', price: 130, isVeg: true, category: 'Beverages' },

  // Desserts
  { id: 20, name: 'Choco Lava Cake', price: 160, isVeg: true, category: 'Desserts' },
  { id: 21, name: 'Brownie with Ice Cream', price: 200, isVeg: true, category: 'Desserts' },
]
