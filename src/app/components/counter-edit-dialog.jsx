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

import { CounterEditRow } from './counter-edit-row.jsx';
import {socket} from '../socket.js';

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

export class CounterEditDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      counters: [],
    };
  }

  componentDidMount() {
    socket.emit('get_counters', {}, (counters) => {
      this.setState({
        counters
      });
    });
    socket.on('set_counters', this.setCounters);
  }

  componentWillUnmount() {
    socket.off('set_counters', this.setCounters);
  }

  setCounters = (counters) => {
    this.setState({ counters });
  }

  handleDoneClick = () => {
    this.props.onClose();
  }

  handleUpdateCounter = (index, counter) => {
    socket.emit('update_counter', {counter: counter}, () => {});
  }

  handleDeleteCounter = (index) => {
    let counters = this.state.counters;
    counters.splice(index, 1);
    socket.emit('update_counters', {counters: counters}, () => {});
  }

  moveCounter = (before, after) => {
    let counters = this.state.counters;
    after = Math.max(0, after);
    let counter = counters.splice(before, 1)[0];
    counters.splice(after, 0, counter);
    counters = counters.map((counter, i) => {
      return {
        ...counter,
        index: i,
      };
    });
    socket.emit('update_counters', {counters: counters}, () => {});
  }

  moveCounterUp = (index) => {
    this.moveCounter(index, index - 1);
  }
  moveCounterDown = (index) => {
    this.moveCounter(index, index + 1);
  }

  render() {
    let counters = this.state.counters.map((counter) => {
      return (
        <CounterEditRow counter={counter}
                        key={counter.index}
                        updateCounter={this.handleUpdateCounter}
                        deleteCounter={this.handleDeleteCounter}
                        moveCounterUp={this.moveCounterUp}
                        moveCounterDown={this.moveCounterDown}>
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
