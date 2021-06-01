import {
  SET_GROUPS,
  CREATE_GROUP,
  ADD_USER,
  REMOVE_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_DATA,
  LOADING_UI,
} from '../types';
import { addUser } from './userActions';
import { clearErrors } from './dataActions';
import axios from 'axios';

export const getGroups = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/groups')
    .then((res) => {
      dispatch({
        type: SET_GROUPS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_GROUPS,
        payload: [],
      });
    });
};

export const createGroup = (newGroup) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/groups', newGroup)
    .then((res) => {
      dispatch({
        type: CREATE_GROUP,
        payload: res.data,
      });
      dispatch(addUser({ groupHandle: newGroup.groupHandle }));
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// export const addUser = (userName, group) => (dispatch) => {
//   dispatch({ type: LOADING_UI });
//   axios
//     .post('/groups', userData)
//     .then((res) => {
//       console.log(res.data);
//       dispatch(getUserData());
//       dispatch({ type: CLEAR_ERRORS });
//       history.push('/');
//     })
//     .catch((err) => {
//       dispatch({
//         type: SET_ERRORS,
//         payload: err.response.data,
//       });
//     });
// };
