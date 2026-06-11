const PaymentService = require("../src/services/PaymentService");

describe("PaymentService", () => {
  let paymentGateway;
  let paymentService;

  beforeEach(() => {
    paymentGateway = {
      charge: jest.fn()
    };

    paymentService = new PaymentService(paymentGateway);
  });

  it("should process payment successfully using mocked gateway", async () => {
    paymentGateway.charge.mockResolvedValue({
      transactionId: "txn-123"
    });

    const result = await paymentService.pay({
      userId: "user-123",
      amount: 100
    });

    expect(result).toEqual({
      status: "paid",
      transactionId: "txn-123"
    });

    expect(paymentGateway.charge).toHaveBeenCalledWith({
      userId: "user-123",
      amount: 100
    });
  });

  it("should throw error when payment gateway fails", async () => {
    paymentGateway.charge.mockRejectedValue(new Error("Gateway unavailable"));

    await expect(
      paymentService.pay({
        userId: "user-123",
        amount: 100
      })
    ).rejects.toThrow("Payment failed");

    expect(paymentGateway.charge).toHaveBeenCalledWith({
      userId: "user-123",
      amount: 100
    });
  });

  it("should not call gateway when amount is invalid", async () => {
    await expect(
      paymentService.pay({
        userId: "user-123",
        amount: 0
      })
    ).rejects.toThrow("Amount must be greater than zero");

    expect(paymentGateway.charge).not.toHaveBeenCalled();
  });
});