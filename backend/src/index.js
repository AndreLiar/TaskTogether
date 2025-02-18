const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const setupSwagger = require("./config/swagger"); // ✅ Import Swagger Setup
const logger = require("./config/logger"); // Import our Winston logger
const retry = require("./utils/retry"); // Custom retry helper
const prisma = require("./config/prisma"); // Prisma client instance

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const chatRoutes = require("./routes/chatRoutes");
const videoCallRoutes = require("./routes/videoCallRoutes");

const app = express();

// --- Security & Performance Middleware ---


// Secure HTTP headers with Helmet
app.use(helmet());



// Rate Limiting: Limit each IP to 100 requests per 15 minutes on API routes
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  });
  app.use("/api/", apiLimiter);

// Enable CORS for cross-origin requests

app.use(cors());

// Parse JSON bodies for incoming requests

app.use(express.json());

  
// ✅ Load Swagger **before defining routes**
setupSwagger(app);

// --- Routes ---

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/video", videoCallRoutes);


// --- WebSocket (Socket.io) Integration ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  logger.info(`New user connected: ${socket.id}`);

  socket.on("joinRoom", (projectId) => {
    socket.join(projectId);
    logger.info(`User ${socket.id} joined room: ${projectId}`);
  });

  socket.on("sendMessage", async (messageData) => {
    logger.info("Message Received: %s", JSON.stringify(messageData));
    io.to(messageData.projectId).emit("receiveMessage", messageData);
  });

  socket.on("disconnect", () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// --- Global Error Handler (Optional) ---
// If an error is passed to next(err), this middleware will log and send the error.
app.use((err, req, res, next) => {
    logger.error("Unhandled Error: %s", err.stack);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  });
  
  // --- Graceful Shutdown ---
const shutdown = async () => {
    logger.info("Shutting down server...");
    await prisma.$disconnect();
    process.exit(0);
  };
  
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  

// --- Start the Server ---
// --- Test DB Connection with Retries and Start the Server ---
const testDBConnection = async () => {
    // A simple query to test the connection; adjust as necessary.
    await prisma.$queryRaw`SELECT NOW()`;
    logger.info("Database connection successful.");
  };
  
  retry(testDBConnection, 5, 2000)
    .then(() => {
      const PORT = process.env.PORT || 5001;
      server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
    })
    .catch((error) => {
      logger.error("Failed to connect to the database after multiple retries:", error);
      process.exit(1);
    });
