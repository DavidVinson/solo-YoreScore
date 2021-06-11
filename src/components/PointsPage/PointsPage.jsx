import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function PointsPage(props) {

    const [heading, setHeading] = useState('Points Page');
    const history = useHistory();

    return (
        <div>
            <h2>{heading}</h2>
            <button onClick={() => history.push('/roundPage')}>Current Round</button>
        </div>
    );
}

export default PointsPage;
