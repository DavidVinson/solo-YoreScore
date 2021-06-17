import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
// import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import swal from 'sweetalert';


function BangoPage(props) {

    const game = useSelector((store) => store.game);
    const [heading, setHeading] = useState('Bango');
    // setHeading(`${point} Point Assign page`);

    // console.log(game);
    // console.log(game[0].player1);
    // console.log(game[0].player2);
    // console.log(game[0].player3);
    // console.log(game[0].player4);

    const history = useHistory();
    const dispatch = useDispatch();

    function alertClicked(player) {
        swal("Bango!", `No gimmies, ${player}!`, "success", {
            button: "Putter, please!",
          });

        console.log(`${player} awarded Bango!`);

        dispatch({
            type: 'SET_POINT',
            payload: {
                bango: player
            }
        })

        history.push('/roundPage');

    }


    return (
        <center>
            <h2><Badge variant="dark">{heading}</Badge></h2>
            <ListGroup>
                <ListGroup.Item action onClick={() => alertClicked(game[0].player1)}>
                    Player1: {game[0].player1}
                </ListGroup.Item>
                <br/>
                <ListGroup.Item action onClick={() => alertClicked(game[0].player2)}>
                    Player2: {game[0].player2}
                </ListGroup.Item>
                <br/>
                <ListGroup.Item action onClick={() => alertClicked(game[0].player3)}>
                    Player3: {game[0].player3}
                </ListGroup.Item>
                <br/>
                <ListGroup.Item action onClick={() => alertClicked(game[0].player4)}>
                    Player4: {game[0].player4}
                </ListGroup.Item>
            </ListGroup>
        </center>
    );
}

export default BangoPage;
