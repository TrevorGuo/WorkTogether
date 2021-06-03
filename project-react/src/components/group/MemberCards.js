import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

const styles = (theme) => ({
  ...theme.spreadThis,
  ...theme.profileSpread,
  profileImage: {
    width: 120,
    height: 120,
    objectFit: 'cover',
    borderRadius: '50%',
    margin: '15px 0px auto 10px',
  },
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
    marginLeft: 30,
    width: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
    textAlign: 'center',
  },
});

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, location },
        loading,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      <Paper className={classes.card}>
        <div className={classes.profile}>
          <div className='image-wrapper'>
            <img
              src={imageUrl}
              alt='profile'
              className={classes.profileImage}
            />
          </div>
          <hr />
          <div className={classes.content}>
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color='primary'
              variant='h5'
              justifyContent='center'
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
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
        </div>
      </Paper>
    ) : (
      <CircularProgress size={30} className={classes.progress} />
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Profile));
