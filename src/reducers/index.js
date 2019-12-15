import { combineReducers } from 'redux';

const currentSpinnerModeReducer = (currentSpinnerMode = null, action) => {
  if (action.type === 'TOGGLE_LOADING_SPINNER') {
    return action.payload;
  }
  return currentSpinnerMode;
};

export default combineReducers({
  currentSpinnerMode: currentSpinnerModeReducer
});
