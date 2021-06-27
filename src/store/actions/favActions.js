export const ADD_TO_FAV = "ADD_TO_FAV";
export const REMOVE_FROM_FAV = "REMOVE_FROM_FAV";

export function addToFav(jobPosting) {
  return {
    type: ADD_TO_FAV,
    payload: jobPosting,
  };
}

export function removeFromFav(jobPosting) {
  return {
    type: REMOVE_FROM_FAV,
    payload: jobPosting,
  };
}
