const UserService = require("../src/services/UserService");
const { makeUser } = require("../src/factories/userFactory");

describe("UserService", () => {
  let userRepository;
  let userService;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn()
    };

    userService = new UserService(userRepository);
  });

  it("should create a user successfully using mocked repository", async () => {
    const userData = makeUser();

    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.create.mockResolvedValue({
      id: userData.id,
      name: userData.name,
      email: userData.email
    });

    const result = await userService.createUser(userData);

    expect(result).toEqual({
      id: userData.id,
      name: userData.name,
      email: userData.email
    });

    expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);

    expect(userRepository.create).toHaveBeenCalledWith({
      name: userData.name,
      email: userData.email,
      password: userData.password
    });
  });

  it("should not create user when email already exists", async () => {
    const userData = makeUser();

    userRepository.findByEmail.mockResolvedValue(userData);

    await expect(userService.createUser(userData)).rejects.toThrow(
      "User already exists"
    );

    expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it("should throw error when required fields are missing", async () => {
    await expect(
      userService.createUser({
        name: "",
        email: "",
        password: ""
      })
    ).rejects.toThrow("Name, email and password are required");

    expect(userRepository.findByEmail).not.toHaveBeenCalled();
    expect(userRepository.create).not.toHaveBeenCalled();
  });
});