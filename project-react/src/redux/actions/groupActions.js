import {
    ADD_USER,
    REMOVE_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
  } from '../types';
  
  import axios from 'axios';

  export const addUser = (userName, group) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/groups', userData)
      .then((res) => {
        console.log(res.data);
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      });
  };

