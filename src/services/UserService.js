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

exports.getUserByPassword = async (password) => {
  const [passwordResult] = await connection.execute(
    "SELECT * FROM users WHERE password = ? LIMIT 1",
    [password]
  );
  return passwordResult;
};
