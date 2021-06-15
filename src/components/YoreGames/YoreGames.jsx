import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function YoreGames(props) {

    //This page responsible for displaying the user's games
    const allGames = useSelector((store) => store.allgames);
    const user = useSelector((store) => store.user);
    // console.log('all games on YoreGames page', allGames);

    const [heading, setHeading] = useState('Yore Games');

    const dispatch = useDispatch();
    const history = useHistory();

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


    function getScores(gameId) {
        //dispatch to FETCH_YORE_SCORE
        console.log('the game score id', gameId);
        dispatch({
            type: 'FETCH_YORE_SCORE',
            payload: gameId
        })

        history.push(`/score`);
    }


    return (
        <div>
            <h2>{heading}</h2>
            <Table striped bordered hover size="sm" responsive="sm">
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
                            <td><Button size="sm" onClick={() => getScores(game.gameId)}>YoreScore!</Button></td>
                            <td><Button size="sm" onClick={() => deleteGame(game.gameId)}>Delete</Button></td>

                        </tr>)}

                </tbody>
            </Table>
        </div>
    );
}

export default YoreGames;
