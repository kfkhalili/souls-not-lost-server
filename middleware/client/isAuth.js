const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const isClient = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            const error = new Error('not Authorized!!');
            error.statusCode = 401;
            error.state = 2;
            throw error;
        }
        const token = req.get('Authorization').split(' ')[1];

        let decodedToken;

        try {

            decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 401;
                err.state = 2;
            }
            throw err;
        }
        if (!decodedToken) {
            const error = new Error('not Authorized!!');
            error.statusCode = 401;
            error.state = 2;
            throw error;
        }

        const client = await User.findById(decodedToken.id);

        if (!client) {
            const error = new Error('user not found');
            error.statusCode = 404;
            error.state = 3;
            throw error;
        }

        if (client.suspended === true) {
            const error = new Error('client have been blocked');
            error.statusCode = 403;
            error.state = 4;
            throw error;
        }

        if (client.status !== "Active") {
            const error = new Error('you must verify the account to continue');
            error.statusCode = 403;
            error.state = 34;
            throw error;
        }

        req.userId = decodedToken.userId;

        next();

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

module.exports = {
    isClient
}