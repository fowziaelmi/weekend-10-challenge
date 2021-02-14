const express = require('express');
const taskRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

module.exports = taskRouter;
