import React, { Component, Fragment } from 'react';

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroup } from '../redux/actions/groupActions';
import MemberCards from '../components/group/MemberCards';
import CircularProgress from '@material-ui/core/CircularProgress';
import GroupProfile from '../components/group/GroupProfile';
import withStyles from '@material-ui/core/styles/withStyles';

import axios from 'axios';

const styles = (theme) => ({
  ...theme.spreadThis,
  profile: {
    marginTop: 30,
  },
});

function FormRow() {
  return (
    <Fragment>
      <Grid item sm={3}>
        <MemberCards />
      </Grid>
      <Grid item sm={3}>
        <MemberCards />
      </Grid>
      <Grid item sm={3}>
        <MemberCards />
      </Grid>
      <Grid item sm={3}>
        <MemberCards />
      </Grid>
    </Fragment>
  );
}

class groupHome extends Component {
  state = {
    profile: null,
  };
  // componentDidMount() {
  //     const handle = this.props.match.params.handle;
  //     const postId = this.props.match.params.postId;

  //     if (postId) this.setState({ postIdParam: postId });

  //   this.props.getGroupData(handle);
  //   axios
  //     .get(`/user/${handle}`)
  //     .then((res) => {
  //       this.setState({
  //         profile: res.data.user,
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }

  componentDidMount() {
    const groupHandle = this.props.match.params.groupHandle;
    this.props.getGroup(groupHandle);
  }

  render() {
    const { users } = this.props.group;
    const { classes } = this.props;

    let usersMarkup = users ? (
      users.map((user) => <MemberCards key={user.userId} user={user} />)
    ) : (
      <CircularProgress size={30} className={classes.progress} />
    );

    return (
      <Grid container spacing={10}>
        <Grid container spacing={3} className={styles.profile}>
          {usersMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <GroupProfile />
        </Grid>
      </Grid>
    );
  }
}

groupHome.propTypes = {
  getGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
});

const mapActionsToProps = {
  getGroup,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(groupHome));
