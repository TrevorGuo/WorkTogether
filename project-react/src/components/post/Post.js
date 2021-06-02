import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Chat';
import FavoriteBorder from '@material-ui/icons/Chat';

import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

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

class Post extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.postId === this.props.post.postId
      )
    )
      return true;
    else return false;
  };

  likePost = () => {
    this.props.likePost(this.props.post.postId);
  };

  unlikePost = () => {
    this.props.unlikePost(this.props.post.postId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        body,
        createdAt,
        userImage,
        userHandle,
        postId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;
    const likeButton = !authenticated ? (
      <MyButton tip='like'>
        <Link to='/login'>
          <FavoriteBorder color='primary' />
        </Link>
      </MyButton>
    ) : this.likedPost() ? (
      <MyButton tip='Undo like' onClick={this.unlikePost}>
        <FavoriteIcon color='primary' />
      </MyButton>
    ) : (
      <MyButton tip='Undo like' onClick={this.likePost}>
        <FavoriteBorder color='primary' />
      </MyButton>
    );
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <img src={userImage} alt='Profile' className={classes.profileImage} />
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            component={Link}
            to={`/users/${userHandle}`}
            color='primary'
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
          <LikeButton postId={postId} />
          <span>{likeCount} Likes</span>
          <MyButton tip=''>
            <ChatIcon color='primary' />
          </MyButton>
          <span>{commentCount} Comments</span>
          <PostDialog
            postId={postId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likePost,
  unlikePost,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Post));
