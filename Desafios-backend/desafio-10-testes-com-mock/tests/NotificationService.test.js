const NotificationService = require("../src/services/NotificationService");
const { makeUser } = require("../src/factories/userFactory");

describe("NotificationService", () => {
  let queueProvider;
  let notificationService;

  beforeEach(() => {
    queueProvider = {
      add: jest.fn()
    };

    notificationService = new NotificationService(queueProvider);
  });

  it("should add welcome email job to queue", async () => {
    const user = makeUser();

    queueProvider.add.mockResolvedValue(true);

    const result = await notificationService.sendWelcomeEmail(user);

    expect(result).toEqual({
      message: "Welcome email added to queue"
    });

    expect(queueProvider.add).toHaveBeenCalledWith("send-email", {
      to: user.email,
      subject: "Welcome!",
      body: `Hello ${user.name}, welcome to our platform.`
    });
  });

  it("should throw error when user email is missing", async () => {
    const user = makeUser({
      email: ""
    });

    await expect(notificationService.sendWelcomeEmail(user)).rejects.toThrow(
      "User email is required"
    );

    expect(queueProvider.add).not.toHaveBeenCalled();
  });
});