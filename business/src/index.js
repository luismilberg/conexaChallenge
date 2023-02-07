require("dotenv").config();
const express = require('express');
const routes = require("./routes");
const bodyParser = require("body-parser");

require("./config/db");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(process.env.PORT, console.log("Corriendo en el puerto: ", process.env.PORT));