export interface MenuEntry {
  id: number
  name: string
  price: number | null
  priceVariants?: Record<string, number>
  isVeg: boolean
  category: string
}

export const virarMenu: MenuEntry[] = [
  // Starters
  { id: 1, name: 'Garlic Bread', price: 120, isVeg: true, category: 'Starters' },
  { id: 2, name: 'Garlic Bread with Cheese', price: 160, isVeg: true, category: 'Starters' },
  { id: 3, name: 'Chicken Wings', price: 220, isVeg: false, category: 'Starters' },
  { id: 4, name: 'Bruschetta', price: 150, isVeg: true, category: 'Starters' },

  // Soups
  { id: 5, name: 'Tomato Basil Soup', price: 140, isVeg: true, category: 'Soups' },
  { id: 6, name: 'Chicken Noodle Soup', price: 170, isVeg: false, category: 'Soups' },

  // Pizzas
  { id: 7, name: 'Margherita', price: null, priceVariants: { Regular: 280, Medium: 380, Large: 480 }, isVeg: true, category: 'Pizzas' },
  { id: 8, name: 'Paneer Tikka', price: null, priceVariants: { Regular: 320, Medium: 420, Large: 520 }, isVeg: true, category: 'Pizzas' },
  { id: 9, name: 'Veg Loaded', price: null, priceVariants: { Regular: 300, Medium: 400, Large: 500 }, isVeg: true, category: 'Pizzas' },
  { id: 10, name: 'Chicken BBQ', price: null, priceVariants: { Regular: 340, Medium: 440, Large: 560 }, isVeg: false, category: 'Pizzas' },
  { id: 11, name: 'Chicken Tikka', price: null, priceVariants: { Regular: 350, Medium: 460, Large: 580 }, isVeg: false, category: 'Pizzas' },
  { id: 12, name: 'Pepperoni', price: null, priceVariants: { Regular: 360, Medium: 470, Large: 590 }, isVeg: false, category: 'Pizzas' },

  // Pastas
  { id: 13, name: 'Arrabbiata', price: 220, isVeg: true, category: 'Pastas' },
  { id: 14, name: 'Pesto Pasta', price: 240, isVeg: true, category: 'Pastas' },
  { id: 15, name: 'Chicken Alfredo', price: 280, isVeg: false, category: 'Pastas' },
  { id: 16, name: 'Chicken Arrabbiata', price: 270, isVeg: false, category: 'Pastas' },

  // Beverages
  { id: 17, name: 'Coca Cola', price: 60, isVeg: true, category: 'Beverages' },
  { id: 18, name: 'Fresh Lime Soda', price: 80, isVeg: true, category: 'Beverages' },
  { id: 19, name: 'Virgin Mojito', price: 120, isVeg: true, category: 'Beverages' },

  // Desserts
  { id: 20, name: 'Choco Lava Cake', price: 160, isVeg: true, category: 'Desserts' },
  { id: 21, name: 'Tiramisu', price: 180, isVeg: true, category: 'Desserts' },
]
