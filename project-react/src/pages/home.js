import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';
import Post from "../components/post/Post";
import Profile from '../components/profile/Profile';

class home extends Component {
  //4:48:00
  //UNCOMMENT WHEN POSTS ARE SETUP
  componentDidMount() {
    this.props.getPosts()
  }
  render() {
    //UNCOMMENT WHEN POSTS ARE SETUP


    const { posts, loading } = this.props.data;

    let recentPostsMarkup = !loading ? (
        posts.map((post) => <Post key={post.postId} post={post}/> )
      ) : (
        <p>Loading...</p>
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile/>
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getPosts })(home);
