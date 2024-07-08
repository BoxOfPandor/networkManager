/**
 * File : src/routes/scan.js
 * Author: BoxOfPandor (Thibault Pouch)
 * 
 * Comments:
 *     This file is a new route that allows to scan the network
 */

const express = require('express');
const router = express.Router();
const { scanNetwork } = require('../func/networkScan.js');
const { estAdresseIPValide, estAdresseMACValide } = require('../func/verify.js');

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

router.get('/scan', (req, res) => {
    scanNetwork((err, data) => {
        if (err) {
            res.status(500).send({ error: 'Erreur lors du scan du réseau' });
            return;
        }

        let filteredData = data;

        // Vérifier et filtrer par IP si le paramètre ip est fourni
        if (req.query.ip) {
            if (!estAdresseIPValide(req.query.ip)) {
                res.status(400).send({ error: 'Format d\'adresse IP invalide' });
                return;
            }
            filteredData = filteredData.filter(device => device.ip === req.query.ip);
        }

        // Vérifier et filtrer par MAC si le paramètre mac est fourni
        if (req.query.mac) {
            if (!estAdresseMACValide(req.query.mac)) {
                res.status(400).send({ error: 'Format d\'adresse MAC invalide' });
                return;
            }
            filteredData = filteredData.filter(device => device.mac === req.query.mac);
        }

        // Trier les appareils par adresse IP avant de les envoyer
        const sortedData = filteredData.sort(compareIPs);

        res.json(sortedData);
    });
});

// Exporter le routeur
module.exports = router;