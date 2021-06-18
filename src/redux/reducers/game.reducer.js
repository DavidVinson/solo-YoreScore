const gameReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_GAME_ROUND':
        return action.payload;
      case 'RESET_GAME':
        return [];
      default:
        return state;
    }
  };
  
  // game will be on the redux state at:
  // state.game
  export default gameReducer;
  