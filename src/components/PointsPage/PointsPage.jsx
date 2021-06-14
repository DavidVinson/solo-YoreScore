import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function PointsPage(props) {

    useEffect(() => {
        dispatch({ type: 'FETCH_POINTS' }),
        dispatch({type: 'FETCH_ALL_GAMES'})
    }, [])

    const history = useHistory();
    const dispatch = useDispatch();
    
    const gamePoints = useSelector((store) => store.payout);
    const games = useSelector((store) => store.allgames);

    //gamePoints: {player1: pts, player2: pts, player3: pts, player4: pts}
    console.log('the game points', gamePoints);
    console.log('games', games);

    const [heading, setHeading] = useState('Points Page');

    function displayPayout() {

        const players = Object.fromEntries(Object.entries(gamePoints).map(([key, value]) => [key, value * 2]));
        console.log('the players', players);
        return (

            <tr>
                <td>{JSON.stringify(players)}</td>
            </tr>
        );
    }


    if (!gamePoints) return (<p>Loading...</p>); //have to refresh page

    else {

        return (

            <>
                <h2>Payout</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Payout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>{JSON.stringify(players)}</td>
                        </tr> */}
                    {displayPayout(gamePoints)}
                    </tbody>
                </table>
            </>
        );

    }

}

export default PointsPage;
