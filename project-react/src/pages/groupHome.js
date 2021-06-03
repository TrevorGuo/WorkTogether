import React, { Component, Fragment } from 'react';

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroups } from '../redux/actions/groupActions';
import TextField from '@material-ui/core/TextField';
import MyButton from '../util/MyButton';
import MemberCards from '../components/group/MemberCards';
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

class groupHome extends Component {
    // componentDidMount() {
    //     const handle = this.props.match.params.handle;
    //     const postId = this.props.match.params.postId;
    
    //     if (postId) this.setState({ postIdParam: postId });
    
    //     this.props.getGroupData(handle);
    //     axios
    //       .get(`/user/${handle}`)
    //       .then((res) => {
    //         this.setState({
    //           profile: res.data.user,
    //         });
    //       })
    //       .catch((err) => console.log(err));
    //   }
    

    render(){
        const { users, loading } = this.props.data;
        const { postIdParam } = this.state;

        let usersMarkup = loading ? (
          <CircularProgress size={30} className={classes.progress} />
        ) : (
          FormRow())

    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
            {postsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
            {this.state.profile === null ? (
                <p>Loading profile...</p>
            ) : (
                <StaticProfile profile={this.state.profile} />
            )}
            </Grid>
        </Grid>
        );
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    data: state.data,
  });

export default connect(
    mapStateToProps,
    mapActionsToProps
  )(withStyles(styles)());
