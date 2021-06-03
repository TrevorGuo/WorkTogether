import React, { Component, Fragment } from 'react';

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroups } from '../redux/actions/groupActions';
import Group from '../components/group/Group';
import CreateGroup from '../components/group/CreateGroup';
import TextField from '@material-ui/core/TextField';
import MyButton from '../util/MyButton';
import SearchIcon from '@material-ui/icons/Search';

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
  state = {
    search: '',
  };
  componentDidMount() {
    this.props.getGroups({ queryText: this.state.search });
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    this.props.getGroups({ queryText: this.state.search });
  };
  render() {
    const { groups, loading } = this.props.group;
    const classes = this.props;

    let recentGroupsMarkup = loading ? (
      <CircularProgress size={30} className={classes.progress} />
    ) : (
      groups.map((group) => <Group key={group.groupId} group={group} />)
    );

    return (
      <Grid container spacing={5}>
        <Grid item sm={8} xs={12}>
          <TextField
            name='search'
            placeholder='Search...'
            type='text'
            onChange={this.handleChange}
            styles={{ marginLeft: 24 }}
          />
          <MyButton onClick={this.handleSubmit} tip='Search for a group'>
            <SearchIcon styles={{ position: 'absolute', height: '100%' }} />
          </MyButton>
          <br />
          <br />
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
  group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
});

const mapActionsToProps = {
  getGroups,
};

export default connect(mapStateToProps, mapActionsToProps)(groups);
