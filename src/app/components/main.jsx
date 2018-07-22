import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Add from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';

import hamburger from '../../img/hamburger.png';
import {NewCounterDialog} from './new-counter-dialog.jsx';
import {CounterBar} from './counter-bar.jsx';
import {DrawerContents} from './drawer-contents.jsx';

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
      counters: [
        {
          current: 5,
          max: 10,
          label: 'Health',
          colour: 'red',
        },
        {
          current: 5,
          max: 0,
          label: 'XP',
          colour: 'blue',
        },
        {
          current: 0,
          max: 0,
          colour: 'grey',
        },
        {
          current: 8,
          max: 25,
          label: 'Personal Quest',
          colour: 'brown',
        },
      ],
      dialogOpen: false,
      drawerOpen: false,
      name: this.props.name || 'Slurm S. McKenzie',
    };
  }

  newCounterClick = () => {
    this.setState({
      dialogOpen: true,
    });
  }

  handleNewCounter = (counter) => {
    let counters = this.state.counters;
    counters.push(counter);
    this.setState({
      counters: counters,
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
    let counters = this.state.counters.map((counter, index) => {
      return <CounterBar key={index}
                         current={counter.current}
                         max={counter.max}
                         label={counter.label}
                         colour={counter.colour}>
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
