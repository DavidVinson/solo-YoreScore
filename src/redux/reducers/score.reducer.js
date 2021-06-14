//replaced point page and point reducer
const scoreReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_YORE_SCORE': 
        return action.payload;
      case 'CLEAR_SCORE':
          return [];
      default:
        return state;
    }
  };
  
  // point will be on the redux state at:
  // state.score: set state = [] 
  export default scoreReducer;
  