import * as React from 'react';
import Style from 'style-it';

import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import red from '@material-ui/core/colors/red'

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
    border: `3px solid ${red[900]}`,
    overflow: 'hidden',
    position: 'relative',
    flex: '1',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  label: {
    fontSize: '48px',
  },
  button: {
    backgroundColor: red[600],
  },
};

export class CounterBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      max: props.max || null,
      current: props.current || 0,
    };
  }

  // componentDidMount() {
  //   socket.on('other_thing', (arg) => {
  //     console.log('other_thing', arg);
  //   });
  //   socket.emit('thing');
  // }

  render() {
    let label;
    let barSize = '100%';
    if (this.state.max) {
      label = `${this.state.current} / ${this.state.max}`;
      barSize = Math.round(this.state.current/this.state.max*100) + '%';
    } else {
      label = `${this.state.current}`;
    }

    let outerStyle = Object.assign({}, this.props.style, styles.outer);

    return Style.it(`
      .bar::before {
        content: '';
        top: 0;
        left: 0;
        bottom: 0;
        width: ${barSize};
        position: absolute;
        background-color: ${red[600]};
        z-index: -1;
      }`,
      <div style={outerStyle}>
        <Button style={styles.button} variant='fab'>
          <Remove></Remove>
        </Button>
        <div className='bar' style={styles.bar}>
          <span style={styles.label}>{label}</span>
        </div>
        <Button style={styles.button} variant='fab'>
          <Add></Add>
        </Button>
      </div>
    );
  }
}
