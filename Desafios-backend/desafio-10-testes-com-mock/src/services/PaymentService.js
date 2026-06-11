const AppError = require("../errors/AppError");

class PaymentService {
  constructor(paymentGateway) {
    this.paymentGateway = paymentGateway;
  }

  async pay({ userId, amount }) {
    if (!userId) {
      throw new AppError("User ID is required");
    }

    if (!amount || amount <= 0) {
      throw new AppError("Amount must be greater than zero");
    }

    try {
      const payment = await this.paymentGateway.charge({
        userId,
        amount
      });

      return {
        status: "paid",
        transactionId: payment.transactionId
      };
    } catch (error) {
      throw new AppError("Payment failed", 502);
    }
  }
}

module.exports = PaymentService;