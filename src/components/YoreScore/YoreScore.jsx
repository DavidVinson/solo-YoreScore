import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function YoreScore(props) {
    const { gameId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    //game score from score reducer
    const gameScore = useSelector((store) => store.score);
    // const games = useSelector((store) => store.allgames);

    // useEffect(() => {
    //     dispatch({
    //         type: 'FETCH_YORE_SCORE',
    //         payload: Number(gameId)
    //     })
    // }, []); //AJ had idea to use dispatch in the [] 


    //gameScore: {player1: pts, player2: pts, player3: pts, player4: pts}
    console.log('the game score', gameScore);
    // console.log('games', games);
    console.log('game id', gameId);

    const [heading, setHeading] = useState('Points Page');

    // function displayPayout(gameScore) {

    // const players = Object.fromEntries(Object.entries(gameScore).map(([key, value]) => [key, value * 2]));
    // console.log('the players', players);

    // let score = gameScore.pop();
    // let firstItem = gameScore.shift();
    // console.log('first item', firstItem);
    // let wager = firstItem.wager;
    // console.log('wager', wager);
    // const players = Object.fromEntries(Object.entries(score).map(([key, value]) => [key, value * wager]));

    // return (
    //     <tr>
    //         <td>{JSON.stringify(score)}</td>
    //         <td><button onClick={() => history.push('/home')}>Home</button></td>

    //     </tr>
    // );
    // }


    if (!gameScore) return (<p>Loading...</p>); //have to refresh page

    else {

        //players is the last item in the gameScore
        //constains the tallied point count

        const players = Object.keys(gameScore[gameScore.length - 1]);
        const justPlayers = players.slice(0, 4);
        // const players = Object.entries(gameScore[gameScore.length - 1]);

        console.log('keys', players);
        console.log('just players', justPlayers);
        // console.log('wager', players[players.length - 1]);

        return (

            <>
                <h2>YoreScore for game {gameId}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Points</th>
                            <th>Wager</th>
                            <th>Payout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) =>
                            <tr>
                                <td>{player}</td>
                            </tr>
                        )}
                    </tbody>

                </table>
                <hr />
                <table>
                    <thead>
                        <tr>
                            <th>Hole</th>
                            <th>Bingo</th>
                            <th>Bango</th>
                            <th>Bongo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gameScore.map((game) =>
                            <tr key={game.round_id}>
                                <td>{game.hole_number}</td>
                                <td>{game.bingo}</td>
                                <td>{game.bango}</td>
                                <td>{game.bongo}</td>
                            </tr>)}
                    </tbody>
                </table>
            </>
        );

    }

}

export default YoreScore;
