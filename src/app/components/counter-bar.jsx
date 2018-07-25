import * as React from 'react';
import Style from 'style-it';

import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import Lock from '@material-ui/icons/Lock';
import {
  red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal,
  green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey
} from '@material-ui/core/colors';

import { socket } from '../socket.js';

const styles = {
  outer: {
    margin: '8px 0',
    minHeight: '32px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: '1',
  },
  bar: {
    margin: '0 4px',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    flex: '1',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: grey[400],
    zIndex: 0,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 'none',
    margin: '0 16px',
    width: '50%',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 400,
    textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
  },
  label: {
    fontSize: '24px',
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  count: {
    fontSize: '48px',
  },
  lock: {
    opacity: 0.5,
    margin: '0 2px 4px 0',
    width: '20px',
    height: '20px',
  },
  button: {
    height: 'calc(100% - 16px)',
    margin: '8px',
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    boxShadow: '0 0 16px 0 rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
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

const LONG_PRESS_DELAY = 500;

const LONG_PRESS_INTERVAL = 150;

export class CounterBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      max: (props.max && props.max > 0) ? props.max : null,
      current: props.current || 0,
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.current != prevState.current) {
  //     this.updateCounter();
  //   }
  // }

  updateCounter = (props) => {
    this.props.updateCounter({
      ...this.props,
      ...props,
    });
    // socket.emit('update_counter', {counter: properties}, () => {});
  }

  handleRemoveMouseDown = (ev) => {
    ev.preventDefault();
    this.cancelRemoveAsync();
    this.removePressed = (new Date());
    this.removeTimeout = setTimeout(() => {
      this.removeInterval = setInterval(() => {
        this.setCurrent(this.props.current - 1);
      }, LONG_PRESS_INTERVAL);
    }, LONG_PRESS_DELAY);
  }
  handleRemoveMouseUp = (ev) => {
    ev.preventDefault();
    this.cancelRemoveAsync();
    if ((new Date()) - this.removePressed < LONG_PRESS_DELAY) {
      this.setCurrent(this.props.current - 1);
    }
    this.removePressed = new Date(0);
  }
  cancelRemoveAsync = () => {
    if (this.removeTimeout) {
      clearTimeout(this.removeTimeout);
      this.removeTimeout = null;
    }
    if (this.removeInterval) {
      clearInterval(this.removeInterval);
      this.removeInterval = null;
    }
  }

  handleAddMouseDown = (ev) => {
    ev.preventDefault();
    this.cancelAddAsync();
    this.addPressed = (new Date());
    this.addTimeout = setTimeout(() => {
      this.addInterval = setInterval(() => {
        this.setCurrent(this.props.current + 1);
      }, LONG_PRESS_INTERVAL);
    }, LONG_PRESS_DELAY);
  }
  handleAddMouseUp = (ev) => {
    ev.preventDefault();
    this.cancelAddAsync();
    if ((new Date()) - this.addPressed < LONG_PRESS_DELAY) {
      this.setCurrent(this.props.current + 1);
    }
    this.addPressed = new Date(0);
  }
  cancelAddAsync = () => {
    if (this.addTimeout) {
      clearTimeout(this.addTimeout);
      this.addTimeout = null;
    }
    if (this.addInterval) {
      clearInterval(this.addInterval);
      this.addInterval = null;
    }
  }

  setCurrent = (value) => {
    if (this.props.max) {
      this.props.updateCounter({
        ...this.props,
        current: Math.max(0, Math.min(this.props.max, value)),
      });
    } else {
      this.props.updateCounter({
        ...this.props,
        current: Math.max(0, value),
      });
    }
  }

  render() {
    let count;
    let barSize = '100%';
    if (this.props.max > 0) {
      count = `${this.props.current} / ${this.props.max}`;
      barSize = Math.round(this.props.current / this.props.max*100) + '%';
    } else {
      count = `${this.props.current}`;
    }

    let outerStyle = Object.assign({}, this.props.style, styles.outer);

    const colour = (key) => {
      let colourIndex = COLOUR_NAMES.indexOf(this.props.colour);
      colourIndex = colourIndex == -1 ? 0 : colourIndex;
      return COLOURS[colourIndex][key];
    };

    let buttonStyle = {
      ...styles.button,
      backgroundColor: grey[300]+'44',
      // backgroundColor: colour(900)+'aa',
    };

    let leftButtonStyle = {
      ...buttonStyle,
      borderRadius: '8px 0 0 8px',
    };
    let rightButtonStyle = {
      ...buttonStyle,
      borderRadius: '0 8px 8px 0',
    };

    let lock = this.props.priv ? <Lock style={styles.lock}></Lock> : '';

    return Style.it(`
      .bar::before {
        content: '';
        top: 0;
        left: 0;
        bottom: 0;
        width: ${barSize};
        transition: 0.2s width;
        position: absolute;
        background-color: ${colour(500)};
        z-index: -1;
      }`,
      <div style={outerStyle}>
        <div className='bar' style={styles.bar}>
          <div style={leftButtonStyle}
               onMouseDown={this.handleRemoveMouseDown}
               onTouchStart={this.handleRemoveMouseDown}
               onMouseUp={this.handleRemoveMouseUp}
               onTouchEnd={this.handleRemoveMouseUp}>
            <Remove></Remove>
          </div>
          <div style={styles.labelContainer}>
            <span style={styles.label}>{lock} {this.props.label}</span>
            <span style={styles.count}>{count}</span>
          </div>
          <div style={rightButtonStyle}
               onMouseDown={this.handleAddMouseDown}
               onTouchStart={this.handleAddMouseDown}
               onMouseUp={this.handleAddMouseUp}
               onTouchEnd={this.handleAddMouseUp}>
            <Add></Add>
          </div>
        </div>
      </div>
    );
  }
}
