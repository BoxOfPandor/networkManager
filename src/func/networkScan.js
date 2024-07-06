const { exec } = require('child_process');

// Scan the network for devices
function scanNetwork(callback) {
    // Run the arp-scan command
    exec('sudo arp-scan --localnet', (err, stdout, stderr) => {
        // If an error occurs, call the callback with the error
        if (err) {
            callback(err, null);
            return;k
        }
        // Split the output into lines
        const lines = stdout.split('\n');
        const devices = [];
        // Parse each line and extract the IP, MAC, and vendor
        lines.forEach(line => {
            const match = line.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+([0-9A-Fa-f:]{17})\s+(.*)/);
            if (match) {
                devices.push({
                    ip: match[1],
                    mac: match[2],
                    vendor: match[3].trim()
                });
            }
        });
        // Call the callback with the list of devices
        callback(null, devices);
    });
}

module.exports = {
    scanNetwork
};
