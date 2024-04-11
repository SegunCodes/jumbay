// all authentication routes come here
const express = require("express")
const AuthController = require("../controllers/AuthController")
const validator = require("../middlewares/ValidationMiddleware")
const { RegisterValidation } = require("../validations/AuthValidation")
const authRoutes = express.Router()

authRoutes.post("/registerUser", validator.validateSchema(RegisterValidation), AuthController.registerUser)

module.exports = authRoutes;