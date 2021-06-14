import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function YoreGames(props) {

    //This page responsible for displaying the user's games
    const allGames = useSelector((store) => store.allgames);
    const user = useSelector((store) => store.user);
    console.log('all games on YoreGames page', allGames);

    const [heading, setHeading] = useState('All Yore Games');

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_GAMES' })
    }, [dispatch])

    function deleteGame(gameId) {
        //dispatch to game saga
        //need game_id
        console.log('delete this game', gameId);
        dispatch({
            type: 'DELETE_GAME',
            payload: gameId
        })
    }

    function getScores(gameId) {
        //dispatch to FETCH_YORE_SCORE
        console.log('the game score id', gameId);
        dispatch({
            type: 'FETCH_YORE_SCORE',
            payload: gameId
        })

        history.push(`/score/${gameId}`);
    }




    return (
        <div>
            <h2>{heading}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Golf Course</th>
                        <th>Date/Time</th>
                    </tr>
                </thead>

                <tbody>
                    {allGames && allGames.map((game) =>
                        <tr key={game.gameId}>
                            <td>{game.username}</td>
                            <td>{game.course}</td>
                            <td>{game.end_time}</td>
                            <td><button onClick={() => getScores(game.gameId)}>YoreScore!</button></td>
                            <td><button onClick={() => deleteGame(game.gameId)}>Delete</button></td>

                        </tr>)}

                </tbody>
            </table>
        </div>
    );
}

export default YoreGames;
