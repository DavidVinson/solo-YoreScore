import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import moment from 'moment';

import './YoreGames.css';


function YoreGames(props) {

    //This page responsible for displaying the user's games
    const allGames = useSelector((store) => store.allgames);
    const user = useSelector((store) => store.user);
    // console.log('all games on YoreGames page', allGames);

    const [heading, setHeading] = useState('Game Summary');

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
        <>
            <Row id="row-image-games">
                <Col>
                    <center>
                        <Image src="https://i.imgur.com/RQDkfWOt.jpg" />
                    </center>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3><Badge variant="dark">{heading}</Badge></h3>
                    <Table responsive="sm" striped bordered hover variant="dark" size="sm">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {allGames && allGames.map((game) =>
                                <tr key={game.gameId}>
                                    <td onClick={() => getScores(game.gameId)}>{game.course} {moment(game.end_time).format('l')}</td>
                                    <td><img onClick={() => deleteGame(game.gameId)} className="trashcan" src="./whitetrashcan-npbg.png" alt="trashcan" width="32" height="32" /></td>
                                </tr>)}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    );
}

export default YoreGames;
