import Namespace from "../namespace";

const NAMESPACE = Namespace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAMESPACE].isAuthorizationRequired;
};

export const getEmail = (state) => {
  return state[NAMESPACE].email;
};
