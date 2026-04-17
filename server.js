// EXPRESS SERVER WITH MVC STRUCTURE
import express from "express";
import eventRoutes from "./src/routes/eventRoutes.js";
import {
 logger,
 validateEventInput,
 measureTime
} from "./src/middleware.js";
const app = express();
const PORT = 3000;
// ===== MIDDLEWARE =====
app.use(express.json());
app.use(logger);
app.use(measureTime);
// ===== ROUTES =====
app.get("/", (req, res) => {
 res.json({
 message: "🎉 Event Manager API (MVC Structure)",
 version: "1.0.0",
 endpoints: {
 getAllEvents: "GET /api/events",
 getEvent: "GET /api/events/:id",
 createEvent: "POST /api/events",
 updateEvent: "PUT /api/events/:id",
 deleteEvent: "DELETE /api/events/:id",
 health: "GET /health"
 }
 });
 });
// Validation middleware for POST/PUT
const validateEvent = (req, res, next) => {
 if (req.method === "POST" || req.method === "PUT") {
 validateEventInput(req, res, next);
 } else {
 next();
 }
};
app.use("/api/events", validateEvent);
app.use("/api/events", eventRoutes);
// Health check
app.get("/health", (req, res) => {
 res.json({
 status: "✅ healthy",
 uptime: process.uptime().toFixed(2) + "s"
 });
});
// 404 handler
app.use((req, res) => {
 res.status(404).json({
 success: false,
 message: `Not found: ${req.method} ${req.path}`
 });
});
// ===== START SERVER =====
app.listen(PORT, () => {
 console.log(`\n✅ Event Manager API (MVC) started!`);
 console.log(`📍 http://localhost:${PORT}`);
 console.log(`\n🏗 Architecture: Model-View-Controller`);
 console.log(` Models/ → Data operations`);
 console.log(` Controllers/ → Business logic`);
 console.log(` Routes/ → API endpoints\n`);
});