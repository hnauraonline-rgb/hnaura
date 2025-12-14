// ===============================
// SAFE CART LOAD
// ===============================
let cart = [];

try {
  const stored = localStorage.getItem("cart");
  cart = stored ? JSON.parse(stored) : [];
  if (!Array.isArray(cart)) cart = [];
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
// UPDATE CART COUNT (HEADER)
// ===============================
function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (!el) return;

  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    count += Number(cart[i].qty) || 0;
  }
  el.textContent = count;
}

// ===============================
// ADD TO CART (MOBILE + DESKTOP SAFE)
// ===============================
function addToCart(name, price) {
  if (typeof name !== "string" || isNaN(price)) {
    console.error("Invalid product data", name, price);
    return;
  }

  let item = cart.find(p => p.name === name);

  if (item) {
    item.qty = Number(item.qty) + 1;
  } else {
    cart.push({
      name: name,
      price: Number(price),
      qty: 1
    });
  }

  saveCart();
  updateCartCount();

  // ❌ alert mobile UX खराब करता है
  // ✔️ silent add (better for mobile)
}

// ===============================
// CHANGE QUANTITY (+ / −)
// ===============================
function changeQty(name, delta) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].qty = Number(cart[i].qty) + delta;
      if (cart[i].qty <= 0) {
        cart.splice(i, 1);
      }
      break;
    }
  }

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
  for (let i = 0; i < cart.length; i++) {
    total += Number(cart[i].price) * Number(cart[i].qty);
  }
  return total;
}

// ===============================
// ON PAGE LOAD
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
});
