const jwt = require('jsonwebtoken');

exports.decodeToken = (token) => {
    const decodedToken = jwt.verify(token, process.env.TOKEN_ENCRYPT);
    const userId = decodedToken.userId;
    return userId;
}