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

  // ✅ Added to cart popup (toast)
  showCartToast("✅ Added to Cart");
}

// ===============================
// CHANGE QTY (+ / −)
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

// ===============================
// ADD TO CART POPUP (TOAST)
// ===============================
function showCartToast(msg){
  const toast = document.createElement("div");
  toast.textContent = msg;

  toast.style.position = "fixed";
  toast.style.bottom = "24px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "linear-gradient(90deg,#f5b041,#f39c12,#e74c3c)";
  toast.style.color = "#fff";
  toast.style.padding = "12px 22px";
  toast.style.borderRadius = "999px";
  toast.style.fontWeight = "800";
  toast.style.fontSize = "14px";
  toast.style.boxShadow = "0 10px 25px rgba(0,0,0,.25)";
  toast.style.zIndex = "9999";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 1800);
}
