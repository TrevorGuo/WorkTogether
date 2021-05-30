import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import MyButton from '../../util/MyButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import GroupAdd from '@material-ui/icons/GroupAdd';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { uploadImage } from '../../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  ...theme.profileSpread,
});

class Group extends Component {
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
  handleJoinGroup = () => {

  }
  handleLeaveGroup = () => {

  }

  handleDeleteGroup = () => {

  }


  render() {
    const {
      classes,
      group: {
        credentials: { handle = "Group Name", createdAt, imageUrl, bio = "Our bio/goals", location = "UCLA"},
        loading,
        joined,
      },
    } = this.props;

    let groupProfileMarkup = !loading ? (
      (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className='image-wrapper'>
              <img src={imageUrl} alt='Group profile' className='profile-image' />
              <input
                type='file'
                id='imageInput'
                hidden='hidden'
                onChange={this.handleImageChange}
              />
              {/* Change to edit group profile */}
              {/* <MyButton
                tip='Edit profile picture'
                onClick={this.handleEditPicture}
                btnClassName='button'
              >
                <EditIcon color='primary' />
              </MyButton> */}
            </div>
            <hr />
            <div className='profile-details'>
              <MuiLink
                component={Link}
                to={`/groups/${handle}`}
                color='primary'
                variant='h5'
              >
                {handle}
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
              <span>Created {dayjs(createdAt).format('MMM YYYY')}</span>
            </div>
            <MyButton tip='Leave Group' onClick={this.handleLeaveGroup}>
              <GroupAdd color='primary' />
            </MyButton>
          </div>
        </Paper>
      )
    ) : (
      <CircularProgress size={30} className={classes.progress} />
    );

    return groupProfileMarkup;
  }
}

Group.propTypes = {
  // Add join and leave group
  uploadImage: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
});

const mapActionsToProps = { uploadImage };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Group));
