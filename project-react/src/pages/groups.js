import React, { Component, Fragment } from 'react';

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroups } from '../redux/actions/dataActions';
import Group from '../components/group/Group';
import CreateGroup from '../components/group/CreateGroup';

import CircularProgress from '@material-ui/core/CircularProgress';

// function FormRow() {
//   return (
//     <Fragment>
//       <Grid item sm={4}>
//         <MemberCards />
//       </Grid>
//       <Grid item sm={4}>
//         <MemberCards />
//       </Grid>
//       <Grid item sm={4}>
//         <MemberCards />
//       </Grid>
//     </Fragment>
//   );
// }

class groups extends Component {
  componentDidMount() {
    this.props.getGroups();
  }
  render() {
    const { groups, loading } = this.props.data;
    const classes = this.props;

    let recentGroupsMarkup = loading ? (
      <CircularProgress size={30} className={classes.progress} />
    ) : (
      groups.map((group) => <Group key={group.groupId} group={group} />)
    );

    return (
      <Grid container spacing={5}>
        <Grid item sm={8} xs={12}>
          {recentGroupsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <CreateGroup />
        </Grid>
      </Grid>
    );
  }
}

groups.propTypes = {
  groups: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  groups: state.groups,
  data: state.data,
});

const mapActionsToProps = {
  getGroups,
};

export default connect(mapStateToProps, mapActionsToProps)(groups);
