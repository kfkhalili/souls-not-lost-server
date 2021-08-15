const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authorized!!');
        error.statusCode = 401;
        throw error;
    }
    const token = req.get('Authorization').split(' ')[1];

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(decodedToken.userType !== "admin"){
            const error = new Error('Not authorized!!');
            error.statusCode = 401;
            throw error;
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 401;
        }
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authorized!!');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};
module.exports = {
    isAdmin
}