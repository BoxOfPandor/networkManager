/**
 * File : src/func/verify.js
 * Author: BoxOfPandor (Thibault Pouch)
 * 
 * Comments:
 *    This file contains functions to verify if an
 *    IP address or a MAC address is valid.
 */

function estAdresseIPValide(ip) {
    const regexIP = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regexIP.test(ip);
}

function estAdresseMACValide(mac) {
    const regexMAC = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return regexMAC.test(mac);
}