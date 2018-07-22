import * as React from 'react';
import Style from 'style-it';

import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import {
  red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal,
  green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey
} from '@material-ui/core/colors';

// import {socket} from '../socket.js';

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
    fontWeight: 400,
    textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
  },
  label: {
    fontSize: '24px',
  },
  count: {
    fontSize: '48px',
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

export class CounterBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      max: props.max || null,
      current: props.current || 0,
    };
  }

  handleRemoveClick = () => {
    this.setState({
      current: Math.max(0, this.state.current - 1),
    });
  }

  handleAddClick = () => {
    if (!this.props.max) {
      this.setState({
        current: this.state.current + 1,
      });
    } else {
      this.setState({
        current: Math.min(this.props.max, this.state.current + 1),
      });
    }
  }

  render() {
    let count;
    let barSize = '100%';
    if (this.props.max) {
      count = `${this.state.current} / ${this.props.max}`;
      barSize = Math.round(this.state.current / this.props.max*100) + '%';
    } else {
      count = `${this.state.current}`;
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

    return Style.it(`
      .bar::before {
        content: '';
        top: 0;
        left: 0;
        bottom: 0;
        width: ${barSize};
        transition: 0.15s width;
        position: absolute;
        background-color: ${colour(500)};
        z-index: -1;
      }`,
      <div style={outerStyle}>
        <div className='bar' style={styles.bar}>
          <div style={leftButtonStyle} onClick={this.handleRemoveClick}>
            <Remove></Remove>
          </div>
          <div style={styles.labelContainer}>
            <span style={styles.label}>{this.props.label}</span>
            <span style={styles.count}>{count}</span>
          </div>
          <div style={rightButtonStyle} onClick={this.handleAddClick}>
            <Add></Add>
          </div>
        </div>
      </div>
    );
  }
}
