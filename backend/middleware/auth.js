const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secreto_super_seguro';

// Middleware para verificar token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, se requiere un token' });
    }

    jwt.verify(token.replace('Bearer ', ''), SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = { verifyToken, SECRET_KEY };
