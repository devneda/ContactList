const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { SECRET_KEY } = require('../middleware/auth');

// Usuarios simulados (esto en un proyecto real iría en una base de datos)
const users = [
    { email: 'admin@example.com', password: '123456' }
];

// Ruta de Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Crear token con JWT
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
});

module.exports = router;
