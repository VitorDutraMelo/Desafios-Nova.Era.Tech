class FakeProductRepository {
  constructor() {
    this.products = [];
  }

  async create(product) {
    const newProduct = {
      id: this.products.length + 1,
      ...product,
      createdAt: new Date()
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async findByName(name) {
    return this.products.find((product) => product.name === name);
  }

  async findById(id) {
    return this.products.find((product) => product.id === id);
  }

  async update(id, data) {
    const productIndex = this.products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      return null;
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...data,
      updatedAt: new Date()
    };

    return this.products[productIndex];
  }
}

module.exports = FakeProductRepository;