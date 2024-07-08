/**
 * File : src/index.js
 * Author: BoxOfPandor (Thibault Pouch)
 * 
 * Comments:
 *    This file is the main entry point of the application.
 */

const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

const scanRoutes = require("./routes/scan");
const deviceRoutes = require("./routes/device");

app.use(scanRoutes);
app.use(deviceRoutes);

app.get("/",(req, res) => {
    res.send("Hello World !");
}) ;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});