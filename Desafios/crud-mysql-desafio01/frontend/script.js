const API_URL = "http://localhost:3000/products";

const form = document.getElementById("productForm");
const productIdInput = document.getElementById("productId");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const stockInput = document.getElementById("stock");
const tableBody = document.getElementById("productsTable");
const submitBtn = document.getElementById("submitBtn");
const searchInput = document.getElementById("searchInput");
const countText = document.getElementById("countText");

let products = [];

async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    products = result.data || [];
    renderProducts(products);
  } catch (error) {
    alert("Error loading products");
    console.error(error);
  }
}

function renderProducts(list) {
  const search = searchInput.value.toLowerCase();

  const filteredProducts = list.filter(product =>
    product.name.toLowerCase().includes(search)
  );

  tableBody.innerHTML = "";

  filteredProducts.forEach(product => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td class="price">R$ ${Number(product.price).toLocaleString("pt-BR", {
        minimumFractionDigits: 2
      })}</td>
      <td><span class="stock">${product.stock}</span></td>
      <td>${formatDate(product.created_at)}</td>
      <td>
        <div class="actions">
          <button class="edit" onclick="editProduct(${product.id})">✎</button>
          <button class="delete" onclick="deleteProduct(${product.id})">🗑</button>
        </div>
      </td>
    `;

    tableBody.appendChild(row);
  });

  countText.textContent = `Showing ${filteredProducts.length} of ${products.length} products`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const product = {
    name: nameInput.value,
    price: Number(priceInput.value),
    stock: Number(stockInput.value),
  };

  const productId = productIdInput.value;

  try {
    if (productId) {
      await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      submitBtn.textContent = "＋ Add Product";
      productIdInput.value = "";
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    }

    form.reset();
    loadProducts();
  } catch (error) {
    alert("Error saving product");
    console.error(error);
  }
});

async function editProduct(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  productIdInput.value = product.id;
  nameInput.value = product.name;
  priceInput.value = product.price;
  stockInput.value = product.stock;

  submitBtn.textContent = "✓ Update Product";
}

async function deleteProduct(id) {
  const confirmDelete = confirm("Are you sure you want to delete this product?");

  if (!confirmDelete) return;

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    loadProducts();
  } catch (error) {
    alert("Error deleting product");
    console.error(error);
  }
}

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleString("pt-BR");
}

searchInput.addEventListener("input", () => {
  renderProducts(products);
});

loadProducts();