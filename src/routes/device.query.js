const db = require('../config/db.js');

// Fonction pour ajouter un nouvel élément
function ajouterDevice(ip, mac, vendor, commentaire) {
    const sql = `INSERT INTO Devices (Ip, Mac, Vendor, Commentaire) VALUES (?, ?, ?, ?)`;
    db.query(sql, [ip, mac, vendor, commentaire], (err, result) => {
        if (err) throw err;
        console.log('Élément ajouté', result);
    });
}

// Fonction pour supprimer un élément
function supprimerDevice(ipOrMac) {
    let sql;
    if (ipOrMac.includes('.')) { // Supposition que c'est une adresse IP si elle contient un point
        sql = `DELETE FROM Devices WHERE Ip = ?`;
    } else { // Sinon, on suppose que c'est une adresse MAC
        sql = `DELETE FROM Devices WHERE Mac = ?`;
    }
    db.query(sql, [ipOrMac], (err, result) => {
        if (err) throw err;
        console.log('Élément supprimé', result);
    });
}

// Fonction pour modifier un élément existant
function modifierDevice(id, ip, mac, vendor, commentaire) {
    const sql = `UPDATE Devices SET Ip = ?, Mac = ?, Vendor = ?, Commentaire = ? WHERE Id = ?`;
    db.query(sql, [ip, mac, vendor, commentaire, id], (err, result) => {
        if (err) throw err;
        console.log('Élément modifié', result);
    });
}

module.exports = { ajouterDevice, supprimerDevice, modifierDevice };