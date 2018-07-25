import * as React from 'react';
import Style from 'style-it';

import Button from '@material-ui/core/Button';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import Delete from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as colour from '../colour.js';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    minHeight: '32px',
    padding: '4px 0 12px 0',
    margin: '4px 0 12px 0',
    position: 'relative',
  },
  buttons: {
    margin: '0 4px 0 0',
    flex: 'none',
  },
  button: {
    width: '24px',
    height: '24px',
    minWidth: 0,
    margin: '4px',
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '6px',
    backgroundColor: colour.get('grey', 300),
  },
  lock: {
    opacity: 0.5,
    width: '20px',
    height: '20px',
    marginTop: '2px',
  },
  deleteIcon: {
    width: '20px',
    height: '20px',
    marginTop: '2px',
  },
  piece: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '0 4px',
    backgroundColor: colour.get('grey', 200),
    borderRadius: '99px',
    padding: '8px',
    minWidth: '60px',
    textAlign: 'center',
  },
  input: {
    width: '35vw',
  },
  smallInput: {
    width: '10vw',
    marginLeft: '4px',
  },
  lockButton: {
    minWidth: 0,
    width: '36px',
    borderRadius: '99px',
  },
  swatch: {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    borderRadius: '24px',
    marginRight: '8px',
  },
};

export class CounterEditRow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      deleteConfirmOpen: false,
    };
  }

  onLabelChange = (ev) => {
    this.props.updateCounter(this.props.counter.index, {
      ...this.props.counter,
      label: ev.target.value,
    });
  }

  onMaxChange = (ev) => {
    this.props.updateCounter(this.props.counter.index, {
      ...this.props.counter,
      max: ev.target.value,
    });
  }

  handleLockClick = () => {
    this.props.updateCounter(this.props.counter.index, {
      ...this.props.counter,
      priv: !this.props.counter.priv,
    });
  }

  handleDeleteClick = () => {
    this.setState({
      deleteConfirmOpen: true,
    });
  }

  handleDeleteConfirmClose = () => {
    this.setState({
      deleteConfirmOpen: false,
    });
  }
  handleDeleteConfirmNo = () => {
    this.handleDeleteConfirmClose();
  }
  handleDeleteConfirmYes = () => {
    this.handleDeleteConfirmClose();
    this.props.deleteCounter(this.props.counter.index);
  }

  handleColourChange = (ev) => {
    this.props.updateCounter(this.props.counter.index, {
      ...this.props.counter,
      colour: ev.target.value,
    })
  }

  handleUpClick = () => {
    this.props.moveCounterUp(this.props.counter.index);
  }

  handleDownClick = () => {
    this.props.moveCounterDown(this.props.counter.index);
  }

  render() {
    let label = this.props.counter.label || '(No label)';
    let count = this.props.counter.current;
    let progress = 100;
    if (this.props.counter.max && this.props.counter.max != 0) {
      count += ' / ' + this.props.counter.max;
      progress = (this.props.counter.current / this.props.counter.max) * 100;
    }
    const dropdownOptions = colour.mapNames((name, i) => {
      return (<option name={name}
                      style={{ backgroundColor: colour.get(name, 500) }}
                      key={i}>{name}</option>);
    });

    return Style.it(`
      .bar::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        top: 0;
        background-color: ${colour.get(this.props.counter.colour, 500)};
        width: ${progress}%;
      }
      `,
      <div style={styles.main}>
        <div className="bar" style={styles.progress}></div>
        <div style={styles.buttons}>
          <Button style={styles.button}
                  variant="contained"
                  onClick={this.handleUpClick}>
            <KeyboardArrowUp></KeyboardArrowUp>
          </Button>
          <Button style={styles.button}
                  variant="contained"
                  onClick={this.handleDownClick}>
            <KeyboardArrowDown></KeyboardArrowDown>
          </Button>
        </div>
        <span style={styles.piece}>
          <input style={styles.input}
                 type="text"
                 placeholder="Label"
                 onChange={this.onLabelChange}
                 value={this.props.counter.label} />
        </span>
        <span style={styles.piece}>
          {this.props.counter.current} / 
          <input style={styles.smallInput}
                 type="number"
                 placeholder="Max"
                 onChange={this.onMaxChange}
                 value={this.props.counter.max || ''} />
        </span>
        <Button variant="contained"
                style={styles.lockButton}
                onClick={this.handleLockClick}>
          {this.props.counter.priv
            ? <Lock style={styles.lock}></Lock>
            : <LockOpen style={styles.lock}></LockOpen>}
        </Button>
        <span style={styles.piece}>
          <div style={{
            ...styles.swatch,
            backgroundColor: colour.get(this.props.counter.colour, 500),
          }}></div>
          <select onChange={this.handleColourChange} value={this.props.counter.colour}>
            {dropdownOptions}
          </select>
        </span>
        <Button variant="contained"
                style={styles.lockButton}
                onClick={this.handleDeleteClick}>
          <Delete></Delete>
        </Button>
        <Dialog open={this.state.deleteConfirmOpen}
                onClose={this.handleDeleteConfirmClose}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>No backsies</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteConfirmNo}>NO</Button>
            <Button color="primary" onClick={this.handleDeleteConfirmYes}>YES</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
