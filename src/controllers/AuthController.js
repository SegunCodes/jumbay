const bcryptjs = require("bcryptjs")
const { getUserByEmail, saveUser } = require("../services/UserService")
const randomize = require("randomatic")
//method for creating a user
exports.registerUser = async (req, res) => {
    try {
        const { email, usertype, password } = req.body
        // check if user exists in our database
        const emailExist = await getUserByEmail(email)
        if (emailExist.length > 0) {
            // if user exists, return an error
            return res.status(400).json({
                status : false,
                data : [],
                message : "User already exists"
            }) 
        }
        //if user does not exist, we hash the password
        const hashed_password = await bcryptjs.hash(password, 10);
        //generate a verification token
        const verification_token = randomize('A0a0', 40)
        //store user details to database.
        const user = await saveUser(email, usertype, hashed_password, verification_token);
        if (!user) {
            return res.status(400).json({
                status : false,
                data : [],
                message : "Something went wrong"
            })
        }

        return res.status(200).json({
            status : true,
            data : [],
            message : "Successful"
        })
        //send email to user
    } catch (error) {
        console.error(error)
    }
}

// exports.loginUser = async (req, res) => {
    
// }