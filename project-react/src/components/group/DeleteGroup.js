import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteGroup } from '../../redux/actions/groupActions';

const styles = {
  deleteButton: {
    position: 'relative',
    // top: '12%',
    //marginTop: '10%',
  },
};

class DeleteGroup extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteGroup = () => {
    this.props.deleteGroup(this.props.groupHandle);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip='Delete Group'
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color='secondary' />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Are you sure you want to delete this group?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              {' '}
              Cancel
            </Button>
            <Button
              onClick={this.deleteGroup}
              color='secondary'
              component={Link}
              to={`/groups/`}
            >
              {' '}
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteGroup.propTypes = {
  deleteGroup: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  groupHandle: PropTypes.string.isRequired,
};

export default connect(null, { deleteGroup })(withStyles(styles)(DeleteGroup));
