import * as React from 'react';
import { connect } from 'react-redux';
import { DeepDiff } from 'deep-diff';

import { updateCounters, updatePlayer, setName } from '../actions/player';
import { updatePlayers } from '../actions/other-players';
import { socket } from '../socket.js';

class SocketImpl extends React.Component {
  constructor(props) {
    super(props);
    this.listeners = {
      'set_counters': this.props.updateCounters,
      'set_players': (args) => this.handleSetPlayers(args),
      'set_name': this.props.setName,
    }
  }

  handleSetPlayers = ({players}) => {
    let me = window.location.pathname.replace('/','');
    let other = [];
    players.forEach((player) => {
      if (player.id == me) {
        this.props.setPlayer(player);
      } else {
        other.push(player);
      }
    });
    this.props.updatePlayers(other);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.isDataFromServer) {
      return "fuck you";
    }
    if (DeepDiff(this.props.player.counters, prevProps.player.counters) && !!prevProps.player.counters) {
      socket.emit('update_counters', {counters: this.props.player.counters});
    } else if (this.props.player.name != prevProps.player.name) {
      socket.emit('update_name', {name: this.props.player.name});
    }
  }

  componentDidMount() {
    socket.on('reconnect', () => {
      socket.emit('ready');
    });
    Object.entries(this.listeners).forEach(([event, method]) => {
      socket.on(event, method);
    });
    socket.emit('ready');
  }

  componentWillUnmount() {
    Object.entries(this.listeners).forEach(([event, method]) => {
      socket.off(event, method);
    }); 
  }

  render() { return null; }
}

export const Socket = connect(
  (state) => state,
  (dispatch) => {
    return {
      updateCounters: (counters) => dispatch(updateCounters(counters, true)),
      updatePlayers: (players) => dispatch(updatePlayers(players, true)),
      setPlayer: (player) => dispatch(updatePlayer(player, true)),
      setName: (name) => dispatch(setName(name, true)),
    }
  })(SocketImpl);