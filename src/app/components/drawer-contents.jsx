import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Tune from '@material-ui/icons/Tune';
import People from '@material-ui/icons/People';
import TextFields from '@material-ui/icons/TextFields';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { blue } from '@material-ui/core/colors';

import hamburger from '../../img/hamburger.png';

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
      characterName: props.name || 'Name',
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

  handleNameChange = (ev) => {
    this.setState({
      characterName: ev.target.value,
    });
  }

  handleCharacterNameSave = () => {
    //TODO: socket shit
    this.closeCharacterDialog();
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
          <ListItem button onClick={this.openPublicDialog}>
            <ListItemIcon><People></People></ListItemIcon>
            <ListItemText>View Party Counters</ListItemText>
          </ListItem>
        </List>
        {/* Character Name */}
        <Dialog open={this.state.characterEditOpen} onClose={this.closeCharacterDialog}>
          <DialogTitle>Edit Character Name</DialogTitle>
          <DialogContent>
            <TextField label="Character Name"
                       type="text"
                       onChange={this.handleNameChange}
                       value={this.state.characterName} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeCharacterDialog}>
              Cancel
            </Button>
            <Button color="primary"
                    onClick={this.handleCharacterNameSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* Edit Counters */}

        {/* View All */}
      </div>
    );
  }
}
