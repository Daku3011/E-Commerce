// Admin Authentication and Global Scripts
document.addEventListener('DOMContentLoaded', () => {
    // 1. Verify Authentication
    const currentUser = JSON.parse(localStorage.getItem('ecommerce_currentUser') || "null");

    if (!currentUser || currentUser.role !== 'admin') {
        alert('Unauthorized access. Redirecting to login.');
        window.location.href = '../login.html';
        return;
    }

    // 2. Set user info in header
    const adminNameEl = document.getElementById('admin-name');
    if (adminNameEl) {
        adminNameEl.textContent = currentUser.name;
    }

    // 3. Setup Global Logout
    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('ecommerce_currentUser');
            window.location.href = '../index.html';
        });
    }

    // 4. Modal Helpers (If they exist on the page)
    window.openModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('active');
    };

    window.closeModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('active');
    };
});
