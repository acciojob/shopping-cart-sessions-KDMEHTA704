const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartButton = document.getElementById("clear-cart-btn");

// Load cart from sessionStorage
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render products
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Add event listeners to buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(parseInt(button.dataset.id));
    });
  });
}

// Render cart
function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price}
      <button class="remove-from-cart-btn" data-index="${index}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  // Add event listeners to remove buttons
  document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(parseInt(button.dataset.index));
    });
  });

  // Update sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Clear cart
clearCartButton.addEventListener("click", () => {
  cart = [];
  renderCart();
});

// Initial render
renderProducts();
renderCart();
