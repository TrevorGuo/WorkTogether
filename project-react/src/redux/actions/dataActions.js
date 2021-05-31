import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  SET_ERRORS,
  UPLOAD_POST,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_POST,
  SUBMIT_COMMENT,
  SET_GROUPS,
  CREATE_GROUP,
} from '../types';
import axios from 'axios';

// Get all posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/posts')
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_POSTS,
        payload: [],
      });
    });
};

export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/post/${postId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: SET_POST,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
//Post a post
export const uploadPost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/post', newPost)
    .then((res) => {
      dispatch({
        type: UPLOAD_POST,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
// Like a post
export const likePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a post
export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
//Submit a Comment
export const submitComment = (postID, commentData) => (dispatch) => {
  axios
    .post(`/post/${postID}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => console.log(err));
};

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
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data.posts,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_POSTS,
        payload: null,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
