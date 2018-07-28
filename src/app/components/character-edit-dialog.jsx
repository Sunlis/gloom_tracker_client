import * as React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { setName } from '../actions/player';


const styles = {};

class CharacterEditDialogImpl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name || 'Name',
    };
  }

  componentWillReceiveProps(props) {
    if (props.name != this.state.name) {
      this.setState({
        name: props.name || 'Name',
      });
    }
  }

  handleClose = () => {
    this.props.onClose();
  }

  handleNameChange = (ev) => {
    this.setState({
      name: ev.target.value,
    });
  }

  handleSave = () => {
    this.props.setName(this.state.name);
    this.handleClose();
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>Edit Character Name</DialogTitle>
        <DialogContent>
          <TextField label="Character Name"
                     type="text"
                     onChange={this.handleNameChange}
                     value={this.state.name} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>
            Cancel
          </Button>
          <Button color="primary"
                  onClick={this.handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export const CharacterEditDialog = connect(
  (state) => {
    return {
      name: state.player.name,
    };
  }, (dispatch) => {
    return {
      setName: (name) => dispatch(setName(name)),
    };
  })(CharacterEditDialogImpl);