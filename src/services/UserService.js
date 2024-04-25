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
    // Insert user information into the users table
    const [result] = await connection.execute(
      "INSERT INTO users (email, usertype, password, verification_token) VALUES (?, ?, ?, ?)",
      [email, usertype, password, verification_token]
    );

    // Get the auto-generated user ID
    const userId = result.insertId;

    // Dynamically create a cart table for the user
    const cartName = `cart_${userId}`;
    console.log(cartName);
    await connection.execute(
      `CREATE TABLE ${cartName} (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        productName VARCHAR(255),
        productId VARCHAR(255),
        quantity VARCHAR(255),
        price VARCHAR(255)
      )`
    );

    // // Create the user_carts table if it doesn't exist
    // await connection.execute(`
    //   CREATE TABLE IF NOT EXISTS user_carts (
    //     user_id INT NOT NULL,
    //     cartName VARCHAR(255) NOT NULL,
    //     PRIMARY KEY (user_id,cartName),
    //     FOREIGN KEY (user_id) REFERENCES users(id),
    //     FOREIGN KEY (cartName) REFERENCES ${cartName}
    //   );
    // `);

    // Insert user-cart mapping into user_carts table
    // await connection.execute(
    //   "INSERT INTO user_carts (user_id, cartName) VALUES (?, ?)",
    //   [userId, cartName]
    // );

    return result; // Return the result of the user insertion
  } catch (error) {
    throw error;
  }
};

// getCartName = async (user_id) => {
//   const [result] = await connection.execute(
//     "SELECT cartName FROM user_carts WHERE user_id = ?",
//     [user_id]
//   );
//   return result;
// };

exports.addToCart = async (
  user_id,
  productName,
  productId,
  quantity,
  price
) => {
  const cartTable = `cart_${user_id}`;
  console.log(cartTable);
  const [result] = await connection.execute(
    `INSERT INTO ${cartTable} (productName, productId, quantity, price) VALUES (?, ?, ?, ?)`,
    [productName, productId, quantity, price],
    (productId = productId !== undefined ? productId : null),
    (quantity = quantity !== undefined ? quantity : null),
    (price = price !== undefined ? price : null),
    console.log(productName, productId, quantity, price)
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
