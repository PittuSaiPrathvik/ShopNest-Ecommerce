
// ======================================
// 1. PRODUCT DATABASE
// ======================================

const products = [

    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "Electronics",
        price: 1499,
        oldPrice: 2499,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },

    {
        id: 2,
        name: "Smart Fitness Watch",
        category: "Electronics",
        price: 1999,
        oldPrice: 3499,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },

    {
        id: 3,
        name: "Classic Running Shoes",
        category: "Fashion",
        price: 1799,
        oldPrice: 2999,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },

    {
        id: 4,
        name: "Casual Cotton T-Shirt",
        category: "Fashion",
        price: 499,
        oldPrice: 999,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },

    {
        id: 5,
        name: "Modern Table Lamp",
        category: "Home",
        price: 899,
        oldPrice: 1499,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"
    },

    {
        id: 6,
        name: "Kitchen Storage Set",
        category: "Home",
        price: 699,
        oldPrice: 1199,
        rating: 4.0,
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500"
    },

    {
        id: 7,
        name: "Premium Beauty Skincare Kit",
        category: "Beauty",
        price: 1299,
        oldPrice: 1999,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500"
    },

    {
        id: 8,
        name: "Everyday Face Care Set",
        category: "Beauty",
        price: 599,
        oldPrice: 999,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=500"
    },

    {
        id: 9,
        name: "Premium Smartphone",
        category: "Mobiles",
        price: 14999,
        oldPrice: 18999,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    },

    {
        id: 10,
        name: "Self Development Book",
        category: "Books",
        price: 299,
        oldPrice: 499,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"
    },

    {
        id: 11,
        name: "Professional Football",
        category: "Sports",
        price: 799,
        oldPrice: 1199,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=500"
    },

    {
        id: 12,
        name: "Travel Backpack",
        category: "Fashion",
        price: 999,
        oldPrice: 1599,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    }

];


// ======================================
// 2. SELECT HTML ELEMENTS
// ======================================

const productGrid = document.getElementById("productGrid");

const searchInput = document.getElementById("searchInput");

const searchBtn = document.getElementById("searchBtn");

const searchCategory = document.getElementById("searchCategory");

const sortProducts = document.getElementById("sortProducts");

const cartCount = document.getElementById("cartCount");

const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");

const cartSection = document.getElementById("cartSection");

const resultMessage = document.getElementById("resultMessage");


// ======================================
// 3. CART DATA
// ======================================

let cart = JSON.parse(localStorage.getItem("shopnestCart")) || [];

let selectedCategory = "all";

let currentSearch = "";


// ======================================
// 4. DISPLAY PRODUCTS
// ======================================

function displayProducts(productList) {

    productGrid.innerHTML = "";

    if (productList.length === 0) {

        productGrid.innerHTML =
            "<p>No products found. Try another search.</p>";

        return;
    }

    productList.forEach(product => {

        const discount = Math.round(
            ((product.oldPrice - product.price) / product.oldPrice) * 100
        );

        const card = document.createElement("div");

        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        image.onerror = function () {
            this.src = "https://placehold.co/400x300?text=Product";
        };

        const name = document.createElement("h3");
        name.textContent = product.name;

        const category = document.createElement("small");
        category.textContent = product.category;

        const rating = document.createElement("p");
        rating.className = "rating";
        rating.textContent = "★".repeat(Math.floor(product.rating))
            + "☆".repeat(5 - Math.floor(product.rating))
            + " " + product.rating;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = "₹" + product.price.toLocaleString("en-IN");

        const oldPrice = document.createElement("p");
        oldPrice.className = "old-price";
        oldPrice.textContent = "₹" + product.oldPrice.toLocaleString("en-IN");

        const discountText = document.createElement("p");
        discountText.className = "discount";
        discountText.textContent = discount + "% OFF";

        const addButton = document.createElement("button");
        addButton.className = "add-cart";
        addButton.textContent = "Add to Cart";

        addButton.addEventListener("click", () => {
            addToCart(product.id);
        });

        card.append(
            image,
            name,
            category,
            rating,
            price,
            oldPrice,
            discountText,
            addButton
        );

        productGrid.appendChild(card);

    });

    resultMessage.textContent =
        productList.length + " products found.";

}


// ======================================
// 5. SEARCH AND CATEGORY FILTER
// ======================================

function filterProducts() {

    let filtered = products.filter(product => {

        const matchesSearch = product.name
            .toLowerCase()
            .includes(currentSearch.toLowerCase());

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    sortFilteredProducts(filtered);

}


function searchProducts() {

    currentSearch = searchInput.value.trim();

    selectedCategory = searchCategory.value;

    filterProducts();

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });

}


searchBtn.addEventListener("click", searchProducts);


searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        searchProducts();
    }

});


