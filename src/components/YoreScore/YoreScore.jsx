import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function YoreScore(props) {
    const { gameId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const gameScore = useSelector((store) => store.score);
    const games = useSelector((store) => store.allgames);

    useEffect(() => {
        dispatch({
            type: 'FETCH_YORE_SCORE',
            payload: Number(gameId)
        })
    }, [])


    //gameScore: {player1: pts, player2: pts, player3: pts, player4: pts}
    console.log('the game score', gameScore);
    console.log('games', games);
    console.log('game id', gameId);

    const [heading, setHeading] = useState('Points Page');

    function displayPayout(gameScore) {

        // const players = Object.fromEntries(Object.entries(gameScore).map(([key, value]) => [key, value * 2]));
        // console.log('the players', players);

        let score = gameScore.pop();
        let firstItem = gameScore.shift();
        console.log('first item', firstItem);
        // let wager = firstItem.wager;
        // console.log('wager', wager);
        // const players = Object.fromEntries(Object.entries(score).map(([key, value]) => [key, value * wager]));

        return (
            <tr>
                <td>{JSON.stringify(score)}</td>
            </tr>
        );
    }


    if (!gameScore) return (<p>Loading...</p>); //have to refresh page

    else {

        return (

            <>
                <h2>YoreScore</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Payout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayPayout(gameScore)}
                    </tbody>
                </table>
            </>
        );

    }

}

export default YoreScore;
