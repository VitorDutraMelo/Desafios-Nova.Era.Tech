async function getMe(request, response) {
  return response.status(200).json({
    message: "Authenticated user data",
    user: request.user
  });
}

module.exports = {
  getMe
};