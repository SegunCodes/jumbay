// all authentication routes come here
const express = require("express");
const AuthController = require("../controllers/AuthController");
const validator = require("../middlewares/ValidationMiddleware");
const {
  RegisterValidation,
  loginValidation,
} = require("../validations/AuthValidation");
const authRoutes = express.Router();

authRoutes.post(
  "/registerUser",
  validator.validateSchema(RegisterValidation),
  AuthController.registerUser
);

authRoutes.get(
  "/loginUser",
  validator.validateSchema(loginValidation),
  AuthController.loginUser
);

module.exports = authRoutes;