searchCategory.addEventListener("change", () => {

    selectedCategory = searchCategory.value;

    filterProducts();

});


// ======================================
// 6. CATEGORY BUTTON FILTERING
// ======================================

document.querySelectorAll(".category-card").forEach(button => {

    button.addEventListener("click", () => {

        selectedCategory = button.dataset.category;

        searchCategory.value = selectedCategory;

        currentSearch = "";

        searchInput.value = "";

        filterProducts();

        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });

    });

});


// ======================================
// 7. PRODUCT SORTING
// ======================================

function sortFilteredProducts(filtered) {

    const sortValue = sortProducts.value;

    if (sortValue === "low") {

        filtered.sort((a, b) => a.price - b.price);

    }

    else if (sortValue === "high") {

        filtered.sort((a, b) => b.price - a.price);

    }

    else if (sortValue === "rating") {

        filtered.sort((a, b) => b.rating - a.rating);

    }

    displayProducts(filtered);

}


sortProducts.addEventListener("change", filterProducts);


// ======================================
// 8. ADD TO CART
// ======================================

function addToCart(productId) {

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: productId,
            quantity: 1
        });

    }

    saveCart();

    alert("Product added to your cart!");

}


// ======================================
// 9. SAVE CART AND UPDATE COUNT
// ======================================

function saveCart() {

    localStorage.setItem(
        "shopnestCart",
        JSON.stringify(cart)
    );

    updateCart();

}


function updateCart() {

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartCount.textContent = totalItems;

    cartItems.innerHTML = "";

    let totalPrice = 0;

    if (cart.length === 0) {

        cartItems.textContent = "Your cart is empty.";

    }

    cart.forEach(item => {

        const product = products.find(
            product => product.id === item.id
        );

        if (!product) return;

        totalPrice += product.price * item.quantity;

        const row = document.createElement("div");

        row.className = "cart-row";

        const name = document.createElement("span");

        name.textContent =
            product.name + " × " + item.quantity;

        const price = document.createElement("strong");

        price.textContent =
            "₹" + (product.price * item.quantity).toLocaleString("en-IN");

        const removeButton = document.createElement("button");

        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", () => {

            removeFromCart(product.id);

        });

        row.append(name, price, removeButton);

        cartItems.appendChild(row);

    });

    cartTotal.textContent =
        "Total: ₹" + totalPrice.toLocaleString("en-IN");

}


// ======================================
// 10. REMOVE PRODUCT FROM CART
// ======================================

function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    saveCart();

}


// ======================================
// 11. OPEN AND CLOSE CART
// ======================================

document.getElementById("cartButton").addEventListener("click", () => {

    cartSection.style.display = "block";

    cartSection.scrollIntoView({
        behavior: "smooth"
    });

});


document.getElementById("closeCart").addEventListener("click", () => {

    cartSection.style.display = "none";

});


// ======================================
// 12. HERO BANNER SLIDER
// ======================================

const banners = [

    {
        title: "Upgrade Your Everyday",
        subtitle: "Discover amazing products at great prices.",
        image: "photo-1556742049-0cfed4f6a45d"
    },

    {
        title: "Style Meets Comfort",
        subtitle: "Explore fashion and accessories for everyone.",
        image: "photo-1441986300917-64674bd600d8"
    },

    {
        title: "Technology Made Simple",
        subtitle: "Discover smart gadgets for your daily life.",
        image: "photo-1498049794561-7780e7231661"
    }

];

let currentSlide = 0;


function showSlide(index) {

    const banner = banners[index];

    document.getElementById("heroTitle").textContent =
        banner.title;

    document.getElementById("heroSubtitle").textContent =
        banner.subtitle;

    document.querySelector(".hero").style.backgroundImage =
        `linear-gradient(90deg, rgba(10,20,40,.9), rgba(10,20,40,.2)),
        url("https://images.unsplash.com/${banner.image}?w=1600")`;

}


document.getElementById("nextSlide").addEventListener("click", () => {

    currentSlide = (currentSlide + 1) % banners.length;

    showSlide(currentSlide);

});


document.getElementById("prevSlide").addEventListener("click", () => {

    currentSlide =
        (currentSlide - 1 + banners.length) % banners.length;

    showSlide(currentSlide);

});


// Automatically change banner every 5 seconds

setInterval(() => {

    currentSlide = (currentSlide + 1) % banners.length;

    showSlide(currentSlide);

}, 5000);


// ======================================
// 13. NAVIGATION MENU INTERACTION
// ======================================

document.getElementById("menuToggle").addEventListener("click", () => {

    document.querySelector(".navbar").classList.toggle("compact");

});


// ======================================
// 14. BACK TO TOP
// ======================================

document.getElementById("backToTop").addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ======================================
// 15. INITIAL WEBSITE LOAD
// ======================================

displayProducts(products);

updateCart();

showSlide(currentSlide);
