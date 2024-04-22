// all authentication routes come here
const express = require("express");
const UserController = require("../controllers/UserController");
const validator = require("../middlewares/ValidationMiddleware");
const authenticationMiddleware = require("../middlewares/Authenticate");
const {
    AddProductValidation,
} = require("../validations/UserValidation");
const userRoutes = express.Router();

userRoutes.post(
  "/addProduct", 
  authenticationMiddleware.verifyToken,
  validator.validateSchema(AddProductValidation),
  UserController.addProducts
);

userRoutes.get(
    "/myProducts",
    authenticationMiddleware.verifyToken,
    UserController.viewMyProducts
);

userRoutes.get(
    "/myProduct/:product_id",
    authenticationMiddleware.verifyToken,
    UserController.viewMyProduct
);

userRoutes.get(
  "/products",
  UserController.viewAllProducts
);

userRoutes.get(
  "/products/:category_id",
  UserController.viewAllCategoryProducts
);

userRoutes.get(
    "/product/:product_id",
    UserController.viewProduct
);

module.exports = userRoutes;
