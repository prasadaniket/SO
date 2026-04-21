export interface MenuEntry {
  id: number
  name: string
  price: number | null
  priceVariants?: Record<string, number>
  isVeg: boolean
  category: string
}

export const palgharMenu: MenuEntry[] = [
  // Starters
  { id: 1, name: 'Garlic Bread', price: 110, isVeg: true, category: 'Starters' },
  { id: 2, name: 'Garlic Bread with Cheese', price: 150, isVeg: true, category: 'Starters' },
  { id: 3, name: 'Chicken Wings', price: 210, isVeg: false, category: 'Starters' },
  { id: 4, name: 'Bruschetta', price: 140, isVeg: true, category: 'Starters' },

  // Soups
  { id: 5, name: 'Tomato Basil Soup', price: 130, isVeg: true, category: 'Soups' },
  { id: 6, name: 'Chicken Noodle Soup', price: 160, isVeg: false, category: 'Soups' },

  // Pizzas
  { id: 7, name: 'Margherita', price: null, priceVariants: { Regular: 270, Medium: 370, Large: 470 }, isVeg: true, category: 'Pizzas' },
  { id: 8, name: 'Paneer Tikka', price: null, priceVariants: { Regular: 310, Medium: 410, Large: 510 }, isVeg: true, category: 'Pizzas' },
  { id: 9, name: 'Veg Supreme', price: null, priceVariants: { Regular: 290, Medium: 390, Large: 490 }, isVeg: true, category: 'Pizzas' },
  { id: 10, name: 'Chicken BBQ', price: null, priceVariants: { Regular: 330, Medium: 430, Large: 550 }, isVeg: false, category: 'Pizzas' },
  { id: 11, name: 'Chicken Tikka', price: null, priceVariants: { Regular: 340, Medium: 450, Large: 570 }, isVeg: false, category: 'Pizzas' },
  { id: 12, name: 'Pepperoni', price: null, priceVariants: { Regular: 350, Medium: 460, Large: 580 }, isVeg: false, category: 'Pizzas' },

  // Pastas
  { id: 13, name: 'Arrabbiata', price: 210, isVeg: true, category: 'Pastas' },
  { id: 14, name: 'Pesto Pasta', price: 230, isVeg: true, category: 'Pastas' },
  { id: 15, name: 'Chicken Alfredo', price: 270, isVeg: false, category: 'Pastas' },
  { id: 16, name: 'Chicken Arrabbiata', price: 260, isVeg: false, category: 'Pastas' },

  // Beverages
  { id: 17, name: 'Coca Cola', price: 60, isVeg: true, category: 'Beverages' },
  { id: 18, name: 'Fresh Lime Soda', price: 80, isVeg: true, category: 'Beverages' },
  { id: 19, name: 'Virgin Mojito', price: 110, isVeg: true, category: 'Beverages' },

  // Desserts
  { id: 20, name: 'Choco Lava Cake', price: 150, isVeg: true, category: 'Desserts' },
  { id: 21, name: 'Tiramisu', price: 170, isVeg: true, category: 'Desserts' },
]
