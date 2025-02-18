//src/config/prisma.js
const { PrismaClient } = require("@prisma/client");

// Create the PrismaClient instance. You can pass options if needed.
const prisma = new PrismaClient({
  // Optional: log queries and errors for debugging; disable in production if not needed
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

// Listen to query events (optional)
prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

module.exports = prisma;
