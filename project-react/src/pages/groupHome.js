import React, { Component, Fragment } from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroup } from '../redux/actions/groupActions';
import MemberCards from '../components/group/MemberCards';
import CircularProgress from '@material-ui/core/CircularProgress';
import GroupProfile from '../components/group/GroupProfile';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  ...theme.spreadThis,
});

class groupHome extends Component {
  componentDidMount() {
    const groupHandle = this.props.match.params.groupHandle;
    this.props.getGroup(groupHandle);
  }

  render() {
    const { users } = this.props.group;
    const { classes } = this.props;

    let usersMarkup = users ? (
      users.map((user) => (
        <MemberCards key={user.userId} member={user.handle} />
      ))
    ) : (
      <CircularProgress size={30} className={classes.progress} />
    );

    return (
      <Fragment>
        <Grid container spacing={10}>
          <Grid item sm={8}>
            <Box display='flex' flexWrap='wrap'>
              {usersMarkup}
            </Box>
          </Grid>
          <Grid item sm={4}>
            <GroupProfile />
          </Grid>
        </Grid>
      </Fragment>
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
