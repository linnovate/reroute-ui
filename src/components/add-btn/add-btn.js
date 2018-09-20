import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Add from 'material-ui/svg-icons/content/add';
import './style.css';

const AddBtn = (props) => 
    <div onClick={props.handleClick} className="addBtn">
    <Add style={{color: '2F80ED', width: '17px', height: '17px'}}/>
    <span>ADD</span>
    </div>

export default AddBtn;