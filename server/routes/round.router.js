const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    //this gets all rounds by the auth user
    const sqlText = `
    SELECT "user"."username", "round"."id" AS "round_id", "round"."game_id", "round"."hole_number", "round"."bingo", "round"."bango", "round"."bongo" 
    FROM "round"
    JOIN "game" ON ("round"."game_id" = "game"."id")
    JOIN "user" ON ("game"."user_id" = "user"."id")
    WHERE "user"."id" = $1;`;
    pool.query(sqlText, [req.user.id]).then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log('GET req problems on server', error);
        res.sendStatus(500);
    })
});


router.put('/', rejectUnauthenticated, (req, res) => {
    // PUT route: updates the round table to assign players to point columns.
    // need the following in the axios call: ex,
    // {game_id: 1, hole_number: 10, bingo: 'player2', bango: 'Dave', bongo: 'player3'}
    // console.log('update round table at game_id', req.body.game_id);
    // console.log('the user is', req.user.id);
    console.log('points', req.body);
    let hole_number = req.body.hole_number;
    let bingo = req.body.bingo;
    let bango = req.body.bango;
    let bongo = req.body.bongo;
    const sqlText = `
    UPDATE "round" 
    SET "bingo" = $3, "bango" = $4, "bongo" = $5, "end_time" = NOW()
    WHERE "game_id" = $1 AND "hole_number" = $2;`;
    pool.query(sqlText, [req.body.game_id, hole_number, bingo, bango, bongo])
        .then((response) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('PUT req problems on route round', error);
            res.sendStatus(500);
        })
});


module.exports = router;
