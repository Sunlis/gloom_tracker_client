import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tune from '@material-ui/icons/Tune';
import People from '@material-ui/icons/People';
import TextFields from '@material-ui/icons/TextFields';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { blue } from '@material-ui/core/colors';

import hamburger from '../../img/hamburger.png';
import { CharacterEditDialog } from './character-edit-dialog.jsx';
import { CounterEditDialog } from './counter-edit-dialog.jsx';
import { GlobalCounterList } from './global-counter-list.jsx';

// import {socket} from '../socket.js';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    // minWidth: '50vw',
  },
  hamburger: {
    width: '36px',
    height: '36px',
    filter: 'grayscale(0%) contrast(150%)',
    opacity: '1.0',
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
};

export class DrawerContents extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      characterEditOpen: false,
      counterEditOpen: false,
    };
  }

  handleHamburgerClick = () => {
    this.props.onClose();
  }

  openCharacterDialog = () => {
    this.setState({
      characterEditOpen: true,
    });
  }

  closeCharacterDialog = () => {
    this.setState({
      characterEditOpen: false,
    });
  }

  openCounterDialog = () => {
    this.setState({
      counterEditOpen: true,
    });
  }

  closeCounterDialog = () => {
    this.setState({
      counterEditOpen: false,
    });
  }

  render() {
    return (
      <div style={styles.main}>
        <AppBar position='static' style={styles.topBar}>
          <img src={hamburger}
               style={styles.hamburger}
               onClick={this.handleHamburgerClick} />
        </AppBar>
        <List>
          <ListItem button onClick={this.openCharacterDialog}>
            <ListItemIcon><TextFields></TextFields></ListItemIcon>
            <ListItemText>Edit Character Name</ListItemText>
          </ListItem>
          <ListItem button onClick={this.openCounterDialog}>
            <ListItemIcon><Tune></Tune></ListItemIcon>
            <ListItemText>Edit Counters</ListItemText>
          </ListItem>
          <GlobalCounterList></GlobalCounterList>
        </List>
        {/* Character Name */}
        <CharacterEditDialog open={this.state.characterEditOpen}
                             name={this.props.name}
                             onClose={this.closeCharacterDialog}>
        </CharacterEditDialog>
        <CounterEditDialog open={this.state.counterEditOpen}
                           onClose={this.closeCounterDialog}>
        </CounterEditDialog>
        {/* Edit Counters */}
        {/* View All */}
      </div>
    );
  }
}
