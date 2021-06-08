const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/all', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const sqlText = `SELECT * FROM "game";`;
    pool.query(sqlText).then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log('GET req problems on server', error);
        res.sendStatus(500);
    })
});


// router.post('/', rejectUnauthenticated, (req, res) => {
//     // POST route code here
//     console.log('add to game table', req.body);
//     console.log('the user is', req.user.id);
//     const sqlText = `
//     INSERT INTO "game" ("user_id", "course", "wager")
//     VALUES ($1, $2, $3);`;
//     pool.query(sqlText, [req.user.id, req.body.course, req.body.wager])
//     .then((response) => {
//         res.sendStatus(201);
//     }).catch((error) => {
//         console.log('POST req problems on server', error);
//         res.sendStatus(500);
//     })
// });

router.put('/:id', rejectUnauthenticated, (req, res) => {
    // PUT route code here
    console.log('update game table at id', req.params.id);
    console.log('the user is', req.user.id);
    const sqlText = `
    UPDATE "game" 
    SET "current_round" = "current_round" + 1
    WHERE "id" = $1 AND "user_id" = $2`;
    pool.query(sqlText, [req.params.id, req.user.id,])
    .then((response) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('PUT req problems on server', error);
        res.sendStatus(500);
    })
});

router.put('/player', rejectUnauthenticated, (req, res) => {
    // PUT route code here
    console.log('update players at id', req.body.id);
    console.log('the user is', req.user.id);
    const sqlText = `
    UPDATE "game" 
    SET "current_round" = "current_round" + 1
    WHERE "id" = $1 AND "user_id" = $2`;
    pool.query(sqlText, [req.params.id, req.user.id,])
    .then((response) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('PUT req problems on server', error);
        res.sendStatus(500);
    })
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    // DELETE route code here
    console.log('update game table at id', req.params.id);
    console.log('the user is', req.user.id);
    const sqlText = `
    UPDATE "game" 
    SET "current_round" = "current_round" + 1
    WHERE "id" = $1 AND "user_id" = $2`;
    pool.query(sqlText, [req.params.id, req.user.id,])
    .then((response) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('DELETE req problems on server', error);
        res.sendStatus(500);
    })
});


//POST to both game and round tables
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    // RETURNING "id" will give us back the id of the created game
    const insertGameQuery = `
    INSERT INTO "game" ("user_id", "course", "wager")
    VALUES ($1, $2, $3)
    RETURNING "id";`
  
    // FIRST QUERY MAKES GAME
    pool.query(insertGameQuery, [req.user.id, req.body.course, req.body.wager])
    .then(result => {
      console.log('New Game Id:', result.rows[0].id); //ID IS HERE!
      
      const createdGameId = result.rows[0].id
  
      // Now handle the round reference
      const insertGameRoundQuery = `
        INSERT INTO "round" ("game_id", "hole_number")
        VALUES  ($1, $2);
        `
        // SECOND QUERY ADDS ROUND FOR THAT NEW GAME
        pool.query(insertGameRoundQuery, [createdGameId, 1]).then(result => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
        })
  
  // Catch for first query
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
  })

module.exports = router;
