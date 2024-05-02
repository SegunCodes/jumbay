const bcryptjs = require("bcryptjs");
const {
  getUserByEmail,
  saveUser,
  verifyUserAccount,
} = require("../services/UserService");
const randomize = require("randomatic");
const jwt = require("jsonwebtoken");
const {
  sendEmail,
  sendEmailWithTemplate,
} = require("../services/EmailService");
const cron = require("node-cron");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
//method for creating a user
exports.registerUser = async (req, res) => {
  try {
    const { email, usertype, password } = req.body;
    // check if user exists in our database
    const emailExist = await getUserByEmail(email);
    if (emailExist.length > 0) {
      // if user exists, return an error
      return res.status(400).json({
        status: false,
        data: {},
        message: "User already exists",
      });
    }
    //if user does not exist, we hash the password
    const hashed_password = await bcryptjs.hash(password, 10);
    //generate a verification token
    const verification_token = randomize("A0a0", 40);
    //store user details to database.
    const user = await saveUser(
      email,
      usertype,
      hashed_password,
      verification_token
    );
    if (!user) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    const verification_link = `http://localhost:4000/auth/verify/${verification_token}/${email}`;
    const data = {
      verification_link: verification_link,
      subject: "Email Verification",
      text: `Click on this link to verify your email : ${verification_link}`,
      html: `<p>Click on this link to verify your email: <a href="${verification_link}"> Click Here </a></p> `,
    };

    await sendEmailWithTemplate(email, data);

    return res.status(200).json({
      status: true,
      data: {},
      message: "Successful",
    });
    //send email to user
  } catch (error) {
    console.error(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists in our database
    const emailExist = await getUserByEmail(email);
    if (emailExist.length === 0) {
      // if user does not exists, return an error
      return res.status(400).json({
        status: false,
        data: {},
        message: "User does not exist",
      });
    }

    const user = emailExist[0]; // Assuming emailExist is an array with at most one user
    const hashedPasswordFromDB = user.password;

    // Compare the entered password with the hashed password from the database
    const passwordMatch = await bcryptjs.compare(
      password,
      hashedPasswordFromDB
    );

    if (!passwordMatch) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Invalid email or password",
      });
    }

    // if password match, check if the user is verified
    if (!user.is_verified) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "user is not verified",
      });
    }

    const payload = {
      email,
      id: user.id,
    };
    //generate a token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    const userData = {
      id: user.id,
      email: user.email,
      verification_token: user.verification_token,
      is_verified: user.is_verified,
    };

    return res.status(200).json({
      status: true,
      data: {
        userData,
      },
      message: "Successful",
      token,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { verification_token, email } = req.params;
    // check if user exists in our database
    const emailExist = await getUserByEmail(email);
    if (emailExist.length === 0) {
      // if user does not exists, return an error
      return res.status(400).json({
        status: false,
        data: {},
        message: "User does not exist",
      });
    }

    const user = emailExist[0];
    const verificationTokenFromDB = user.verification_token;

    if (verificationTokenFromDB != verification_token) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Invalid email or token",
      });
    }

    const update_user = await verifyUserAccount(user.id);

    if (!update_user) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "unexpected error",
      });
    }

    return res.status(200).json({
      status: true,
      data: {},
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getUserFromNodeCache = async (req, res) => {
  const { email } = req.body;
  // first check if data is in cache
  let userData = myCache.get(email);
  if (!userData) {
    //fetch from database
    const userData = await getUserByEmail(email);
    if (!userData) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "user not found",
      });
    }
    //store user data in cache
    myCache.set(email, userData, 600);
  }
  return res.status(200).json({
    status: true,
    data: userData,
    message: "request successful",
  });
};

const cronSchedule = "* * * * *";
function notifyUnverifiedUsers() {
  const unverifedUsers = getUnverifiedUsers();
  console.log(unverifedUsers);
  unverifedUsers.forEach((user) => {
    // sendReminderEmail to verify their accoounts
  });
  console.log(
    `Email has been sent to ${unverifedUsers.length} unverified users`
  );
}
const cronjob = cron.schedule(cronSchedule, notifyUnverifiedUsers);
cronjob.start();
//message
