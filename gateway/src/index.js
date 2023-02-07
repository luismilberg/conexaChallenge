require("dotenv").config();
const express = require ('express');
const {ROUTES} = require("./routes");

const {setupLogging} = require("./logging");
const {setupProxies} = require("./proxy");

const app = express();
const port = process.env.PORT;

setupLogging(app);
setupProxies(app, ROUTES);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});