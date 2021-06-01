import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Chat';
import FavoriteBorder from '@material-ui/icons/Chat';

import { connect } from 'react-redux';

const styles = {
  profileImage: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    maxWidth: '50%',
    borderRadius: '50%',
    margin: '15px 0px auto 10px',
  },
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
    marginLeft: 30,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

class Group extends Component {
  render() {
    const {
      classes,
      group: { body, createdAt, groupImage, groupHandle },
    } = this.props;
    return (
      <Card className={classes.card}>
        <img
          src={groupImage}
          alt='Group Image'
          className={classes.profileImage}
        />

        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            component={Link}
            to={`/groups/${groupHandle}`}
            color='primary'
          >
            {groupHandle}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            Created {dayjs(createdAt).format('MMM D, YYYY')}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
        </CardContent>
      </Card>
    );
  }
}

Group.propTypes = {};

const mapStateToProps = (state) => ({});

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Group));
