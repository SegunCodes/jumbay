// all authentication routes come here
const express = require("express")
const AuthController = require("../controllers/AuthController")
const authRoutes = express.Router()

authRoutes.post("/registerUser", AuthController.registerUser)

module.exports = authRoutes;