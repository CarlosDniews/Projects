// src/app.js

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { login, protect, getMe, logout } = require("./src/auth");

const studentRoutes = require("./src/routes/student.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.post("/api/login", login);

app.post("/api/logout", logout);

app.get("/api/me", protect, getMe);

app.use("/api/students", protect, studentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo à API da Edtech!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
