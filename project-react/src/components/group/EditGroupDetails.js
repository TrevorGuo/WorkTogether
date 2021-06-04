import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import { connect } from 'react-redux';
import { editGroupsDetails } from '../../redux/actions/groupActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/EditOutlined';

const styles = {
  form: {
    textAlign: 'center',
  },
  image: {
    margin: '20px auto 20px auto',
  },
  pageTitle: {
    margin: '10px auto 10px auto',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    position: 'relative',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  progress: {
    position: 'absolute',
  },
  button: {
    float: 'right',
  },
};

class EditGroupDetails extends Component {
  state = {
    groupHandle: '',
    body: '',
    location: '',
    open: false,
  };
  mapGroupDetailsToState = (group) => {
    this.setState({
      location: group.location ? group.location : '',
      body: group.body ? group.body : '',
      groupHandle: group.groupHandle ? group.groupHandle : '',
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapGroupDetailsToState(this.props.group);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { group } = this.props;
    this.mapGroupDetailsToState(group);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = () => {
    console.log(this.state);
    const groupDetails = {
      groupHandle: this.state.groupHandle,
      body: this.state.body,
      location: this.state.location,
    };
    this.props.editGroupsDetails(groupDetails);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip='Edit Details'
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color='primary' />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name='body'
                type='text'
                label='body'
                multiline
                placeholder='A short bio about your group'
                className={classes.textField}
                value={this.state.body}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='location'
                type='text'
                label='Location'
                placeholder='Where is your group based in'
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color='primary'>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditGroupDetails.propTypes = {
  editGroupsDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group.group,
});

export default connect(mapStateToProps, { editGroupsDetails })(
  withStyles(styles)(EditGroupDetails)
);
