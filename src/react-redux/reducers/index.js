import { combineReducers } from 'redux';

const menuOpen = (state = false, action) => {
  if(action.type === 'TOGGLE_MENU') {
    return state = !state
  } else return state
}

let wsRoot = 'http://localhost:3001/' //react dev server runs at port 3000
const patients = (state = [{}], action) => {
  switch(action.type) {
    case 'GET_PATIENTS': 
      fetch(wsRoot+'paciente')
        .then(res => {
          res.json()
        })
        .then(patients => {
          return state = patients
        })
    break;
    //case 'POST_PATIENT': break;
    //case 'PUT_PATIENT': break;
    default: return state;
  }
}

const pksoftApp = combineReducers({
  menuOpen,
  patients
})

export default pksoftApp;
