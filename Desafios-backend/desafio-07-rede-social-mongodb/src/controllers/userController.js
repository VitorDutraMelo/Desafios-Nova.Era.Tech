const User = require("../models/User");

async function createUser(req, res, next) {
  try {
    const { name, username } = req.body;

    if (!name || !username) {
      return res.status(400).json({
        message: "Name and username are required"
      });
    }

    const user = await User.create({
      name,
      username
    });

    return res.status(201).json({
      message: "User created successfully",
      user
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser
};