import{
    POST_POST
}

//inside the switch statment there should be 
case LIKE_SCREAM:
case UNLIKE_SCREAM:
    let index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
    );
    state.posts[index] = action.paylod;
    if(state.post.postId === action.payload.postId){
        state.post = action.payload;
    }
    return{
        ...state
    };
case SET_POST:
    return {
        ...state,
        post: action.payload,
    };
case POST_POST:
    return {
        ...state,
        posts:[
            action.payload,
            ...state.posts
        ]
    }
