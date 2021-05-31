import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  SET_POST,
  UPLOAD_POST,
  SUBMIT_COMMENT,
  SET_GROUPS,
  SET_GROUP,
  CREATE_GROUP,
} from '../types';

const initialState = {
  posts: [],
  post: {},
  groups: [],
  group: {},
  loading: false,
};

export default function (state = initialState, action) {
  let index = 0;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case LIKE_POST:
    case UNLIKE_POST:
      index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      const comments = state.post.comments;
      if (state.post.postId === action.payload.postId) {
        state.post = action.payload;
      }
      return {
        ...state,
        post: {
          ...state.post,
          comments,
        },
      };
    case UPLOAD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case DELETE_POST:
      index = state.posts.findIndex((post) => post.postId === action.payload);
      state.posts.splice(index, 1);
      return {
        ...state,
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };
    case SET_GROUPS:
      return {
        ...state,
        groups: action.payload,
        loading: false,
      };
    case SET_GROUP:
      return {
        ...state,
        group: action.payload,
      };
    case CREATE_GROUP:
      return {
        ...state,
        groups: [action.payload, ...state.groups],
      };
    default:
      return state;
  }
}
