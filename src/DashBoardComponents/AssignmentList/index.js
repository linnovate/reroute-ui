import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import './AssignmentList.scss';

class AssignmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    const {data} = this.props;
    return (
      <div className="assignment-list">
        <div className="title">GUEST</div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="health" padding="checkbox">HEALTH</TableCell>
              <TableCell className="name">FULL NAME</TableCell>
              <TableCell className="id">RESERVATION ID</TableCell>
              <TableCell>PROGRESS</TableCell>
              <TableCell>CHECK IN</TableCell>
              <TableCell>CHECK OUT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => {
              return (
                <TableRow key={row.masterID}>
                  <TableCell className="health" padding="checkbox"><div>20</div><div className="white"></div></TableCell>
                  <TableCell className="name"><div>{`${row.guest.firstName} ${row.guest.lastName}`}</div ><div className="white"></div></TableCell>
                  <TableCell className="id"><div className="white">{row.masterID}</div><div></div></TableCell>
                  <TableCell>
                    <div className="status"> 
                      <div className="circle"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                    </div>
                    <div className="white"></div>
                    </TableCell>
                  <TableCell><div>{row.bookingFrom}</div><div className="white"></div></TableCell>
                  <TableCell><div>{row.bookingTo}</div><div className="white"></div></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default AssignmentList;
