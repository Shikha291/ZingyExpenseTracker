const jwt = require('jsonwebtoken');

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).json({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchUser;
