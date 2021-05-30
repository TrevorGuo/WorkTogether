import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { uploadPost, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  ...theme.profileSpread,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%',
  },
});

class UploadPost extends Component {
  state = {
    open: false,
    body: '',
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false, errors: {} });
    this.props.clearErrors();
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.uploadPost({ body: this.state.body });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <Paper className={classes.paper}>
          <Typography variant='body2' align='center'>
            Join a group to the left, or create your own!
          </Typography>
          <div className={classes.buttons}>
            <br />
            <Button
              variant='contained'
              color='primary'
              onClick={this.handleOpen}
            >
              Create Group
            </Button>
          </div>
        </Paper>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton
            tip='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Make a new post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                type='text'
                label='POST!!'
                multiline
                rows='3'
                placeholder='Share a post with your friends'
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

UploadPost.propTypes = {
  uploadPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { uploadPost, clearErrors })(
  withStyles(styles)(UploadPost)
);
