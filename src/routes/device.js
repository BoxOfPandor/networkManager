const express = require('express');
const router = express.Router();
// Importer scanNetwork depuis func/networkScan.js
const { scanNetwork } = require('../func/networkScan.js');

// Fonction de comparaison pour trier les adresses IP
function compareIPs(a, b) {
    const ipA = a.ip.split('.').map(Number);
    const ipB = b.ip.split('.').map(Number);

    for (let i = 0; i < ipA.length; i++) {
        if (ipA[i] < ipB[i]) return -1;
        if (ipA[i] > ipB[i]) return 1;
    }
    return 0;
}

router.post('/device', (req, res) => {
    // Récupérer l'adresse IP ou l'adresse MAC depuis les paramètres de la requête
    const { ip, mac } = req.query;

    if (!ip && !mac) {
        return res.status(400).send({ message: "Veuillez fournir une adresse IP ou une adresse MAC." });
    }

    scanNetwork().then(devices => {
        const deviceFound = devices.find(device => device.ip === ip || device.mac === mac);

        if (deviceFound) {
            const { ajouterDevice } = require('./device.query.js');
            ajouterDevice(deviceFound.ip, deviceFound.mac, deviceFound.vendor, "Ajouté automatiquement");
            res.send({ message: "L'élément a été ajouté avec succès." });
        } else {
            res.status(404).send({ message: "L'élément n'a pas été trouvé dans le réseau." });
        }
    }).catch(error => {
        console.error("Erreur lors de la recherche dans le réseau :", error);
        res.status(500).send({ message: "Erreur lors de la recherche dans le réseau." });
    });
});
