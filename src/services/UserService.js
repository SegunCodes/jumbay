const connection = require("../models/db");

exports.getUserByEmail = async (email) => {
  const [user] = await connection.execute(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return user;
};

exports.saveUser = async (email, usertype, password, verification_token) => {
  try {
    const [result] = await connection.execute(
      "INSERT INTO users (email, usertype, password, verification_token) VALUES (?,?,?,?)",
      [email, usertype, password, verification_token]
    );

    const userId = user.id;

    const cartName = `cart_${userId}`;

    const [cart] = await connection.execute(
      `CREATE TABLE ${taskTableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Productname VARCHAR(255),
        ProductId VARCHAR(255),
        Quantity VARCHAR(255),
        Price VARCHAR(255)
        ...
      )`
    );

    return result;
  } catch (error) {
    console.error(error);
  }
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
    "DELETE FROM products WHERE  id = ? AND user_id = ?",
    [product_id, user_id]
  );
  return result;
};

exports.updateSellerProduct = async (quantity, price, product_id, user_id) => {
  const [result] = await connection.execute(
    "UPDATE products SET quantity = ?, price = ? WHERE   id = ? AND user_id = ?",
    [quantity, price, product_id, user_id]
  );
  return result;
};
