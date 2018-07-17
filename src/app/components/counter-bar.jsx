import * as React from 'react';

// import {socket} from '../socket.js';

const styles = {
  outer: {
    borderRadius: '4px',
    margin: '4px',
    width: 'calc(100% - 8px)',
    minHeight: '32px',
    backgroundColor: 'rgba(255, 50, 50, 0.8)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    overflow: 'hidden',
    position: 'relative',
  },
  button: {
    border: '1px solid rgba(255, 255, 255, 0.5)',
    backgroundColor: 'transparent',
    height: '100%',
    width: '20%',
    padding: '0',
    margin: '0',
    display: 'block',
  },
  leftButton: {},
  rightButton: {},
};
Object.assign(styles.leftButton, styles.button, {
  backgroundColor: 'blue',
});
Object.assign(styles.rightButton, styles.button, {
  backgroundColor: 'green',
});

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
    if (this.state.max) {
      label = `${this.state.current} / ${this.state.max}`;
    } else {
      label = `${this.state.current}`;
    }

    return (
      <div style={styles.outer}>
        <div style={styles.leftButton}>-</div>
        <span style={styles.label}>{label}</span>
        <div style={styles.rightButton}>+</div>
      </div>
    );
  }
}
