async function adminRoute(request, response) {
  return response.status(200).json({
    message: "Welcome admin! You have access to this protected admin route.",
    user: request.user
  });
}

async function memberRoute(request, response) {
  return response.status(200).json({
    message: "Welcome member! You have access to this protected member route.",
    user: request.user
  });
}

module.exports = {
  adminRoute,
  memberRoute
};