import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Add from 'material-ui/svg-icons/content/add';

const AddBtn = (props) => 
    <RaisedButton
      label="Add"
      icon={<Add />}
      onClick={props.handleClick}
    />

export default AddBtn;