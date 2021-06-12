
const defaultState = {bingo: '', bango: '', bongo: ''};
const pointReducer = (state = defaultState, action) => {
    switch (action.type) {
        //create an array of point obj: 
        //[{bingo: player, bango: player, bongo: player}]
      case 'SET_POINT': 
        return {
          ...state,
          ...action.payload // { bingo: 'dave' }
        };
      case 'CLEAR_POINT':
          return defaultState;
      default:
        return state;
    }
  };
  
  // point will be on the redux state at:
  // state.point: set state = [] 
  export default pointReducer;
  