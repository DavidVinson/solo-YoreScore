import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import moment from 'moment';

import './YoreScore.css';


function YoreScore(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    //game score from score reducer
    const gameScore = useSelector((store) => store.score);

    //gameScore: {player1: pts, player2: pts, player3: pts, player4: pts}
    console.log('the game score', gameScore);

    const [heading, setHeading] = useState('Points Page');
    const continueGame = () => history.push('/roundPage');
    const goHome = () => {
        dispatch({type: 'RESET_GAME'});
        history.push('/home');
    }


    if (gameScore.length === 0) {
        return (
            <center>
                <p>Loading...<button onClick={() => history.push('/game')}>Refresh games</button></p>
            </center>
        ); //have to refresh page

    } else {
        //players are last item in the gameScore array
        const players = Object.entries(gameScore[gameScore.length - 1]);
        console.log('players', players);

        //wager is the last item in the players array
        const wager = players.pop();
        // console.log('wager', wager);

        return (
            <>

                <Row id="row-image-score">
                    <Col>

                        <center>
                            <Image src="https://i.imgur.com/WUNkB5It.jpg" rounded />
                        </center>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3><Badge variant="dark">{gameScore[0].course} {moment(gameScore[0].start_time).format('l')}</Badge></h3>

                        {gameScore[0].game_status < 2 ? <Button onClick={continueGame}>Next Hole</Button> : <Button onClick={goHome}>Home</Button>}
                        <Table responsive="sm" striped bordered hover variant="dark" size="sm">
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
                                        <td>{player[0] !== null && player[0]}</td>
                                        <td>{player[1]}</td>
                                        <td>{wager[1]}</td>
                                        <td>${player[1] * wager[1]}</td>
                                    </tr>
                                )}
                            </tbody>

                        </Table>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3><Badge variant="dark">Points</Badge></h3>

                        <Table responsive="sm" striped bordered hover variant="dark" size="sm">
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
                    </Col>
                </Row>

            </>
        );
    }
}


export default YoreScore;

/*

<h3><Badge variant="dark">Points {moment(gameScore[0].start_time).format('l')}</Badge></h3>

*/