const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

const scanRoutes = require("./routes/scan");

app.use(scanRoutes);

app.get("/",(req, res) => {
    res.send("Hello World !");
}) ;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});