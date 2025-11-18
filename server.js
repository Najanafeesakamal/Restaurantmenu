const express = require("express");
const app = express();
const PORT = 3000;

// Serve static frontend files
app.use(express.static("public"));

// In-memory menu items array
const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Main Course",
    price: 350,
    isVegetarian: true,
    description: "Classic pizza with tomato and mozzarella"
  },
  {
    id: 2,
    name: "Chicken Biryani",
    category: "Main Course",
    price: 420,
    isVegetarian: false,
    description: "Aromatic basmati rice cooked with tender chicken"
  },
  {
    id: 3,
    name: "Veg Manchurian",
    category: "Appetizer",
    price: 180,
    isVegetarian: true,
    description: "Crispy vegetable balls in spicy sauce"
  },
  {
    id: 4,
    name: "Tandoori Chicken",
    category: "Appetizer",
    price: 300,
    isVegetarian: false,
    description: "Chicken marinated in yogurt and spices"
  },
  {
    id: 5,
    name: "Chocolate Brownie",
    category: "Dessert",
    price: 150,
    isVegetarian: true,
    description: "Warm brownie served with chocolate syrup"
  },
  {
    id: 6,
    name: "Lemon Iced Tea",
    category: "Beverage",
    price: 120,
    isVegetarian: true,
    description: "Refreshing iced tea with lemon flavor"
  }
];

// 1️⃣ GET /menu — Return all items
app.get("/menu", (req, res) => {
  res.json(menuItems);
});

// 2️⃣ GET /menu/vegetarian — Only veg items
app.get("/menu/vegetarian", (req, res) => {
  const vegItems = menuItems.filter(item => item.isVegetarian);
  res.json(vegItems);
});

// 3️⃣ GET /menu/categories — Unique categories + count
app.get("/menu/categories", (req, res) => {
  const categoryData = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = 1;
    } else {
      acc[item.category]++;
    }
    return acc;
  }, {});

  const categories = Object.keys(categoryData).map(cat => ({
    name: cat,
    itemCount: categoryData[cat]
  }));

  res.json({ categories });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
});
