const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

function cleanUp(arr) {
    let points = [];
    let res = {};

    //count bingo point for each player
    arr.forEach(function(v) {
        res[v.bingo] = (res[v.bingo] || 0) + 1;
    })

    //count bango point for each player
    arr.forEach(function(v) {
        res[v.bango] = (res[v.bango] || 0) + 1;
    })

    //count bongo point for each player
    arr.forEach(function(v) {
        res[v.bongo] = (res[v.bongo] || 0) + 1;
    })

    points.push(res);
    // console.log(res);
    // console.log(points);
    return points;

}

router.get('/all', rejectUnauthenticated, (req, res) => {
    // GET route: may be a admin endpoint. currently, any authenticated user
    // can view all the games.
    //this gets all the games in the db
    const sqlText = `
    SELECT "game"."id" AS "gameId", "user"."id" AS "userId", "user"."username",
    "game"."course", "game"."wager", "game"."end_time"
    FROM "game"
    JOIN "user" ON ("game"."user_id" = "user"."id");`;
    pool.query(sqlText).then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log('GET All games req problems on server', error);
        res.sendStatus(500);
    })
});

router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    //this gets current games in the db by auth user who started the game
    //the FETCH_GAME_ROUND action from game saga
    const sqlText = `
    SELECT * 
    FROM "game" 
    JOIN "round" ON ("game"."id" = "round"."game_id") 
    WHERE "user_id" = $1 AND "game"."game_status" = 1
    ORDER BY "round"."hole_number";`;
    pool.query(sqlText, [req.user.id]).then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log('GET req problems on server', error);
        res.sendStatus(500);
    })
});

router.get('/current/:id', rejectUnauthenticated, (req, res) => {
    // GET route code here
    //this gets the current game round in the db by auth user who started the game
    const sqlText = `
    SELECT * 
    FROM "game"
    JOIN "round" ON ("game"."id" = "round"."game_id")
    WHERE "user_id" = $1 
    AND "game"."game_status" = 1
    AND "round"."id" = $2;`;
    pool.query(sqlText, [req.user.id, req.params.id]).then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log('GET req problems on server', error);
        res.sendStatus(500);
    })
});

//GET points for the game
router.get('/point', rejectUnauthenticated, (req, res) => {
    // GET route code here
    //need user id
    //game id is provided by params
    //this gets the current game in the db by auth user
    //and return sum of player points through current hole.
    console.log('the points for user game', req.user.id);
    const sqlText = `
    SELECT "game"."player1", "game"."player2", "game"."player3", "game"."player4", "game"."wager",
    "round"."id" AS "round_id", "round"."game_id", "round"."hole_number",
    "round"."bingo", "round"."bango", "round"."bongo" 
    FROM "round"
    JOIN "game" ON ("round"."game_id" = "game"."id")
    JOIN "user" ON ("game"."user_id" = "user"."id")
    WHERE "user"."id" = $1;`;
    pool.query(sqlText, [req.user.id]).then((response) => {
        let gamePoints = response.rows;
        let gameData = cleanUp(gamePoints);
        console.log(gameData);
        const endgameInfo = [...gamePoints, ...gameData];
        res.send(endgameInfo);
        // console.log('the payout sql response', response.rows);
        // res.send(response.rows);
        // res.sendStatus(200);
    }).catch((error) => {
        console.log('GET req problems on server', error);
        res.sendStatus(500);
    })
});


// PUT route to update game
router.put('/', rejectUnauthenticated, (req, res) => {
    //update the game round and increment the current_round in the game
    //need: game id, user id
    console.log('next round', req.body);
    console.log('the user is', req.user.id);

    const sqlText = `
    UPDATE "game" 
    SET "current_round" = "current_round" + 1
    WHERE "id" = $1 AND "user_id" = $2`;
    pool.query(sqlText, [req.body.game_id, req.user.id])
        .then((response) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('PUT req problems on server', error);
            res.sendStatus(500);
        })
});


//POST to both game and round tables
router.post('/start', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    // RETURNING "id" will give us back the id of the created game
    // user_id, course, wager, isFrontNine
    const insertGameQuery = `
    INSERT INTO "game" 
    ("user_id", "course", "wager", "isFrontNine",
     "player1", "player2", "player3", "player4")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING "id", "isFrontNine";`

    // FIRST QUERY MAKES GAME
    pool.query(insertGameQuery,
         [req.user.id, req.body.course, req.body.wager, req.body.isFrontNine,
        req.body.player1, req.body.player2, req.body.player3, req.body.player4])
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


// PUT route to end the game
router.put('/end', rejectUnauthenticated, (req, res) => {
    //end the game
    //need: game id, user id
    console.log('end game', req.body);
    console.log('the user is', req.user.id);

    const sqlText = `
    UPDATE "game" 
    SET "game_status" = 2, "end_time" = NOW()
    WHERE "id" = $1 AND "user_id" = $2`;
    pool.query(sqlText, [req.body.game_id, req.user.id])
        .then((response) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('PUT req problems on server', error);
            res.sendStatus(500);
        })
});

// DELETE route code here
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
    //update the game round and increment the current_round in the game
    //need: game id, user id

    console.log('delete game', req.params.id);
    console.log('the user is', req.user.id);

    const sqlText = `
    DELETE FROM "game"
    WHERE "id" = $1 AND "user_id" = $2`;
    pool.query(sqlText, [req.params.id, req.user.id,])
        .then((response) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('DELETE req problems on server', error);
            res.sendStatus(500);
        })
});


module.exports = router;
