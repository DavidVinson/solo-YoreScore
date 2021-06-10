const gameReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CURRENT_GAME':
        return action.payload;
      case 'DELETE_GAME':
        return {};
      default:
        return state;
    }
  };
  
  // game will be on the redux state at:
  // state.game ?? i set state = [] instead of {}
  export default gameReducer;
  