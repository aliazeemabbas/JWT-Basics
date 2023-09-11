const jwt = require('jsonwebtoken')
const CustomAPIError = require("../errors/custom-error");

const authenticationMiddleware = async (req, res, next) => {
   
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new CustomAPIError('No token', 401)
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username}
        next()
    } catch (error) {
        throw new CustomAPIError('Not authorized', 401)
    }

    next()
}

module.exports = authenticationMiddleware