const express = require('express');
const taskRouter = express.Router();

// DB CONNECTION

const pool = require('../modules/pool.js');
// Set up GET route

taskRouter.get('/', (req, res) => {
  pool
    .query('SELECT * FROM "tasks" ORDER BY "id"')
    // get back db results
    .then(function (dbRes) {
      console.log(dbRes.rows);
      //
      res.send(dbRes.rows);
    })
    .catch(function (err) {
      console.log('error', err);
      // send back a error response so the client sees
      res.sendStatus(500);
    });
});
module.exports = taskRouter;
