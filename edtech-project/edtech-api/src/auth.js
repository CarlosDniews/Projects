const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const login = async (req, res) => {
  console.log("--- Nova Tentativa de Login ---");

  console.log("Dados recebidos do front-end (req.body):", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Erro: E-mail ou senha não fornecidos.");
    return res
      .status(400)
      .json({ message: "Please provide an email and password" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  console.log("Usuário encontrado no banco:", user);

  if (!user) {
    console.log("Resultado: Usuário não encontrado. Retornando 401.");
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      message: "Logged in successfully",
      user: { id: user.id, email: user.email },
    });
};

const getMe = (req, res) => {
  res.status(200).json({ user: req.user });
};

const logout = (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({ message: "Logged out successfully" });
};

const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await prisma.user.findUnique({ where: { id: decoded.id } });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { login, protect, getMe, logout };
