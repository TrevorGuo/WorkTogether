import {
  ADD_USER,
  REMOVE_USER,
  SET_GROUPS,
  SET_GROUP,
  CREATE_GROUP,
  LOADING_GROUP,
} from '../types';

const initialState = {
  loading: false,
  groups: [],
  group: {},
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case REMOVE_USER:
      let index = state.users.findIndex(
        (user) => user.userId === action.payload
      );
      state.users.splice(index, 1);
      return {
        ...state,
      };
    case LOADING_GROUP:
      return {
        ...state,
        loading: true,
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
        users: action.payload.users,
        loading: false,
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
