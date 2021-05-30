import React, { Component, Fragment } from 'react';

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  render() {
    const { posts, loading } = this.props.data;
    const classes = this.props;

    return (
      <Grid container spacing={4}>
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
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(groups);
