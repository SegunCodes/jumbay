const connection = require("../models/db");

exports.getUserByEmail = async (email) => {
  const [user] = await connection.execute(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return user;
};

exports.saveUser = async (email, usertype, password, verification_token) => {
  const [result] = await connection.execute(
    "INSERT INTO users (email, usertype, password, verification_token) VALUES (?,?,?,?)",
    [email, usertype, password, verification_token]
  );
  return result;
};

exports.verifyUserAccount = async (user_id) => {
  const [result] = await connection.execute(
    "UPDATE users SET is_verified = true, verification_token = NULL WHERE id = ?",
    [user_id]
  );
  return result;
};

exports.saveProduct = async (name, quantity, price, category_id, user_id) => {
  const [result] = await connection.execute(
    "INSERT INTO products (name, quantity, price, category_id, user_id) VALUES (?,?,?,?,?)",
    [name, quantity, price, category_id, user_id]
  );
  return result;
};

exports.getSellerProducts = async (id) => {
  const [result] = await connection.execute(
    "SELECT * FROM products WHERE user_id = ? ORDER BY id DESC",
    [id]
  );
  return result;
};

exports.getAllProducts = async () => {
  const [result] = await connection.execute(
    "SELECT * FROM products ORDER BY id DESC"
  );
  return result;
};

exports.getCategoryProducts = async (category_id) => {
  const [result] = await connection.execute(
    "SELECT * FROM products WHERE category_id = ? ORDER BY RAND()",
    [category_id]
  );
  return result;
};

exports.getProduct = async (product_id) => {
  const [result] = await connection.execute(
    "SELECT * FROM products WHERE id = ?",
    [product_id]
  );
  return result;
};

exports.getSellerProduct = async (product_id, user_id) => {
  const [result] = await connection.execute(
    "SELECT * FROM products WHERE id = ? AND user_id = ?",
    [product_id, user_id]
  );
  return result;
};

exports.deleteSellerProduct = async (product_id, user_id) => {
  const [result] = await connection.execute(
    "DELETE FROM products WHERE id = ? AND user_id = ?",
    [product_id, user_id]
  );
  return result;
};
exports.updateSellerProduct = async (product_id, user_id) => {
  const [result] = await connection.execute(
    "UPDATE products SET quantity = ? price = ? WHERE user_id = ? AND id = ?",
    [quantity, price, user_id, product_id]
  );
  return result;
};
