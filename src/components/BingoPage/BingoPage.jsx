import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import swal from 'sweetalert';


function BingoPage(props) {

    const game = useSelector((store) => store.game);
    const [heading, setHeading] = useState('Bingo');

    const history = useHistory();
    const dispatch = useDispatch();

    function alertClicked(player) {
        swal("Bingo!", `Nice shot ${player}!`, "success", {
            button: "Aww yiss!",
          });

        console.log(`${player} awarded Bingo!`);

        dispatch({
            type: 'SET_POINT',
            payload: {
                bingo: player
            }
        })

        history.push('/roundPage');

    }

    if (game.length === 0) {
        return (
            <center>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </center>
        );
    }


    return (
        <center>
            <h2><Badge variant="dark">{heading}</Badge></h2>
            <ListGroup>
                <ListGroup.Item variant="light" action hover onClick={() => alertClicked(game[0].player1)}>
                    Player1: {game[0].player1}
                </ListGroup.Item>
                <br/>
                <ListGroup.Item variant="light" action hover onClick={() => alertClicked(game[0].player2)}>
                    Player2: {game[0].player2}
                </ListGroup.Item>
                <br/>
                <ListGroup.Item  variant="light" action hover onClick={() => alertClicked(game[0].player3)}>
                    Player3: {game[0].player3}
                </ListGroup.Item>
                <br/>
                <ListGroup.Item variant="light" action hover onClick={() => alertClicked(game[0].player4)}>
                    Player4: {game[0].player4}
                </ListGroup.Item>
            </ListGroup>
        </center>
    );
}

export default BingoPage;
