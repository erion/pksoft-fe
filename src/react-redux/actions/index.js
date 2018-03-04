export const toggleMenu = open => {
  return {
    type: 'TOGGLE_MENU',
    open
  }
}

// API

export const patients = patients => {
  type: 'GET_PATIENTS',
  patients
}

export const patientsAPI = {
  GET_PATIENTS: 'GET_PATIENTS',
  POST_PATIENT: 'POST_PATIENT',
  PUT_PATIENT: 'PUT_PATIENT',
}