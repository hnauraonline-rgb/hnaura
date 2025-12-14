// ===============================
// SAFE CART LOAD
// ===============================
let cart = [];

try {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
} catch (e) {
  cart = [];
}

// ===============================
// SAVE CART
// ===============================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// UPDATE CART COUNT
// ===============================
function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (!el) return;

  let count = 0;
  cart.forEach(item => {
    count += item.qty;
  });

  el.innerText = count;
}

// ===============================
// ADD TO CART (MAIN FIX)
// ===============================
function addToCart(name, price) {
  if (!name || !price) {
    alert("Product data missing");
    return;
  }

  let found = false;

  cart.forEach(item => {
    if (item.name === name) {
      item.qty += 1;
      found = true;
    }
  });

  if (!found) {
    cart.push({
      name: name,
      price: Number(price),
      qty: 1
    });
  }

  saveCart();
  updateCartCount();

  alert("✅ " + name + " added to cart");
}

// ===============================
// CHANGE QTY (+ / −)
// ===============================
function changeQty(name, delta) {
  cart = cart.map(item => {
    if (item.name === name) {
      item.qty += delta;
    }
    return item;
  }).filter(item => item.qty > 0);

  saveCart();
  updateCartCount();

  if (typeof renderCart === "function") {
    renderCart();
  }
}

// ===============================
// GET SUBTOTAL
// ===============================
function getSubtotal() {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
  });
  return total;
}

// ===============================
// ON LOAD
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
