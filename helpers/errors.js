class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const { statusCode, message } = err;
    return res.status(statusCode ? statusCode : 500).json({
        success: false,
        message
    });
};

module.exports = {
    ErrorHandler,
    handleError
};
