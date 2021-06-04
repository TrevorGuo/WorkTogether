import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import MyButton from '../../util/MyButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { addUser, removeUser } from '../../redux/actions/userActions';
import { uploadGroupImage } from '../../redux/actions/groupActions';
import EditGroupDetails from './EditGroupDetails';
import DeleteGroup from './DeleteGroup';
import Box from '@material-ui/core/Box';

// MUI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import GroupAdd from '@material-ui/icons/GroupAdd';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';

const styles = (theme) => ({
  ...theme.spreadThis,
  ...theme.profileSpread,
});

class GroupProfile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadGroupImage(formData, this.props.group.group.groupHandle);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };
  handleJoinGroup = () => {
    if (
      this.props.user.credentials.gHandle === '' &&
      this.props.userCount < 10
    ) {
      this.props.addUser({ groupHandle: this.props.group.group.groupHandle });
    }
  };
  handleLeaveGroup = () => {
    this.props.removeUser({ groupHandle: this.props.group.group.groupHandle });
    if (this.props.userCount === 0) {
      this.props.deleteGroup(this.props.group.group.groupHandle);
    }
  };

  render() {
    const {
      classes,
      group: {
        group: {
          groupHandle,
          admin,
          createdAt,
          groupImage,
          body,
          location,
          userCount,
        },
        loading,
      },
      user: {
        credentials: { handle, gHandle },
      },
    } = this.props;

    const editGroupPicture =
      handle === admin ? (
        <MyButton
          tip='Edit group picture'
          onClick={this.handleEditPicture}
          btnClassName='button'
        >
          <EditIcon color='primary' />
        </MyButton>
      ) : null;

    const editGroupInfo = handle === admin ? <EditGroupDetails /> : null;

    const joinLeaveButton =
      gHandle === groupHandle ? (
        <MyButton tip='Leave Group' onClick={this.handleLeaveGroup}>
          <DirectionsWalkIcon color='primary' />
        </MyButton>
      ) : (
        <MyButton tip='Join Group' onClick={this.handleJoinGroup}>
          <GroupAdd color='primary' />
        </MyButton>
      );

    const deleteButton =
      handle === admin ? <DeleteGroup groupHandle={groupHandle} /> : null;

    let groupProfileMarkup = !loading ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className='image-wrapper'>
            <img
              src={groupImage}
              alt='Group profile'
              className='profile-image'
            />
            {editGroupPicture}
            <input
              type='file'
              id='imageInput'
              hidden='hidden'
              onChange={this.handleImageChange}
            />
          </div>
          <hr />
          <div className='profile-details'>
            <Typography
              component={Link}
              to={`/groups/${groupHandle}`}
              color='primary'
              variant='h5'
            >
              {groupHandle}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              {userCount}/10 Members
            </Typography>
            <hr />
            {body && <Typography variant='body2'>{body}</Typography>}
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
          <Box display='flex' alignItems='center' justifyContent='center'>
            {deleteButton}
            {editGroupInfo}
            {joinLeaveButton}
          </Box>
        </div>
      </Paper>
    ) : (
      <CircularProgress size={30} className={classes.progress} />
    );

    return groupProfileMarkup;
  }
}

GroupProfile.propTypes = {
  // Add join and leave group
  uploadGroupImage: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
  user: state.user,
});

const mapActionsToProps = { uploadGroupImage, addUser, removeUser };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(GroupProfile));
