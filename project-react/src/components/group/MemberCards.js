import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { getUserData } from '../../redux/actions/dataActions';
import axios from 'axios';

const styles = (theme) => ({
  ...theme.spreadThis,
  ...theme.profileSpread,
  profileImage: {
    width: 120,
    height: 120,
    objectFit: 'cover',
    borderRadius: '50%',
    margin: '10px 10px -15px 10px',
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

class MemberCards extends Component {
  state = {
    displayMember: null,
  };
  componentDidMount() {
    const handle = this.props.handle;
    // axios
    //   .get(`/user/${handle}`)
    //   .then((res) => {
    //     this.setState({
    //       displayMember: res.data.user,
    //     });
    //   })
    //   .catch((err) => console.log(err));
  }
  render() {
    const {
      classes,
      member: { bio, location, imageUrl, createdAt },
      loading,
    } = this.props;

    let memberCardMarkup = !loading ? (
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
            <Typography
              component={Link}
              to={`/users/${handle}`}
              color='primary'
              variant='h5'
              justifyContent='center'
            >
              {handle}
            </Typography>
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

    return memberCardMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

MemberCards.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(MemberCards));
