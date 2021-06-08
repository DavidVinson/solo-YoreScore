const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/all', rejectUnauthenticated, (req, res) => {
    // GET route: may be a admin endpoint. currently, any authenticated user
    // can view all the games.
    //this gets all the games in the db
    const sqlText = `SELECT * FROM "game";`;
    pool.query(sqlText).then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log('GET req problems on server', error);
        res.sendStatus(500);
    })
});

router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    //this gets all the games in the db by auth user who started the game
    const sqlText = `SELECT * FROM "game" WHERE user_id = $1;`;
    pool.query(sqlText, [req.user.id]).then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log('GET req problems on server', error);
        res.sendStatus(500);
    })
});

// PUT route code here
router.put('/:id', rejectUnauthenticated, (req, res) => {
    
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

// PUT route to update game
router.put('/', rejectUnauthenticated, (req, res) => {
    //update the game round and increment the current_round in the game
    //need: game table id
    console.log('update players at id', req.body.id);
    console.log('the user is', req.user.id);
    const sqlText = `
    UPDATE "game" 
    SET "current_round" = "current_round" + 1
    WHERE "id" = $1 AND "user_id" = $2`;
    pool.query(sqlText, [req.params.id, req.user.id])
        .then((response) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('PUT req problems on server', error);
            res.sendStatus(500);
        })
});


//POST to both game and round tables
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    // RETURNING "id" will give us back the id of the created game
    // user_id, course, wager, isFrontNine
    const insertGameQuery = `
    INSERT INTO "game" ("user_id", "course", "wager", "isFrontNine")
    VALUES ($1, $2, $3, $4)
    RETURNING "id", "isFrontNine";`

    // FIRST QUERY MAKES GAME
    pool.query(insertGameQuery, [req.user.id, req.body.course, req.body.wager, req.body.isFrontNine])
        .then(result => {
            console.log('New Game Id:', result.rows[0].id); //ID IS HERE!

            // console.log('result rows', result.rows);
            //result.rows is an arrary of obj.
            const createdGameId = result.rows[0].id;
            const frontNine = result.rows[0].isFrontNine;

            // Now handle the round reference
            //i need the current_round field from the game table
            //this will set the hole_number in the round table
            //if isFrontNine = false, current_round is 1, and hole_number = (current_round + 9)
            let hole_number = 1;
            if (!frontNine) {
                hole_number = 10;
            }
            const insertGameRoundQuery = `

        INSERT INTO "round" ("game_id", "hole_number")
        VALUES  ($1, $2);
        `
            // SECOND QUERY ADDS ROUND FOR THAT NEW GAME
            pool.query(insertGameRoundQuery, [createdGameId, hole_number]).then(result => {
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
