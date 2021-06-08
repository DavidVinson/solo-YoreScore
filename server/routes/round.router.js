const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


 router.get('/', (req, res) => {
    // GET route code here
    const sqlText = `SELECT * FROM "round";`;
    pool.query(sqlText).then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log('GET error', error);
        res.sendStatus(500);
    })
});


router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
