import {
  SET_GROUPS,
  CREATE_GROUP,
  ADD_USER,
  REMOVE_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_DATA,
  LOADING_UI,
  SET_USER,
  SET_GROUP,
  STOP_LOADING_UI,
} from '../types';
import { addUser } from './userActions';
import { clearErrors } from './dataActions';
import axios from 'axios';

export const getGroups = (queryText) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/groups', { params: queryText })
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

export const getGroup = (groupHandle) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/groups/${groupHandle}`)
    .then((res) => {
      dispatch({ type: SET_GROUP, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uploadGroupImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/groups/image', formData)
    .then(() => {
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
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
