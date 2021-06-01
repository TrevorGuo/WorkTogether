import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  ...theme.profileSpread,
});

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, location, gHandle },
        loading,
        authenticated,
      },
    } = this.props;
    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className='image-wrapper'>
              <img src={imageUrl} alt='profile' className='profile-image' />
              <input
                type='file'
                id='imageInput'
                hidden='hidden'
                onChange={this.handleImageChange}
              />
              <MyButton
                tip='Edit profile picture'
                onClick={this.handleEditPicture}
                btnClassName='button'
              >
                <EditIcon color='primary' />
              </MyButton>
            </div>
            <hr />
            <div className='profile-details'>
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color='primary'
                variant='h5'
              >
                @{handle}
              </MuiLink>
              <br />
              <MuiLink
                component={Link}
                to={`/groups/${gHandle}`}
                color='primary'
                variant='body2'
              >
                {' ' + gHandle}
              </MuiLink>
              <hr />
              {bio && <Typography variant='body2'>{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color='primary' /> <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color='primary' />{' '}
              <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
            </div>
            <Link to='/login'>
              <MyButton tip='Logout' onClick={this.handleLogout}>
                <KeyboardReturn color='primary' />
              </MyButton>
            </Link>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant='body2' align='center'>
            No profile found, please login or signup
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant='contained'
              color='primary'
              component={Link}
              to='/login'
            >
              Login
            </Button>
            <Button
              variant='contained'
              color='secondary'
              component={Link}
              to='/signup'
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <CircularProgress size={30} className={classes.progress} />
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
