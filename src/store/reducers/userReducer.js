import {
  LOG_IN_ADMIN,
  LOG_IN_EMPLOYER,
  LOG_IN_USER,
  LOG_OUT,
} from "../actions/userActions";
import { userItems } from "../initialValues/userItems";

const initialState = {
  userItems: userItems,
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOG_IN_ADMIN:
      return {
        ...state,
        userItems: [{ user: payload, type: "admin" }],
      };

    case LOG_IN_EMPLOYER:
      return {
        ...state,
        userItems: [{ user: payload, type: "employer" }],
      };

    case LOG_IN_USER:
      return {
        ...state,
        userItems: [{ user: payload, type: "user" }],
      };

    case LOG_OUT:
      return {
        userItems: [{ user: {}, type: "logout" }],
      };
    default:
      return state;
  }
}
