import React, { Component, Fragment } from 'react';

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';
import Post from '../components/post/Post';
import MemberCards from '../components/group/MemberCards';
import Group from '../components/group/Group';

import CircularProgress from '@material-ui/core/CircularProgress';

function FormRow() {
  return (
    <Fragment>
      <Grid item sm={4}>
        <MemberCards />
      </Grid>
      <Grid item sm={4}>
        <MemberCards />
      </Grid>
      <Grid item sm={4}>
        <MemberCards />
      </Grid>
    </Fragment>
  );
}

class groups extends Component {
  componentDidMount() {
    this.props.getPosts();
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
      <Grid container spacing={5}>
        <Grid container item sm={8} spacing={1}>
          <FormRow />
          <FormRow />
          <FormRow />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Group />
        </Grid>
      </Grid>
    );
  }
}



groups.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPosts })(groups);
