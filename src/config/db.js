const mysql = require('mysql');
require('dotenv').config();

// Création de la connexion à la base de données
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Exporter la connexion pour l'utiliser dans d'autres fichiers
module.exports = db;