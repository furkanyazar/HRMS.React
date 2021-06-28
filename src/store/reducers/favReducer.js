import { ADD_TO_FAV, REMOVE_FROM_FAV } from "../actions/favActions";
import { favItems } from "../initialValues/favItems";

const initialState = {
  favItems: favItems,
};

export default function favReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TO_FAV:
      let fav = state.favItems.find((f) => f.fav.id === payload.id);

      if (fav) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          favItems: [...state.favItems, { fav: payload }],
        };
      }

    case REMOVE_FROM_FAV:
      return {
        ...state,
        favItems: state.favItems.filter((f) => f.fav.id !== payload.id),
      };

    default:
      return state;
  }
}
