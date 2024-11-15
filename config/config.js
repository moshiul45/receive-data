require("dotenv").config();

const config = {
  development: {
    port: process.env.PORT || 8000, // Use PORT from .env or default to 8000
  },
  production: {
    port: process.env.PORT || 8000, // Use PORT from .env or default to 8080
  }
};

module.exports = config;
