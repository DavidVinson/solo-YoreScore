import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';

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
        dispatch({type: 'FETCH_GAME_ROUND'});

        //send user to round page begin
        history.push('/roundPage');
    }


    return (
        <form className="formPanel" onSubmit={startGame}>
            <h2>New Game</h2>
            <div>
                <label htmlFor="course">
                    Course:
                        <input
                        type="text"
                        name="course"
                        required
                        value={course}
                        onChange={(event) => setCourse(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <label htmlFor="wager">
                    Wager:
                        <input
                        type="number"
                        name="wager"
                        required
                        value={wager}
                        onChange={(event) => setWager(event.target.value)}
                    />
                </label>
            </div>

            <div>
                <Form.Group>
                    <Form.Label>Playing the front or back nine?</Form.Label>
                    <Form.Check
                        type="radio"
                        label="front-nine"
                        name="radio-btn"
                        id="radio1"
                        value={isFrontNine}
                        onChange={() => setIsFrontNine(true)}
                     />

                    <Form.Check
                        type="radio"
                        label="back-nine"
                        name="radio-btn"
                        id="radio2"
                        value={isFrontNine}
                        onChange={() => setIsFrontNine(false)}
                    />
                </Form.Group>
            </div>

            <div>
                <label htmlFor="player1">
                    Player 1:
                        <input
                        type="text"
                        name="player1"
                        required
                        value={player1}
                        readOnly
                        // onChange={(event) => setPlayer1(event.target.value)}
                    />
                </label>
            </div>

            <div>
                <label htmlFor="player2">
                    Player 2:
                        <input
                        type="text"
                        name="player2"
                        value={player2}
                        onChange={(event) => setPlayer2(event.target.value)}
                    />
                </label>
            </div>

            <div>
                <label htmlFor="player3">
                    Player 3:
                        <input
                        type="text"
                        name="player3"
                        value={player3}
                        onChange={(event) => setPlayer3(event.target.value)}
                    />
                </label>
            </div>

            <div>
                <label htmlFor="player4">
                    Player 4:
                        <input
                        type="text"
                        name="player4"
                        value={player4}
                        onChange={(event) => setPlayer4(event.target.value)}
                    />
                </label>
            </div>

            <div>
                <input className="btn" type="submit" name="submit" value="Tee Off" />
            </div>
        </form>
    );
}

export default GamePage;
