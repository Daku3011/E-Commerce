document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const grid = document.getElementById('products-grid');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const searchInput = document.getElementById('search-input');
    const countText = document.getElementById('product-count');
    const sortSelect = document.getElementById('sort-select');
    const emptyState = document.getElementById('empty-state');
    const priceRadios = document.querySelectorAll('input[name="price"]');

    // Data
    const allProducts = DataService.getProducts();
    const categories = DataService.getCategories();

    // State
    let filteredProducts = [...allProducts];
    let activeCategory = 'all';

    // Parse URL parameter for initial category
    const urlParams = new URLSearchParams(window.location.search);
    const categoryQuery = urlParams.get('category');
    if (categoryQuery) {
        activeCategory = categoryQuery.toLowerCase();
    }

    // Initialize Page
    function init() {
        renderCategories();
        applyFilters();
    }

    // Render category sidebar
    function renderCategories() {
        let html = `<li>
            <label>
               <input type="radio" name="category" value="all" ${activeCategory === 'all' ? 'checked' : ''}> All Categories
            </label>
        </li>`;

        categories.forEach(cat => {
            const isChecked = activeCategory === cat.name.toLowerCase() ? 'checked' : '';
            html += `<li>
                <label>
                    <input type="radio" name="category" value="${cat.name.toLowerCase()}" ${isChecked}> ${cat.name}
                </label>
            </li>`;
        });
        categoryFiltersContainer.innerHTML = html;

        // Add Listeners
        document.querySelectorAll('input[name="category"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                activeCategory = e.target.value;
                applyFilters();
            });
        });
    }

    // Apply all filters and update DOM
    function applyFilters() {
        let results = [...allProducts];

        // 1. Search Query
        const query = searchInput.value.toLowerCase();
        if (query) {
            results = results.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.details.toLowerCase().includes(query)
            );
        }

        // 2. Category Filter
        if (activeCategory !== 'all') {
            results = results.filter(p => p.category.toLowerCase() === activeCategory);
        }

        // 3. Price Filter
        const activePrice = document.querySelector('input[name="price"]:checked').value;
        if (activePrice === 'under50') {
            results = results.filter(p => p.price < 50);
        } else if (activePrice === '50to150') {
            results = results.filter(p => p.price >= 50 && p.price <= 150);
        } else if (activePrice === 'over150') {
            results = results.filter(p => p.price > 150);
        }

        // 4. Sort
        const sortBy = sortSelect.value;
        if (sortBy === 'price-low') {
            results.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            results.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            results.sort((a, b) => b.rating - a.rating);
        }

        filteredProducts = results;
        renderProducts();
    }

    // Render the grid
    function renderProducts() {
        if (filteredProducts.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
            countText.textContent = `Showing 0 products`;
            return;
        }

        grid.style.display = 'grid';
        emptyState.style.display = 'none';
        countText.textContent = `Showing ${filteredProducts.length} products`;

        grid.innerHTML = filteredProducts.map(product => {
            const stars = generateStars(product.rating);
            const price = formatPrice(product.price);
            return `
                <div class="product-card">
                    <div class="product-badge">${product.category}</div>
                    <a href="product-detail.html?id=${product.id}" class="product-img-wrap">
                        <img src="${product.image}" alt="${product.name}" class="product-img">
                    </a>
                    <div class="product-info">
                        <h3 class="product-title"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
                        <div class="product-rating">
                            ${stars} <span class="text-muted">(${product.reviews})</span>
                        </div>
                        <div class="product-bottom">
                            <span class="product-price">${price}</span>
                            <button class="btn-add-cart" onclick="quickAddToCart(${product.id})" aria-label="Add to cart">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Event Listeners
    searchInput.addEventListener('input', applyFilters);
    sortSelect.addEventListener('change', applyFilters);
    priceRadios.forEach(radio => radio.addEventListener('change', applyFilters));

    // Expose reset function globally
    window.resetFilters = () => {
        searchInput.value = '';
        activeCategory = 'all';
        document.querySelector('input[name="category"][value="all"]').checked = true;
        document.querySelector('input[name="price"][value="all"]').checked = true;
        sortSelect.value = 'default';
        applyFilters();
    };

    // Quick add to cart
    window.quickAddToCart = function (productId) {
        let cart = DataService.getCart();
        const existingItem = cart.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ productId: productId, quantity: 1 });
        }

        DataService.setCart(cart);
        updateCartBadge();
        alert('Added to cart!');
    };

    // Start
    init();
});
