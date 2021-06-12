import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function PointsPage(props) {

    useEffect(() => {
        dispatch({type: 'FETCH_POINTS'})
    }, [])

    const gamePoints = useSelector((store) => store.payout);
    console.log('the game points', gamePoints);

    //payout: {player1: pts, player2: pts, player3: pts, player4: pts}
    const payout = gamePoints.pop();
    // console.log(Object.entries(payout));
    console.log('payout', payout);
    // console.log('players payout', playersPayout);

    const [heading, setHeading] = useState('Points Page');
    const history = useHistory();
    const dispatch = useDispatch();

    if (!gamePoints) return (<p>Loading...</p>); //have to refresh page

    else {
        // let playerPoints = Object.entries(payout);
        // console.log('players', playerPoints);
        return (

            <>
            <h2>Payout</h2>
            <table>
                <thead>
                    <tr>
                        <th>Payout</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{JSON.stringify(payout)}</td>  
                    </tr>
                </tbody>
            </table>
            <hr/>
            <div>
                <p>{JSON.stringify(gamePoints)}</p>
            </div>
            </>
        );
    
    }

}

export default PointsPage;
