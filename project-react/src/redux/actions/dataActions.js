import {
SET_ERRORS,
POST_POST,
CLEAR_ERRORS,
LOADING_UI,
STOP_LOADING_UI
}
//after get all screams
export const getPost = (postId) => dispatch =>{
    dispatch({type: LOADING_UI});
    axios.get(`/post/${postId}`)
        .then(res =>{
            dispatch({
                type: SET_POST,
                payload: res.data
            });
            dispatch({type:STOP_LOADING_UI})
        })
        .catch(err => console.log(err));
    
}
//Post a post
export const postPost = (newPost) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/post',newPost)
    .then(res=>{
        dispatch({
            type:POST_POST,
            payload: res.data
        });
        dispatch({ type: CLEAR_ERRORS});
    })
    .catch(err=>{
        dispatch({
            type:SET_ERRORS,
            payload: err.response.data
        });
    })
//before like a scream

//at the end of the file
export const clearErrors = () => dispatch => {
    dispatch({type:CLEAR_ERRORS});
}