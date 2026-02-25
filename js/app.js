/* =========================================================================
   Global App Logic (Theme, Cart count, Auth state)
   ========================================================================= */

// Theme Toggle Logic
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('ecommerce_theme') || 'light';

    // Apply initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('ecommerce_theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// Global Cart Badge Logic
function updateCartBadge() {
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        const cart = DataService.getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = 'flex';
            // Animation bump
            cartBadge.classList.remove('bump');
            void cartBadge.offsetWidth; // trigger reflow
            cartBadge.classList.add('bump');
        } else {
            cartBadge.style.display = 'none';
        }
    }
}

// Auth State update UI
function updateAuthUI() {
    const authLink = document.getElementById('auth-link');
    const user = DataService.getCurrentUser();

    if (authLink) {
        if (user) {
            authLink.innerHTML = `<i class="fas fa-user"></i> ${user.name.split(' ')[0]}`;
            authLink.href = 'dashboard.html';
        } else {
            authLink.innerHTML = `<i class="fas fa-sign-in-alt"></i> Login`;
            authLink.href = 'login.html';
        }
    }
}

// Generate star ratings HTML
function generateStars(rating) {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star text-warning"></i>';
    }
    if (halfStar) {
        starsHtml += '<i class="fas fa-star-half-alt text-warning"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star text-warning"></i>';
    }
    return starsHtml;
}

// Format Currency
function formatPrice(price) {
    return '$' + parseFloat(price).toFixed(2);
}

// Initialize global features
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateCartBadge();
    updateAuthUI();
});
