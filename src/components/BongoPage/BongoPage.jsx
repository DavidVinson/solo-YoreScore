import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import { useHistory } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import swal from 'sweetalert';


function BongoPage(props) {

    const game = useSelector((store) => store.game);
    const [heading, setHeading] = useState('Bongo');

    const history = useHistory();
    const dispatch = useDispatch();

    function alertClicked(player) {
        swal("Bongo!", `${player} sent it home!`, "success", {
            button: "Onward!",
          });

        console.log(`${player} awarded Bongo!`);

        dispatch({
            type: 'SET_POINT',
            payload: {
                bongo: player
            }
        })

        history.push('/roundPage');

        console.log('Bongo player', player);


    }


    return (
        <center>
            <h2><Badge variant="dark">{heading}</Badge></h2>
            <ListGroup>
                <ListGroup.Item variant="light" action onClick={() => alertClicked(game[0].player1)}>
                    Player1: {game[0].player1}
                </ListGroup.Item>
                <ListGroup.Item variant="light" action onClick={() => alertClicked(game[0].player2)}>
                    Player2: {game[0].player2}
                </ListGroup.Item>
                <ListGroup.Item variant="light" action onClick={() => alertClicked(game[0].player3)}>
                    Player3: {game[0].player3}
                </ListGroup.Item>
                <ListGroup.Item variant="light" action onClick={() => alertClicked(game[0].player4)}>
                    Player4: {game[0].player4}
                </ListGroup.Item>
            </ListGroup>
        </center>
    );
}

export default BongoPage;
