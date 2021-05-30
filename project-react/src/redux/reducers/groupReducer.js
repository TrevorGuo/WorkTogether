import { 
    ADD_USER, 
    REMOVE_USER, 
} from "../types";

const initialState = {
  loading: false,
  credentials: {},
  users: [],
  user: {},
};

export default function (state = initialState, action) {
    switch(action.type) {
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            }
        case REMOVE_USER:
            let index = state.users.findIndex((user) => user.userId === action.payload);
            state.posts.splice(index, 1);
            return {
              ...state,
            };
        default:
            return state;
    }
}
