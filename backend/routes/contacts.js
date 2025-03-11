const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { verifyToken } = require('../middleware/auth');
const Contact = require('../models/Contact');
const fs = require('fs');
const path = require('path');

// Obtener todos los contactos (PROTEGIDO)
router.get('/', verifyToken, async (req, res) => {
    const contacts = await Contact.getAll();
    res.json(contacts);
});

// Agregar nuevo contacto (PROTEGIDO)
router.post('/', verifyToken, async (req, res) => {
    const { nombre, apellidos, telefono, email } = req.body;
    const contactId = await Contact.create({ nombre, apellidos, telefono, email });
    res.json({ id: contactId });
});

// Obtener todos los contactos
router.get('/', async (req, res) => {
    const contacts = await Contact.getAll();
    res.json(contacts);
});

// Crear contacto con validación
router.post('/',
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Email no válido'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { nombre, apellidos, telefono, email } = req.body;
        let foto = '';

        // Guardar imagen si se sube una
        if (req.files && req.files.foto) {
            const uploadPath = path.join(__dirname, '../uploads', req.files.foto.name);
            await req.files.foto.mv(uploadPath);
            foto = `/uploads/${req.files.foto.name}`;
        }

        const contactId = await Contact.create({ nombre, apellidos, telefono, email, foto });
        res.json({ id: contactId });
    }
);

// Editar contacto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updated = await Contact.update(id, req.body);
    res.json({ updated });
});

// Eliminar contacto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Contact.delete(id);
    res.json({ message: 'Contacto eliminado' });
});

module.exports = router;
