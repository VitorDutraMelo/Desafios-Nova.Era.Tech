const AppError = require("../errors/AppError");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data) {
    if (!data.name || !data.email || !data.password) {
      throw new AppError("Name, email and password are required");
    }

    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: data.password
    });

    return user;
  }
}

module.exports = UserService;