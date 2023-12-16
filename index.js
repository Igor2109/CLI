const express = require('express');

const logger = require('morgan')

const router = require('./router');

const app = express();

app.use(logger("common"));

app.use(express.json());

app.use("/files", router);

app.listen(3001, () => { console.log("Server start") });


