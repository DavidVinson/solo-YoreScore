
const payoutReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PLAYER_POINTS': 
        return action.payload;
      default:
        return state;
    }
  };

  export default payoutReducer;
  