const bcryptjs = require("bcryptjs")
//method for creating a user
exports.registerUser = async (req, res) => {
    try {
        const { email, usertype, password } = req.body
        // check if user exists in our database
        // if user exists, return an error
        return res.status(400).json({
            status : false,
            data : [],
            message : "User not found"
        })

        //if user does not exist, we hash the password
        const hashed_password = await bcryptjs.hash(password, 10);
        //store user details to database.
    } catch (error) {
        console.error(error)
    }
}

// exports.loginUser = async (req, res) => {
    
// }