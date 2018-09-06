import React from 'react';
import {List, ListItem} from 'material-ui/List';
import AddBtn from '../add-btn/add-btn';

class Actions extends React.Component {
    render() {
        return (
            <div className="actions">
                <AddBtn />
            </div>
        )
    }
}

export default Actions