const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const productsTableBody = document.querySelector("#productsTableBody");
const emptyState = document.querySelector("#emptyState");

const totalProductsCard = document.querySelector("#totalProductsCard");
const lowStockCard = document.querySelector("#lowStockCard");
const totalUnitsCard = document.querySelector("#totalUnitsCard");

const tableTotalUnits = document.querySelector("#tableTotalUnits");
const tableTotalProducts = document.querySelector("#tableTotalProducts");

const productModal = document.querySelector("#productModal");
const productForm = document.querySelector("#productForm");

const openModalButton = document.querySelector("#openModalButton");
const closeModalButton = document.querySelector("#closeModalButton");
const cancelModalButton = document.querySelector("#cancelModalButton");

const productIdInput = document.querySelector("#productId");
const productNameInput = document.querySelector("#productName");
const productCategoryInput =
  document.querySelector("#productCategory");
const productPriceInput = document.querySelector("#productPrice");
const productQuantityInput =
  document.querySelector("#productQuantity");

function getProductRows() {
  return Array.from(productsTableBody.querySelectorAll("tr"));
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function formatPrice(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getStockInformation(quantity) {
  if (quantity <= 50) {
    return {
      className: "stock-status stock-low",
      label: "Estoque baixo",
    };
  }

  if (quantity <= 100) {
    return {
      className: "stock-status stock-warning",
      label: "Atenção",
    };
  }

  if (quantity >= 500) {
    return {
      className: "stock-status stock-high",
      label: "Estoque alto",
    };
  }

  return {
    className: "stock-status stock-available",
    label: "Disponível",
  };
}

function getProductIcon(category) {
  const icons = {
    Ferramentas: "🧰",
    Construção: "🧱",
    Acabamento: "🎨",
    Fixação: "🔩",
    Elétrica: "💡",
    Domótica: "📶",
  };

  return icons[category] || "📦";
}

function updateDashboard() {
  const rows = getProductRows();

  const quantities = rows.map((row) => {
    const quantityCell = row.querySelector(".quantity-cell");

    return Number(quantityCell.textContent.trim());
  });

  const totalProducts = rows.length;

  const totalUnits = quantities.reduce(
    (total, quantity) => total + quantity,
    0
  );

  const lowStockProducts = quantities.filter(
    (quantity) => quantity <= 50
  ).length;

  totalProductsCard.textContent = formatNumber(totalProducts);
  lowStockCard.textContent = formatNumber(lowStockProducts);
  totalUnitsCard.textContent = formatNumber(totalUnits);

  tableTotalUnits.textContent =
    `${formatNumber(totalUnits)} unidades`;

  tableTotalProducts.textContent =
    `${formatNumber(totalProducts)} produtos`;
}

function filterProducts() {
  const searchTerm = normalizeText(searchInput.value.trim());
  const selectedCategory = categoryFilter.value;

  const rows = getProductRows();

  let visibleRows = 0;

  rows.forEach((row) => {
    const rowText = normalizeText(row.textContent);

    const category = row
      .querySelector(".category-badge")
      .textContent.trim();

    const matchesSearch = rowText.includes(searchTerm);

    const matchesCategory =
      selectedCategory === "all" ||
      category === selectedCategory;

    const shouldDisplay =
      matchesSearch && matchesCategory;

    row.style.display = shouldDisplay ? "" : "none";

    if (shouldDisplay) {
      visibleRows += 1;
    }
  });

  const table = document.querySelector("table");

  if (visibleRows === 0) {
    table.style.display = "none";
    emptyState.style.display = "block";
  } else {
    table.style.display = "";
    emptyState.style.display = "none";
  }
}

function openProductModal() {
  productModal.showModal();
  productIdInput.focus();
}

function closeProductModal() {
  productModal.close();
  productForm.reset();
}

function productIdAlreadyExists(productId) {
  return getProductRows().some((row) => {
    const currentId = row
      .querySelector(".product-id")
      .textContent
      .replace("#", "")
      .trim();

    return currentId === productId;
  });
}

function createProductRow(product) {
  const stockInformation =
    getStockInformation(product.quantity);

  const row = document.createElement("tr");

  row.innerHTML = `
    <td data-label="ID">
      <span class="product-id">#${product.id}</span>
    </td>

    <td data-label="Produto">
      <div class="product-info">
        <span class="product-icon">
          ${getProductIcon(product.category)}
        </span>

        <div>
          <strong>${product.name}</strong>
          <small>Produto cadastrado</small>
        </div>
      </div>
    </td>

    <td data-label="Categoria">
      <span class="category-badge">
        ${product.category}
      </span>
    </td>

    <td data-label="Preço">
      ${formatPrice(product.price)}
    </td>

    <td data-label="Quantidade" class="quantity-cell">
      ${product.quantity}
    </td>

    <td data-label="Status">
      <span class="${stockInformation.className}">
        ${stockInformation.label}
      </span>
    </td>
  `;

  return row;
}

function handleProductSubmit(event) {
  event.preventDefault();

  const product = {
    id: productIdInput.value.trim(),
    name: productNameInput.value.trim(),
    category: productCategoryInput.value,
    price: Number(productPriceInput.value),
    quantity: Number(productQuantityInput.value),
  };

  if (productIdAlreadyExists(product.id)) {
    alert("Já existe um produto cadastrado com esse ID.");
    productIdInput.focus();
    return;
  }

  const productRow = createProductRow(product);

  productsTableBody.appendChild(productRow);

  updateDashboard();
  filterProducts();
  closeProductModal();
}

searchInput.addEventListener("input", filterProducts);

categoryFilter.addEventListener("change", filterProducts);

openModalButton.addEventListener("click", openProductModal);

closeModalButton.addEventListener("click", closeProductModal);

cancelModalButton.addEventListener("click", closeProductModal);

productForm.addEventListener("submit", handleProductSubmit);

productModal.addEventListener("click", (event) => {
  const modalArea = productModal.getBoundingClientRect();

  const clickedOutside =
    event.clientX < modalArea.left ||
    event.clientX > modalArea.right ||
    event.clientY < modalArea.top ||
    event.clientY > modalArea.bottom;

  if (clickedOutside) {
    closeProductModal();
  }
});

updateDashboard();