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

//POST endpoint
taskRouter.post('/', (req, res) => {
  console.log('req.body', req.body);
  //query the database
  let sqlText = `INSERT INTO "tasks" ("task_to_complete") VALUES($1)`;
  let sqlArgs = [req.body.task_to_complete];

  pool
    .query(sqlText, sqlArgs)
    .then(function (dbRes) {
      res.sendStatus(200);
    })
    .catch(function (error) {
      console.log('POST error', error);
    });
});

//PUT

taskRouter.put('/complete/:id', (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  let taskId = req.params.id;
  // let newValue = req.body.read;

  let sqlText = `UPDATE "tasks" SET "complete" = 'TRUE' WHERE "id"=$1`;

  pool
    .query(sqlText, [taskId])
    .then((dbRes) => {
      console.log('dbRes is ', dbRes);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
    });
});

taskRouter.delete('/:id', function (req, res) {
  let deleteId = req.params.id;
  let sqlText = ` DELETE FROM "tasks" WHERE "id"=$1 `;

  pool
    .query(sqlText, [deleteId])
    .then((dbRes) => {
      console.log('task deleted');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error on delete', error);
    });
});

module.exports = taskRouter;
