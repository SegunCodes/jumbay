const jwt = require("jsonwebtoken")
exports.verifyToken = async (req,res,next) => {
    if (!req.headers.authorization ||  !req.headers.authorization.startsWith("Bearer")) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized",
            data: {}
        });
    }

    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            email: decodedToken.email,
            id: decodedToken.id, 
        }
        next()
    } catch (error) {
        console.error(error)
    }
}