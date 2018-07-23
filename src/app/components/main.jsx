import * as React from 'react';
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

export class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      counters: this.props.counters || [],
      name: this.props.name || '',
      dialogOpen: false,
      drawerOpen: true,
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

  updateCounter = () => {
    this.refreshCounters();
  }

  render() {
    let counters = _.map(_.sortBy(this.state.counters, 'index'), (counter, index) => {
      return <CounterBar key={index}
                         index={index}
                         current={counter.current}
                         max={counter.max}
                         label={counter.label}
                         colour={counter.colour}
                         priv={counter.priv}
                         updateCounter={this.updateCounter}>
             </CounterBar>
    });

    return (
      <div style={styles.main}>
        <AppBar position='static' style={styles.topBar}>
          <img src={hamburger}
               style={styles.hamburger}
               onClick={this.handleHamburgerClick} />
          <span>{this.state.name}</span>
        </AppBar>
        <div style={styles.counterWrapper}>
          {counters}
        </div>
        <Button variant='raised' onClick={this.newCounterClick}>
          <Add></Add>
          Add new counter
        </Button>
        <NewCounterDialog open={this.state.dialogOpen} createNewCounter={this.handleNewCounter}>
        </NewCounterDialog>
        <Drawer open={this.state.drawerOpen}
                onClose={this.handleDrawerClose}
                style={styles.drawer}>
          <DrawerContents name={this.state.name}
                          onClose={this.handleDrawerClose}>
          </DrawerContents>
        </Drawer>
      </div>
    );
  }
}
