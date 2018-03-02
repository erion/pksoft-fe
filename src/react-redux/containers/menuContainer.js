import { connect } from 'react-redux'
import { toggleMenu } from '../actions'
import AppMenu from '../../components/appMenu'

const mapStateToProps = state => {
  return {
    menuOpen: state.menuOpen
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMenuClick: () => {
      dispatch(toggleMenu(!ownProps.open))
    }
  }
}

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMenu)

export default MenuContainer