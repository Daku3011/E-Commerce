# Lumina | Premium E-Commerce Website

A modern, fast, and feature-rich e-commerce prototype built entirely with HTML, CSS, and Vanilla JavaScript. This project uses `localStorage` to persist data, meaning no backend or database is required to run it!

## 🚀 Features

### User Experience
* **Modern UI**: Clean and premium design with glassmorphism effects and CSS grid layouts.
* **Dark/Light Mode**: Fully functional dark mode toggle that remembers your preference.
* **Product Catalog**: Browse products with search, category filtering, and sorting capabilities.
* **Shopping Cart**: Add items to your cart, adjust quantities, and see real-time price calculations (including tax and discounts).
* **Checkout Flow**: Simulated secure checkout process that saves your order.
* **User Dashboard**: View your order history and track order statuses.

### Admin Dashboard
* **Admin Access**: Special admin logic (use "Register as Admin" or the default `admin@admin.com` / `admin` credentials).
* **Overview Stats**: Real-time aggregation of total revenue, orders, and products.
* **Product Management**: Full CRUD (Create, Read, Update, Delete) capabilities for the product catalog.
* **Order Management**: View all customer orders and update their shipping status (Pending, Shipped, Delivered).

## 🛠️ Technologies Used

* **HTML5**: Semantic and accessible structure.
* **CSS3**: Custom properties (variables), Flexbox, Grid, and responsive design (no external CSS frameworks like Bootstrap or Tailwind).
* **JavaScript (Vanilla)**: DOM manipulation, event handling, and complex state management.
* **LocalStorage**: Used as a mock database for Products, Users, Cart, Orders, and Theme preferences.
* **FontAwesome**: For scalable vector icons.

## ⚙️ How to Run Locally

Since this project relies purely on frontend technologies, it's incredibly easy to run!

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Daku3011/E-Commerce.git
   cd E-Commerce
   ```

2. **Start a local server**:
   Due to how browsers handle ES modules and certain paths, it's best to serve it locally. If you have Python installed, run:
   ```bash
   python3 -m http.server 8000
   ```
   Or using Node.js/npm:
   ```bash
   npx serve .
   ```

3. **Open in Browser**:
   Navigate to `http://localhost:8000` (or whichever port your server started on).

## 🔑 Demo Credentials

* **User**: Feel free to register a new account on the Login/Register page!
* **Admin**: 
  * Email: `admin@admin.com`
  * Password: `admin`

## 📁 Project Structure

```
├── admin/                 # Admin Panel Pages
│   ├── index.html         # Admin Dashboard stats
│   ├── orders.html        # Order management
│   └── products.html      # Product CRUD
├── css/                   # Stylesheets
│   ├── admin.css
│   ├── cart.css
│   ├── shop.css
│   └── style.css          # Main variables and core layout
├── js/                    # JavaScript Logic
│   ├── admin.js           # Admin auth constraints
│   ├── app.js             # Global state (Theme, Cart count)
│   ├── cart.js            # Cart calculations
│   ├── data.js            # LocalStorage data seeding
│   └── products.js        # Filtering and search logic
├── cart.html              # Shopping Cart
├── checkout.html          # Order confirmation flow
├── dashboard.html         # User specific order history
├── index.html             # Landing Page
├── login.html             # User/Admin Authentication
├── product-detail.html    # Single product view
└── products.html          # Main shop list
```
