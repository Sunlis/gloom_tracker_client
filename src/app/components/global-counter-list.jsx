import * as React from 'react';
import { connect } from 'react-redux';

import Divider from '@material-ui/core/Divider';

import * as colour from '../colour.js';

const styles = {
  characterName: {
    display: 'inline-block',
    margin: '4px 8px 4px 0',
  },
  playerName: {
    display: 'inline-block',
    margin: '4px 0',
  },
  counter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '4px',
    padding: '4px 8px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '4px',
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: colour.get('grey', 300),
    zIndex: -1,
  },
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
  },
  player: {
    margin: '4px 4px 12px 4px',
  },
};

class GlobalCounterListImpl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let players = this.props.players.map((player) => {
      let counters = player.counters.filter((counter) => {
        return !counter.priv;
      }).map((counter) => {
        return (
          <div key={counter.index} style={styles.counter}>
            <span style={{opacity: (counter.label ? 1.0 : 0.5)}}>
              {counter.label || '(no label)'}
            </span>
            <span style={{}}>
              {counter.current}{counter.max ? ` / ${counter.max}` : ''}
            </span>
            <div style={styles.progress}>
              <div style={{
                ...styles.bar,
                width: (counter.max ? (counter.current/counter.max*100)+'%' : '100%'),
                backgroundColor: colour.get(counter.colour, 500),
              }}></div>
            </div>
          </div>
        );
      });
      return (
        <div key={player.name}>
          <Divider />
          <div style={styles.player}>
            <h3 style={styles.characterName}>{player.name}</h3>
            <h5 style={styles.playerName}>({player.player})</h5>
            <div>{counters}</div>
          </div>
        </div>
      );
    });
    return (
      <div>
        {players}
      </div>
    );
  }
}

export const GlobalCounterList = connect(
  (state) => {
    return {
      players: state.otherPlayers,
    };
  }, (dispatch) => {
    return {};
  })(GlobalCounterListImpl);