import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
    console.log(req.body)
    if(!req.header) res.status(401).json({ message: 'No header' });
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default authenticateUser;
