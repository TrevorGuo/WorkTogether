import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";

import Post from "../components/post/Post";
import Profile from '../components/profile/Profile';

class home extends Component {
  //4:48:00
  //UNCOMMENT WHEN POSTS ARE SETUP
  state = {
    posts: null,
  };
  componentDidMount() {
    axios
      .get("/posts")
      .then((res) => {
        console.log(res.data);
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    //UNCOMMENT WHEN POSTS ARE SETUP

    let recentPostsMarkup = (
      /*this.state.posts ? (
            this.state.posts.map((post) => (
                <Post key={post.postId} post={body}/>
        ))
        ) : */ <p>Loading...</p>
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
      </Grid>
    );
  }
}

export default home;
