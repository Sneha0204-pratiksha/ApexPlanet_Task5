const products = [
  { id: 1, name: "MacBook Air", category: "laptop", price: 92000, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
  { id: 2, name: "iPhone 15", category: "phone", price: 78000, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
  { id: 3, name: "Sony Headphones", category: "accessory", price: 15000, img: "https://www.bhphotovideo.com/images/images2000x2000/sony_wh1000xm2_n_1000x_wireless_noise_canceling_headphones_1360722.jpg" },
  { id: 4, name: "Gaming Laptop", category: "laptop", price: 120000, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
  { id: 5, name: "Smartwatch", category: "accessory", price: 9000, img: "https://tse3.mm.bing.net/th/id/OIP.H4zV5hAF0ypuiO9_U8dKiAHaE8?pid=Api&P=0&h=180" },
  { id: 6, name: "Samsung Galaxy S24", category: "phone", price: 65000, img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5" }
];

// Product Page
if (document.getElementById("productContainer")) {
  const container = document.getElementById("productContainer");
  const search = document.getElementById("search");
  const filter = document.getElementById("filter");

  function displayProducts(list) {
    container.innerHTML = "";
    list.forEach(p => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart 🛒</button>
      `;
      container.appendChild(div);
    });
  }

  function filterProducts() {
    const term = search.value.toLowerCase();
    const category = filter.value;
    const filtered = products.filter(p => 
      (category === "all" || p.category === category) &&
      p.name.toLowerCase().includes(term)
    );
    displayProducts(filtered);
  }

  search.addEventListener("input", filterProducts);
  filter.addEventListener("change", filterProducts);
  displayProducts(products);
}

// Cart Page
function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = products.find(p => p.id === id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${item.name} added to cart!`);
}

if (document.getElementById("cartItems")) {
  const list = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  function displayCart() {
    list.innerHTML = "";
    let total = 0;
    cart.forEach((item, i) => {
      total += item.price;
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeItem(${i})">Remove ❌</button>`;
      list.appendChild(li);
    });
    totalPrice.textContent = `Total: ₹${total}`;
  }

  window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  }

  displayCart();
}
