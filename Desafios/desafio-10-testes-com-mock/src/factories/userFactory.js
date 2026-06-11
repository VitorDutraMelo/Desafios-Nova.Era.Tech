function makeUser(overrides = {}) {
  return {
    id: "user-123",
    name: "Vitor Melo",
    email: "vitor@email.com",
    password: "123456",
    ...overrides
  };
}

module.exports = { makeUser };