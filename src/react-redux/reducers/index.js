import { combineReducers } from 'redux';

const menuOpen = (state = false, action) => {
  if(action.type === 'TOGGLE_MENU') {
    return state = !state
  } else return state
}

const pksoftApp = combineReducers({
  menuOpen
})

export default pksoftApp;
