import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


function GamePage() {
    const player1 = useSelector(store => store.user.username);
    const history = useHistory();

    // console.log('player 1 should be', player1);
    const [course, setCourse] = useState('');
    const [wager, setWager] = useState(0);
    const [isFrontNine, setIsFrontNine] = useState(true);
    const [player2, setPlayer2] = useState('player2');
    const [player3, setPlayer3] = useState('player3');
    const [player4, setPlayer4] = useState('player4');

    const dispatch = useDispatch();

    const startGame = (event) => {
        event.preventDefault();
        console.log('form submitted');

        //clear the score reducer
        dispatch({ type: 'CLEAR_SCORE' });

        dispatch({
            //game saga 
            type: 'START_GAME',
            payload: {
                course: course,
                wager: wager,
                isFrontNine: isFrontNine,
                player1: player1,
                player2: player2,
                player3: player3,
                player4: player4
            },
        });

        //reset fields
        setCourse('');
        setWager(0);
        setIsFrontNine(true);
        setPlayer2('player2');
        setPlayer3('player3');
        setPlayer4('player4');

        //Go and get the new game
        //the game saga activate
        dispatch({ type: 'FETCH_GAME_ROUND' });

        //send user to round page begin
        history.push('/roundPage');
    }


    return (
        <Container>
            <div className="formPanel">
                <Form onSubmit={startGame}>
                    <h2>New Game</h2>
                    <Form.Row>
                        <Col xs={8}>
                            <Form.Group controlId="course">
                                <Form.Label>
                                    Golf Course:
                                 <Form.Control placeholder="Golf Course"
                                        type="text"
                                        name="course"
                                        required
                                        value={course}
                                        onChange={(event) => setCourse(event.target.value)}
                                    />
                                </Form.Label>
                            </Form.Group>
                        </Col>
                        <Col xs={4}>
                            <Form.Group controlId="wager">
                                <Form.Label>
                                    Wager:
                                <Form.Control
                                        type="number"
                                        name="wager"
                                        required
                                        value={wager}
                                        onChange={(event) => setWager(event.target.value)}
                                    />
                                </Form.Label>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Playing the front or back nine?</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Front-nine"
                                    name="radio-btn"
                                    id="radio1"
                                    value={isFrontNine}
                                    onChange={() => setIsFrontNine(true)}
                                />

                                <Form.Check
                                    type="radio"
                                    label="Back-nine"
                                    name="radio-btn"
                                    id="radio2"
                                    value={isFrontNine}
                                    onChange={() => setIsFrontNine(false)}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="player1">
                                <Form.Label>
                                    Player 1: Logged in
                                <Form.Control
                                        type="text"
                                        name="player1"
                                        required
                                        value={player1}
                                        readOnly
                                    />
                                </Form.Label>
                            </Form.Group>

                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="player2">
                                <Form.Label>
                                    Player 2:
                                <Form.Control
                                        type="text"
                                        name="player2"
                                        value={player2}
                                        onChange={(event) => setPlayer2(event.target.value)}
                                    />
                                </Form.Label>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="player3">
                                <Form.Label>
                                    Player 3:
                                <Form.Control
                                        type="text"
                                        name="player3"
                                        value={player3}
                                        onChange={(event) => setPlayer3(event.target.value)}
                                    />
                                </Form.Label>
                            </Form.Group>

                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="player4">
                                <Form.Label>
                                    Player 4:
                                <Form.Control
                                        type="text"
                                        name="player4"
                                        value={player4}
                                        onChange={(event) => setPlayer4(event.target.value)}
                                    />
                                </Form.Label>
                            </Form.Group>

                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Button type="submit" name="submit" value="Tee Off">Tee Off</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        </Container>
    );
}

export default GamePage;
