const initialProducts = [
    { 
        id: 1, 
        name: "Sony WH-1000XM5 Wireless Headphones", 
        price: 349.99, 
        category: "Electronics", 
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80", 
        rating: 4.8, 
        reviews: 1240, 
        details: "Industry-leading noise cancellation, up to 30-hour battery life, and superior sound quality." 
    },
    { 
        id: 2, 
        name: "Apple Watch Series 9", 
        price: 399.00, 
        category: "Electronics", 
        image: "https://images.unsplash.com/photo-1434493789847-2f02b0d287cb?w=600&q=80", 
        rating: 4.9, 
        reviews: 3040, 
        details: "A healthy leap ahead. With double tap, a brighter display, and faster Siri." 
    },
    { 
        id: 3, 
        name: "Nike Air Zoom Pegasus 40", 
        price: 130.00, 
        category: "Fashion", 
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", 
        rating: 4.6, 
        reviews: 890, 
        details: "A bouncy ride for every run, the Peg's familiar, just-for-you feel returns to help you accomplish your goals." 
    },
    { 
        id: 4, 
        name: "Razer DeathAdder V3 Pro", 
        price: 149.99, 
        category: "Electronics", 
        image: "https://images.unsplash.com/photo-1527814050087-379381547949?w=600&q=80", 
        rating: 4.7, 
        reviews: 512, 
        details: "Ultra-lightweight wireless ergonomic esports mouse with a 30K optical sensor." 
    },
    { 
        id: 5, 
        name: "Essential Cotton Crew Tee", 
        price: 25.00, 
        category: "Fashion", 
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", 
        rating: 4.3, 
        reviews: 150, 
        details: "Everyday comfort with this 100% premium combed cotton t-shirt. Preshrunk." 
    },
    { 
        id: 6, 
        name: "Keychron Q1 Pro Mechanical Keyboard", 
        price: 199.00, 
        category: "Electronics", 
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&q=80", 
        rating: 4.9, 
        reviews: 215, 
        details: "A premium QMK/VIA wireless custom mechanical keyboard with a full aluminum CNC machined body." 
    },
    { 
        id: 7, 
        name: "Ray-Ban Classic Aviator", 
        price: 160.00, 
        category: "Accessories", 
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80", 
        rating: 4.5, 
        reviews: 950, 
        details: "Currently one of the most iconic sunglass models in the world. Exceptional quality, performance and comfort." 
    },
    { 
        id: 8, 
        name: "The North Face Borealis Backpack", 
        price: 99.00, 
        category: "Accessories", 
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", 
        rating: 4.8, 
        reviews: 1100, 
        details: "A classic 28-liter backpack with an updated FlexVent suspension system and stand-up design." 
    }
];

const initialCategories = [
    { id: '1', name: "Electronics", icon: "fa-laptop" },
    { id: '2', name: "Fashion", icon: "fa-tshirt" },
    { id: '3', name: "Accessories", icon: "fa-glasses" }
];

function initializeMockData() {
    if (!localStorage.getItem('ecommerce_products')) {
        localStorage.setItem('ecommerce_products', JSON.stringify(initialProducts));
    }
    if (!localStorage.getItem('ecommerce_categories')) {
        localStorage.setItem('ecommerce_categories', JSON.stringify(initialCategories));
    }
    if (!localStorage.getItem('ecommerce_cart')) {
        localStorage.setItem('ecommerce_cart', JSON.stringify([]));
    }
    // Set default theme to light if not present
    if (!localStorage.getItem('ecommerce_theme')) {
        localStorage.setItem('ecommerce_theme', 'light');
    }
}

// Call on load
initializeMockData();

// Helper functions for data access
const DataService = {
    getProducts: () => JSON.parse(localStorage.getItem('ecommerce_products') || "[]"),
    setProducts: (products) => localStorage.setItem('ecommerce_products', JSON.stringify(products)),
    getCategories: () => JSON.parse(localStorage.getItem('ecommerce_categories') || "[]"),
    getCart: () => JSON.parse(localStorage.getItem('ecommerce_cart') || "[]"),
    setCart: (cart) => localStorage.setItem('ecommerce_cart', JSON.stringify(cart)),
    getCurrentUser: () => JSON.parse(localStorage.getItem('ecommerce_currentUser') || "null"),
};
