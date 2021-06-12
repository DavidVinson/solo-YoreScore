import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
// import { useParams } from 'react-router-dom';
import {useHistory} from 'react-router-dom';

function BongoPage(props) {

    const game = useSelector((store) => store.game);
    const [heading, setHeading] = useState('Bongo Page');
    // setHeading(`${point} Point Assign page`);

    // console.log(game);
    // console.log(game[0].player1);
    // console.log(game[0].player2);
    // console.log(game[0].player3);
    // console.log(game[0].player4);

    const history = useHistory();
    const dispatch = useDispatch();

    function alertClicked(player) {
        alert(`You clicked ${player}`);

        console.log(`${player} awarded Bongo!`);

        dispatch({
            type: 'SET_POINT',
            payload: {
                bongo: player
            }
        })

        history.push('/roundPage');

    }


    return (
        <div>
            <h2>{heading}</h2>
            <ListGroup>
                <ListGroup.Item action onClick={() => alertClicked(game[0].player1)}>
                    Player1: {game[0].player1}
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => alertClicked(game[0].player2)}>
                    Player2: {game[0].player2}
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => alertClicked(game[0].player3)}>
                    Player3: {game[0].player3}
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => alertClicked(game[0].player4)}>
                    Player4: {game[0].player4}
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default BongoPage;
