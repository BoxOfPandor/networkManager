const express = require('express');
const router = express.Router();
const { scanNetwork } = require('../func/networkScan.js');
const { supprimerDevice, ajouterDevice } = require('./device.query.js');

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
    const { ip, mac } = req.query;

    if (!ip && !mac) {
        return res.status(400).send({ message: "Veuillez fournir une adresse IP ou une adresse MAC." });
    }

    scanNetwork().then(devices => {
        devices = devices || []; // Ensure devices is an array
        const deviceFound = devices.find(device => device.ip === ip || device.mac === mac);

        if (deviceFound) {
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

router.delete('/device', (req, res) => {
    const { ip, mac } = req.query;

    if ((!ip || ip.trim() === "") && (!mac || mac.trim() === "")) {
        return res.status(400).send({ message: "Veuillez fournir une adresse IP ou une adresse MAC valide." });
    }

    scanNetwork().then(devices => {
        devices = devices || []; // Ensure devices is an array
        const deviceFound = devices.find(device => device.ip === ip || device.mac === mac);

        if (deviceFound) {
            supprimerDevice(deviceFound.ip || deviceFound.mac);
            res.send({ message: "L'élément a été supprimé avec succès." });
        } else {
            res.status(404).send({ message: "L'élément n'a pas été trouvé dans le réseau." });
        }
    }).catch(error => {
        console.error("Erreur lors de la recherche dans le réseau :", error);
        res.status(500).send({ message: "Erreur lors de la recherche dans le réseau." });
    });
});

module.exports = router;