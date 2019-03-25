import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getAllWorkers } from '../actions/userActions'
import { Table, TableRow, TableData } from '../components/Styled';

class Employees extends Component {
  componentWillMount() {
    this.props.getAllWorkers();
  }
  render() {
    return (
      <Table>
        {this.props.allWorkers.map(function (worker) {
          return <TableRow>
            <TableData>{worker.first_name}</TableData>
          </TableRow>
        })}
      </Table>
    )
  }
}

Employees.propTypes = {
  allWorkers: PropTypes.array,
  getAllWorkers: PropTypes.func
}

const mapStateToProps = (state) => ({
  allWorkers: state.user.allWorkers
})

const mapDispatchToProps = (dispatch, payload) => ({
  getAllWorkers: getAllWorkers(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Employees)