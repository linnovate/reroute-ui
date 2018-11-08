import React from 'react';
import axios from 'axios';
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
      data: []
    };
    this.id = 0;
    this.loadGuests();
  }

  createData(name, calories, fat, carbs, protein) {
    this.id += 1;
    let r = this.id;
    return { r, name, calories, fat, carbs, protein };
  }

  loadGuests = () => {
    const query = `{
      shob(uid:"1b630e90-d122-11e8-ac31-3f9e7cf66502") {
        data {
          hotelID
          masterID
          roomType
          roomNumber
          adultCount
          childCount
          infantCount
          bookingFrom
          bookingTo
          state
          guest{
            firstName
            lastName
          }
        } 
       }
    }`;
    axios({
     method: 'post' ,
     url: 'http://localhost:3007/graphql?query='+ query,
   }).then(res => {
     console.log('aaaaaaaaaaaaaaaaa',res.data.data.shob)
     this.setState({'data': res.data.data.shob.data});
   })
     .catch(function (error) {
         console.log(error);
     });
   }

  render() {
    const {data} = this.state;
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
                <TableRow key={row.id}>
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
