import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import Check from '@material-ui/icons/Check';
import {
  red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal,
  green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey
} from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = {
  dialog: {
  },
  dialogAction: {
    padding: '16px',
  },
  radioButtonContainer: {
    margin: '16px 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    position: 'relative',
    boxSizing: 'border-box',
  },
  radioButton: {
    width: '22%',
    height: '40px',
    borderRadius: '8px',
    margin: '4px',
  },
  textField: {
    margin: '8px 0',
  },
  maxInputRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  maxInputButton: {
    height: '48px',
    width: '48px',
    alignSelf: 'baseline',
  },
};

const COLOURS = [
  red, pink, purple, deepPurple, indigo,
  blue, lightBlue, teal, green,
  lightGreen, lime, yellow, orange,
  deepOrange, brown, grey
];

const COLOUR_NAMES = [
  'red', 'pink', 'purple', 'deepPurple', 'indigo',
  'blue', 'lightBlue', 'teal', 'green',
  'lightGreen', 'lime', 'yellow', 'orange',
  'deepOrange', 'brown', 'grey'
];

const ResponsiveDialog = withMobileDialog()(Dialog);

export class NewCounterDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: 15,
      max: '',
      name: '',
      priv: true,
    };
  }

  handleCancelClick = () => {
    this.handeClose();
  }

  handeClose = () => {
    this.setState({
      selected: 15,
      max: '',
      name: '',
      priv: true,
    });
    this.props.onClose();
  }

  dialogAddClick = () => {
    let max = this.state.max;
    let counter = {
      current: max > 0 ? max : 0,
      max: max,
      label: this.state.name,
      priv: this.state.priv,
      colour: COLOUR_NAMES[this.state.selected],
    };
    if (this.props.createNewCounter) {
      this.props.createNewCounter(counter);
    }
    this.handeClose();
  }

  colourButtonClick = (ev) => {
    this.setState({
      selected: parseInt(ev.target.getAttribute('index'), 10),
    });
  }

  handleNameChange = (ev) => {
    this.setState({
      name: ev.target.value,
    });
  }

  handleMaxChange = (ev) => {
    this.setState({
      max: ev.target.value,
    });
  }

  onMaxInputDec = () => {
    let max = this.state.max || 0;
    this.setState({
      max: Math.max(0, max - 1),
    });
  }

  onMaxInputInc = () => {
    this.setState({
      max: (this.state.max || 0) + 1,
    });
  }

  handlePrivateChange = (ev, checked) => {
    this.setState({
      priv: checked,
    });
  }

  render() {
    let radioButtons = COLOURS.map((color, index) => {
      let buttonStyle = {
        ...styles.radioButton,
        backgroundColor: color[500],
      };
      return <Button style={buttonStyle}
                     key={index}
                     index={index}
                     onClick={this.colourButtonClick}>
        {this.state.selected == index ? <Check></Check> : ''}
      </Button>
    });

    return (
      <ResponsiveDialog open={this.props.open}
                        style={styles.dialog}>
        <DialogTitle>New Counter</DialogTitle>
        <DialogContent>
          <TextField id="name"
                     style={styles.textField}
                     label="Label (optional)"
                     type="text"
                     fullWidth
                     value={this.state.name}
                     onChange={this.handleNameChange} />
          <div style={styles.maxInputRow}>
            <TextField id="max"
                       style={styles.textField}
                       label="Max (optional)"
                       type="number"
                       value={this.state.max}
                       onChange={this.handleMaxChange} />
            <Button variant="contained"
                    style={styles.maxInputButton}
                    onClick={this.onMaxInputDec}>
              <Remove></Remove>
            </Button>
            <Button variant="contained"
                    style={styles.maxInputButton}
                    onClick={this.onMaxInputInc}>
              <Add></Add>
            </Button>
          </div>
          <div style={styles.radioButtonContainer}>
            {radioButtons}
          </div>
          <div>
            <FormControlLabel
              control={
                <Switch checked={this.state.priv}
                        onChange={this.handlePrivateChange}>
                </Switch>
              }
              label="Private">
            </FormControlLabel>
          </div>
        </DialogContent>
        <DialogActions style={styles.dialogAction}>
          <Button variant="contained"
                  onClick={this.handleCancelClick}>
            Cancel
          </Button>
          <Button variant="contained"
                  color="primary"
                  onClick={this.dialogAddClick}>
            Add
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}
