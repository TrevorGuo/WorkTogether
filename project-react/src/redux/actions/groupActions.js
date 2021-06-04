import {
  SET_GROUPS,
  CREATE_GROUP,
  SET_ERRORS,
  LOADING_UI,
  SET_GROUP,
  STOP_LOADING_UI,
  LOADING_GROUP,
  DELETE_GROUP,
} from '../types';
import { addUser } from './userActions';
import { clearErrors } from './dataActions';
import axios from 'axios';

export const getGroups = (queryText) => (dispatch) => {
  dispatch({ type: LOADING_GROUP });
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
  dispatch({ type: LOADING_GROUP });
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

export const uploadGroupImage = (formData, groupHandle) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/groups/image', formData)
    .then(() => {
      dispatch(getGroup(groupHandle));
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

export const editGroupsDetails = (groupDetails) => (dispatch) => {
  dispatch({ type: LOADING_GROUP });
  axios
    .post('/groups/details', groupDetails)
    .then(() => {
      dispatch(getGroup(groupDetails.groupHandle));
    })
    .catch((err) => console.log(err));
};

export const deleteGroup = (groupHandle) => (dispatch) => {
  axios
    .delete('/groups')
    .then(() => {
      dispatch({ type: DELETE_GROUP, payload: groupHandle });
    })
    .catch((err) => console.log(err));
};
