const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const contactsRoutes = require('./routes/contacts');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/uploads', express.static('uploads')); // Servir imágenes
app.use('/api/contacts', contactsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

