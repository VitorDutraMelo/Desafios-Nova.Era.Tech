describe("Order checkout business rules", () => {
  it("should calculate order total correctly", () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 }
    ];

    const total = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    expect(total).toBe(35);
  });

  it("should reject checkout when stock is insufficient", () => {
    const productStock = 2;
    const requestedQuantity = 5;

    const hasStock = productStock >= requestedQuantity;

    expect(hasStock).toBe(false);
  });
});