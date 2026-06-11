const AppError = require("../errors/AppError");

class NotificationService {
  constructor(queueProvider) {
    this.queueProvider = queueProvider;
  }

  async sendWelcomeEmail(user) {
    if (!user.email) {
      throw new AppError("User email is required");
    }

    await this.queueProvider.add("send-email", {
      to: user.email,
      subject: "Welcome!",
      body: `Hello ${user.name}, welcome to our platform.`
    });

    return {
      message: "Welcome email added to queue"
    };
  }
}

module.exports = NotificationService;