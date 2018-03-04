import { connect } from 'react-redux'
import { toggleMenu } from '../actions'
import PatientsList from '../../components/patient/list'

const mapStateToProps = state => {
  return {
    patients: state.patients
  }
}

/*
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMenuClick: () => {
      dispatch(toggleMenu(!ownProps.open))
    }
  }
}
*/

const patientContainer = connect(
  mapStateToProps
)(PatientsList)

export default patientContainer