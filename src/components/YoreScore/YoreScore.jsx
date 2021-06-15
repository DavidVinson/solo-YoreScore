import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';


function YoreScore(props) {
    const history = useHistory();

    //game score from score reducer
    const gameScore = useSelector((store) => store.score);

    //gameScore: {player1: pts, player2: pts, player3: pts, player4: pts}
    console.log('the game score', gameScore);

    const [heading, setHeading] = useState('Points Page');

    if (gameScore.length === 0) {
        return (<p>Loading...<button onClick={() => history.push('/game')}>Refresh games</button></p>); //have to refresh page

    } else {
        //players are last item in the gameScore array
        const players = Object.entries(gameScore[gameScore.length - 1]);
        // console.log('players', players);

        //wager is the last item in the players array
        const wager = players.pop();
        // console.log('wager', wager);

        return (
            <>
                <h2>YoreScore!</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Points</th>
                            <th></th>
                            <th>Wager</th>
                            <th>Payout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) =>
                            <tr>
                                <td>{player[0]}</td>
                                <td>{player[1]}</td>
                                <td>x</td>
                                <td>{wager[1]}</td>
                                <td>${player[1] * wager[1]}</td>
                            </tr>
                        )}
                    </tbody>

                </Table>
                <hr />
                <Table>
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
                </Table>
            </>
        );
    }
}


export default YoreScore;
