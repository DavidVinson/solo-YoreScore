import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function RulesPage() {
    return (
        <div className="container">
            <div>
                <h2>The Big Picture</h2>
                    <p>Bingo Bango Bongo is a game in which three points are up for grabs on every hole. Each point corresponds to the completion of a different activity. The first golfer to complete each activity earns a point, and at the end of the round, points are added up and cash is divided based on point totals (groups will generally play $1 per point).</p>
                <h2>Scoring</h2>
                    <p>Bingo: The “bingo” point is given to the first golfer in the group who lands their ball on the green.</p>
                    <p>Bango: Once all balls are on the green, the golfer with the ball closest to the pin earns the “bango” point.</p>
                    <p>Bongo: The “bongo” point is awarded to the player whose ball lands in the cup first.</p>

                <h2>Why Etiquette Matters</h2>
                    <p>Etiquette is everything in Bingo Bango Bongo, largely because two-thirds of the points awarded in a given game are dependent upon being the first golfer to achieve them. If a player goes out of turn to win the “bingo” or “bongo” point, the point on the hole is awarded to the second person to achieve either.

                    Etiquette becomes increasingly important on par-3s, when golfers can theoretically earn both the “bingo” and “bongo” points before the remaining players in the group have teed off.</p>
            </div>
        </div>
    );
}

export default RulesPage;
