const authService = require("../services/authService");

async function register(req, res, next) {
  try {
    const user = await authService.register(req.body);

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
};