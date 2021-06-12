import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function AdminPage(props) {
    const allGames = useSelector((store) => store.allgames);
    const user = useSelector((store) => store.user);
    // console.log('all games', allGames);

    const [heading, setHeading] = useState('Admin Component');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_GAMES' })
    }, [])

    function deleteGame(gameId) {
        //dispatch to game saga
        //need game_id
        console.log('delete this game', gameId);
        dispatch({
            type: 'DELETE_GAME',
            payload: gameId
        })

    }

    return (
        <div>
            <h2>{heading}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Golf Course</th>
                        <th>Wager</th>
                        <th>Date/Time</th>
                    </tr>
                </thead>

                <tbody>
                    {allGames && allGames.map((game) => 
                    <tr key={game.gameId}>
                        <td>{game.username}</td>
                        <td>{game.course}</td>
                        <td>{game.wager}</td>
                        <td>{game.end_time}</td>
                        <td><button onClick={() => deleteGame(game.gameId)}>Delete</button></td>
                    </tr>)}

                </tbody>
            </table>
        </div>
    );
}

export default AdminPage;
