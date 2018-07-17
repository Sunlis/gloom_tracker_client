import * as React from 'react';

import {CounterBar} from './counter-bar.jsx';

// import {socket} from '../socket.js';

const styles = {
  main: {}
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
    let counters = this.state.counters.map((counter) => {
      return <CounterBar current={counter.current} max={counter.max}></CounterBar>
    });
    return (
      <div style={styles.main}>
        {counters}
      </div>
    );
  }
}
