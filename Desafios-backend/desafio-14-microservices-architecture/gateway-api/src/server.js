const express = require("express");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 3000;
const SERVICE_NAME = process.env.SERVICE_NAME || "gateway-api";

const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:3001";

const CATALOG_SERVICE_URL =
  process.env.CATALOG_SERVICE_URL || "http://localhost:3002";

const REQUEST_TIMEOUT = Number(process.env.REQUEST_TIMEOUT) || 3000;

app.use(express.json());

function log(message) {
  console.log(`[${SERVICE_NAME}] ${message}`);
}

async function requestWithFallback(url, fallbackValue) {
  try {
    const response = await axios.get(url, {
      timeout: REQUEST_TIMEOUT
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    log(`Error calling ${url}: ${error.message}`);

    return {
      success: false,
      data: fallbackValue,
      error: "Service unavailable"
    };
  }
}

app.get("/health", (req, res) => {
  log("Health check requested");

  return res.json({
    service: SERVICE_NAME,
    status: "ok"
  });
});

app.get("/summary/:userId", async (req, res) => {
  const userId = req.params.userId;

  log(`Aggregating data for user ${userId}`);

  const userResponse = await requestWithFallback(
    `${USER_SERVICE_URL}/users/${userId}`,
    null
  );

  const catalogResponse = await requestWithFallback(
    `${CATALOG_SERVICE_URL}/catalog`,
    []
  );

  return res.json({
    message: "Aggregated response from multiple services",
    userService: {
      available: userResponse.success,
      data: userResponse.data,
      error: userResponse.error || null
    },
    catalogService: {
      available: catalogResponse.success,
      data: catalogResponse.data,
      error: catalogResponse.error || null
    }
  });
});

app.listen(PORT, () => {
  log(`Running on port ${PORT}`);
});