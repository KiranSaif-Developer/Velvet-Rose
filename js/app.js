import { productsApi } from './api.js';

let allProducts = [];
let cart = JSON.parse(localStorage.getItem('rose_cart')) || [];

async function loadProducts() {
    try {
        allProducts = await productsApi.getAll();
        displayProducts(allProducts);
        updateCartCount();
    } catch (error) {
        console.error("Data load error:", error);
    }
}

function displayProducts(productsToDisplay) {
    const container = document.getElementById('product-list');
    if (!container) return;

    container.innerHTML = productsToDisplay.map(p => `
        <div class="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch">
            <div class="card shadow-sm border-0">
                <img src="${p.image}" class="card-img-top" alt="${p.name}" onerror="this.src='https://via.placeholder.com/300x300?text=Flower'">
                <div class="card-body">
                    <small class="text-muted text-uppercase" style="letter-spacing: 1px; font-size: 10px;">${p.category}</small>
                    <h5 class="card-title">${p.name}</h5>
                    <div class="price-tag">Rs. ${p.price}</div>
                    <button class="btn btn-pink mt-3" onclick="addToCart('${p.id}')">
                        Add to Bag
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

window.addToCart = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        let cart = JSON.parse(localStorage.getItem('rose_cart')) || [];
        const existing = cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('rose_cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to your bag!`);
    }
};

function updateCartCount() {
    const countElement = document.getElementById('cartCount');
    if (countElement) {
        const cartItems = JSON.parse(localStorage.getItem('rose_cart')) || [];
        const totalQty = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
        countElement.innerText = totalQty;
    }
}

window.filterCategory = (category) => {
    if (category === 'All') {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.category.trim() === category.trim());
        displayProducts(filtered);
    }
};

window.onload = loadProducts;