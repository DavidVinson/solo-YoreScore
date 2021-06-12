const allgamesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_GAMES':
        return action.payload;
      default:
        return state;
    }
  };
  
  // game will be on the redux state at:
  // state.allgames ?? i set state = [] instead of {}
  export default allgamesReducer;
  