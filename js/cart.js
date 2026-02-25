document.addEventListener('DOMContentLoaded', () => {
    const cartArea = document.getElementById('cart-content-area');

    // State
    const allProducts = DataService.getProducts();
    let cart = DataService.getCart();
    let discount = 0;

    function renderCart() {
        if (cart.length === 0) {
            cartArea.innerHTML = `
                <div style="width: 100%; text-align: center; padding: 60px 20px;">
                    <i class="fas fa-shopping-cart" style="font-size: 4rem; color: var(--border-color); margin-bottom: 20px;"></i>
                    <h2>Your cart is currently empty</h2>
                    <p class="text-secondary" style="margin: 15px 0 30px;">Looks like you haven't added anything to your cart yet.</p>
                    <a href="products.html" class="btn btn-primary">Start Shopping</a>
                </div>
            `;
            return;
        }

        let subtotal = 0;
        let cartHtml = `<div class="cart-items">`;

        cart.forEach((item, index) => {
            const product = allProducts.find(p => p.id === item.productId);
            if (!product) return; // safeguard

            subtotal += product.price * item.quantity;

            cartHtml += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h3 class="cart-item-title"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
                    <div class="cart-item-price">${formatPrice(product.price)}</div>
                    
                    <div class="cart-actions">
                        <div class="qty-control">
                            <button onclick="updateQty(${index}, -1)"><i class="fas fa-minus"></i></button>
                            <input type="number" value="${item.quantity}" readonly>
                            <button onclick="updateQty(${index}, 1)"><i class="fas fa-plus"></i></button>
                        </div>
                        <button class="btn-remove" onclick="removeItem(${index})">
                            <i class="fas fa-trash-alt"></i> Remove
                        </button>
                    </div>
                </div>
                <div class="text-right" style="font-weight: 700; font-size: 1.2rem;">
                    ${formatPrice(product.price * item.quantity)}
                </div>
            </div>`;
        });

        cartHtml += `</div>`; // Close cart-items

        const tax = subtotal * 0.05; // 5% tax
        const total = subtotal + tax - discount;

        cartHtml += `
        <div class="cart-summary">
            <h3 class="summary-title">Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal</span>
                <span style="font-weight: 600;">${formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Tax (5%)</span>
                <span>${formatPrice(tax)}</span>
            </div>
            ${discount > 0 ? `
            <div class="summary-row" style="color: var(--secondary);">
                <span>Discount</span>
                <span>-${formatPrice(discount)}</span>
            </div>
            ` : ''}
            
            <div class="coupon-box">
                <input type="text" id="coupon-code" placeholder="Promo code (try SAVE10)">
                <button class="btn btn-outline" onclick="applyCoupon()">Apply</button>
            </div>
            
            <div class="summary-total">
                <span>Total</span>
                <span>${formatPrice(Math.max(0, total))}</span>
            </div>
            
            <a href="checkout.html" class="btn btn-primary" style="width: 100%; margin-top: 20px; padding: 15px;">
                Proceed to Checkout
            </a>
            
            <a href="products.html" class="btn btn-outline" style="width: 100%; margin-top: 10px; border:none;">
                Continue Shopping
            </a>
        </div>
        `;

        cartArea.innerHTML = cartHtml;
    }

    // Handlers mapped globally for inline onclick
    window.updateQty = function (index, amount) {
        let newQty = cart[index].quantity + amount;
        if (newQty < 1) newQty = 1;
        if (newQty > 10) newQty = 10;

        cart[index].quantity = newQty;
        DataService.setCart(cart);
        updateCartBadge();
        renderCart();
    };

    window.removeItem = function (index) {
        cart.splice(index, 1);
        DataService.setCart(cart);
        updateCartBadge();
        renderCart();
    };

    window.applyCoupon = function () {
        const codeInput = document.getElementById('coupon-code');
        if (!codeInput) return;

        const code = codeInput.value.toUpperCase();
        if (code === 'SAVE10') {
            // Recalculate subtotal
            let subtotal = 0;
            cart.forEach(item => {
                const product = allProducts.find(p => p.id === item.productId);
                if (product) subtotal += product.price * item.quantity;
            });

            discount = subtotal * 0.10; // 10% off
            alert('Coupon applied: 10% off!');
            renderCart();
        } else {
            alert('Invalid or expired coupon code.');
            discount = 0;
            renderCart();
        }
    };

    // Init
    renderCart();
});
