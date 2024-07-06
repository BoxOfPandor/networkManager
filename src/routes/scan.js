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

// Define a route to scan the network
router.get('/scan', (req, res) => {
    // Call the scanNetwork function
    scanNetwork((err, data) => {
        // If an error occurs, send a 500 error response
        if (err) {
            res.status(500).send({ error: 'Error scanning network' });
            return;
        }
        // Trier les appareils par adresse IP avant de les envoyer
        const sortedData = data.sort(compareIPs);
        // Send the sorted list of devices as a JSON response
        res.json(sortedData);
    });
});

// Route pour filtrer les appareils par IP
router.get('/scan_ip', (req, res) => {
    // Vérifier si le paramètre ip est présent dans la requête
    if (!req.query.ip) {
        return res.status(400).send('Le paramètre ip est manquant dans la requête.');
    }

    const ipToFind = req.query.ip;

    scanNetwork((err, data) => {
        if (err) {
            res.status(500).send({ error: 'Erreur lors du scan du réseau' });
            return;
        }
        const filteredDevices = data.filter(device => device.ip === ipToFind);
        if (filteredDevices.length === 0) {
            // Réponse 404 si aucun appareil n'est trouvé
            return res.status(404).send(`Aucun appareil trouvé avec l'adresse IP : ${ipToFind}`);
        }
        res.json(filteredDevices);
    });
});

// Route pour filtrer les appareils par adresse MAC
router.get('/scan_mac', (req, res) => {
    // Vérifier si le paramètre mac est présent dans la requête
    if (!req.query.mac) {
        return res.status(400).send('Le paramètre mac est manquant dans la requête.');
    }

    const macToFind = req.query.mac;

    scanNetwork((err, data) => {
        if (err) {
            // Trace en cas d'erreur du scan
            return res.status(500).send({ error: 'Erreur lors du scan du réseau' });
        }

        const filteredDevices = data.filter(device => device.mac === macToFind);
        if (filteredDevices.length === 0) {
            // Réponse 404 si aucun appareil n'est trouvé
            return res.status(404).send(`Aucun appareil trouvé avec l'adresse MAC : ${macToFind}`);
        }
        res.json(filteredDevices);
    });
});

// Exporter le routeur
module.exports = router;