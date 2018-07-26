import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Add from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';

import hamburger from '../../img/hamburger.png';
import {NewCounterDialog} from './new-counter-dialog.jsx';
import {CounterBar} from './counter-bar.jsx';
import {DrawerContents} from './drawer-contents.jsx';
import { socket } from '../socket.js';

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
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '32px',
    padding: '4px 8px',
    height: '40px',
    backgroundColor: blue[500],
  },
  hamburger: {
    width: '36px',
    height: '36px',
    filter: 'grayscale(100%) contrast(250%)',
    opacity: '0.8',
  },
  drawer: {
  },
};

class MainImpl extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      drawerOpen: false,
    };
  }

  componentDidMount() {
    this.refreshCounters();
    socket.emit('get_name', {}, (result) => {
      this.setState({
        name: result || '',
      });
    });
    socket.on('set_counters', (counters) => {
      this.setState({
        counters
      });
    });
    socket.on('set_players', ({players, me}) => {
      for (let i in players) {
        let player = players[i];
        if (player.id == me) {
          this.setState({counters: player.counters});
        }
      }
    })
    socket.on('set_name', (name) => {
      this.setState({
        name
      });
    });
  }

  refreshCounters = () => {
    socket.emit('get_counters', {}, (result) => {
      this.setState({
        counters: result || [],
      });
    });
  }

  newCounterClick = () => {
    this.setState({
      dialogOpen: true,
    });
  }

  handleNewCounter = (counter) => {
    socket.emit('new_counter', {counter}, () => {
      this.refreshCounters();
    });
    this.handeNewCounterClose();
  }

  handeNewCounterClose = () => {
    this.setState({
      dialogOpen: false,
    });
  }

  handleHamburgerClick = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }

  handleDrawerClose = () => {
    this.setState({
      drawerOpen: false,
    });
  }

  render() {
    let counters = this.props.player.counters.map((counter, index) => {
      return <CounterBar key={index}
                         current={counter.current}
                         max={counter.max}
                         label={counter.label}
                         colour={counter.colour}
                         priv={counter.priv}
                         updateCounter={(counter) => { this.props.updateCounter(index, counter) }}>
             </CounterBar>
    });

    return (
      <div style={styles.main}>
        <AppBar position='static' style={styles.topBar}>
          <img src={hamburger}
               style={styles.hamburger}
               onClick={this.handleHamburgerClick} />
          <span>{this.props.player.name}</span>
        </AppBar>
        <div style={styles.counterWrapper}>
          {counters}
        </div>
        <Button variant='raised' onClick={this.newCounterClick}>
          <Add></Add>
          Add new counter
        </Button>
        <NewCounterDialog
          open={this.state.dialogOpen}
          createNewCounter={this.handleNewCounter}
          onClose={this.handeNewCounterClose}>
        </NewCounterDialog>
        <Drawer open={this.state.drawerOpen}
                onClose={this.handleDrawerClose}
                style={styles.drawer}>
          <DrawerContents name={this.props.player.name}
                          onClose={this.handleDrawerClose}>
          </DrawerContents>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.player,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCounter: (counter) => dispatch(addCounter(counter)),
    updateCounter: (index, counter) => dispatch(updateCounter(index, counter)),
    moveCounter: (before, after) => dispatch(moveCounter(before, after)),
  };
}

export const Main = connect(mapStateToProps, mapDispatchToProps)(MainImpl);