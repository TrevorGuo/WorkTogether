import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';
import { getUserData } from '../redux/actions/userActions';
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';

import CircularProgress from '@material-ui/core/CircularProgress';

class home extends Component {
  componentDidMount() {
    this.props.getPosts(this.props.user.credentials.gHandle);
  }
  render() {
    const { posts, loading } = this.props.data;
    const classes = this.props;

    let recentPostsMarkup = loading ? (
      <CircularProgress size={30} className={classes.progress} />
    ) : (
      posts.map((post) => <Post key={post.postId} post={post} />)
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, { getPosts, getUserData })(home);
