import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class CopyWeights extends React.Component {
  constructor() {
    super();
    this.state = {
      paxValue: '',
    }
  }

  handlePaxChange = (event, index, value) => {
    this.setState({ paxValue: value })
  }

  render() {
    let pax = [...this.props.pax];
    //pax.unshift('--all paxes--')

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleClose}
        />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.props.handleSubmit(this.state.paxValue)}
        />,
    ];

    return (
      <Dialog
        title="Copy The weights"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.handleClose}
        >
        <div>
          <div>
            <SelectField
              floatingLabelText="choose the pax you want to copy to"
              value={this.state.paxValue}
              onChange={this.handlePaxChange}
              >
              {pax.map((item, index) =>
                <MenuItem key={index} value={item} primaryText={item} />
              )}
            </SelectField>
          </div>
          <div>WARNING: THE COPY WILL DELETE LAST SAVED WEIGHT IN THIS PAX</div>
        </div>
      </Dialog>
    );
  }
}