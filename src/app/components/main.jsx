import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

import {CounterBar} from './counter-bar.jsx';

// import {socket} from '../socket.js';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',
  },
  counterWrapper: {
    margin: '8px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '32px',
    padding: '4px 8px',
  },
};

export class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      counters: [
        {
          current: 10,
          max: 20,
        },
        {
          current: 5,
          max: null,
        }
      ],
    };
  }

  render() {
    let counters = this.state.counters.map((counter, index) => {
      return <CounterBar key={index}
                         current={counter.current}
                         max={counter.max}>
             </CounterBar>
    });
    return (
      <div style={styles.main}>
        <AppBar position='static' style={styles.topBar}>
          <span>Character Name</span><span>Level</span>
        </AppBar>
        <div style={styles.counterWrapper}>
          {counters}
        </div>
        <Button variant='raised'>
          <Add></Add>
          Add new counter
        </Button>
      </div>
    );
  }
}
