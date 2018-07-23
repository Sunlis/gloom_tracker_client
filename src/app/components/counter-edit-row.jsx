import * as React from 'react';
import Style from 'style-it';

import Button from '@material-ui/core/Button';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import TextField from '@material-ui/core/TextField';

import {socket} from '../socket.js';
import {getColour} from '../colour.js';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '32px',
    padding: '4px 0 12px 0',
    margin: '4px 0 12px 0',
    position: 'relative',
  },
  buttons: {
    margin: '0 4px 0 0',
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
    height: '3px',
    backgroundColor: getColour('grey', 300),
  },
  lock: {
    opacity: 0.5,
    width: '20px',
    height: '20px',
    marginTop: '2px',
  },
  piece: {
    margin: '0 4px',
    backgroundColor: getColour('grey', 200),
    borderRadius: '99px',
    padding: '8px',
    minWidth: '60px',
    textAlign: 'center',
  },
  input: {
    width: '25vw',
  },
  smallInput: {
    width: '32px',
    marginLeft: '4px',
  },
  lockButton: {
    minWidth: 0,
    width: '36px',
    borderRadius: '99px',
  },
};

export class CounterEditRow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  onLabelChange = (ev) => {
    this.props.updateLabel(this.props.counter.index, ev.target.value);
  }

  onMaxChange = (ev) => {
    this.props.updateMax(this.props.counter.index, ev.target.value);
  }

  render() {
    let label = this.props.counter.label || '(No label)';
    let count = this.props.counter.current;
    let progress = 100;
    if (this.props.counter.max && this.props.counter.max != 0) {
      count += ' / ' + this.props.counter.max;
      progress = (this.props.counter.current / this.props.counter.max) * 100;
    }
    return Style.it(`
      .bar::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background-color: ${getColour(this.props.counter.colour, 500)};
        width: ${progress}%;
      }
      `,
      <div style={styles.main}>
        <div className="bar" style={styles.progress}></div>
        <div style={styles.buttons}>
          <Button style={styles.button} variant="contained">
            <KeyboardArrowUp></KeyboardArrowUp>
          </Button>
          <Button style={styles.button} variant="contained">
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
                style={styles.lockButton}>
          {this.props.counter.priv
            ? <Lock style={styles.lock}></Lock>
            : <LockOpen style={styles.lock}></LockOpen>}
        </Button>
      </div>
    );
  }
}
