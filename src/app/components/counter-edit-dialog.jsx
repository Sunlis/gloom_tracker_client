import * as React from 'react';
import { connect } from 'react-redux';

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

import { CounterEditRow } from './counter-edit-row.jsx';

import { moveCounter, updateCounter, updateCounters, deleteCounter } from '../actions/player';

const styles = {
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

class CounterEditDialogImpl extends React.Component {

  constructor(props) {
    super(props);
  }

  handleDoneClick = () => {
    this.props.onClose();
  }

  moveCounter = (before, after) => {
    after = Math.max(0, after);
    if (after != before) {
      this.props.moveCounter(before, after);
    }
  }

  moveCounterUp = (index) => {
    this.moveCounter(index, index - 1);
  }
  moveCounterDown = (index) => {
    this.moveCounter(index, index + 1);
  }

  render() {
    let counters = this.props.counters.map((counter, index) => {
      return (
        <CounterEditRow counter={counter}
                        key={index}
                        updateCounter={this.props.updateCounter}
                        deleteCounter={this.props.deleteCounter}
                        moveCounterUp={() => { this.moveCounterUp(index) }}
                        moveCounterDown={() => { this.moveCounterDown(index) }}>
        </CounterEditRow>
      );
    });
    return (
      <ResponsiveDialog open={this.props.open}
                        style={styles.dialog}>
        <DialogTitle>Edit Counters</DialogTitle>
        <DialogContent>
          {counters}
        </DialogContent>
        <DialogActions>
          <Button variant="contained"
                  color="primary"
                  onClick={this.handleDoneClick}>
            Done
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export const CounterEditDialog = connect(
  (state) => {
    return {
      counters: state.player.counters,
    };
  }, (dispatch) => {
    return {
      moveCounter: (before, after) => dispatch(moveCounter(before, after)),
      updateCounter: (index, counter) => dispatch(updateCounter(index, counter)),
      updateCounters: (counters) => dispatch(updateCounters(counters)),
      deleteCounter: (index) => dispatch(deleteCounter(index)),
    };
  })(CounterEditDialogImpl);