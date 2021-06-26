export const LOG_IN_ADMIN = "LOG_IN_ADMIN";
export const LOG_IN_EMPLOYER = "LOG_IN_EMPLOYER";
export const LOG_IN_USER = "LOG_IN_USER";
export const LOG_OUT = "LOG_OUT";

export function logInAdmin(user) {
  return {
    type: LOG_IN_ADMIN,
    payload: user,
  };
}

export function logInEmployer(user) {
  return {
    type: LOG_IN_EMPLOYER,
    payload: user,
  };
}

export function logInUser(user) {
  return {
    type: LOG_IN_USER,
    payload: user,
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
    payload: {},
  };
}
