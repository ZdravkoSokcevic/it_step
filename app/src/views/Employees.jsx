import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getAllWorkers, getOneWorker, getAllManagers } from '../actions/userActions'
import { Table, TableRow, TableData, ButtonFull } from '../components/Styled';

class Employees extends Component {
  componentWillMount() {
    this.props.getAllWorkers();
    this.props.getAllManagers();
  }
  render() {
    return (
      <React.Fragment>
        <Table>
          {this.props.allWorkers.map(function (worker) {
            return <TableRow>
              <TableData>{worker.first_name}</TableData>
            </TableRow>
          })}
        </Table>
        <ButtonFull onClick={()=>this.props.getOneWorker(4)}>Click to get one worker</ButtonFull>
        {JSON.stringify(this.props.oneWorker)}
      </React.Fragment>
    )
  }
}

Employees.propTypes = {
  allWorkers: PropTypes.array,
  oneWorker: PropTypes.object,
  allManagers: PropTypes.array,
  getAllWorkers: PropTypes.func,
  getOneWorker: PropTypes.func,
  getAllManagers: PropTypes.func
}

const mapStateToProps = (state) => ({
  allWorkers: state.user.allWorkers,
  oneWorker: state.user.oneWorker,
  allManagers: state.user.allManagers
})

const mapDispatchToProps = (dispatch, payload) => ({
  getAllWorkers: getAllWorkers(dispatch),
  getOneWorker: getOneWorker(dispatch, payload),
  getAllManagers: getAllManagers(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Employees)