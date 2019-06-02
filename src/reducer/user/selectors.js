import Namespaces from "../namespaces";

const NAMESPACES = Namespaces.USER;


export const getCity = (state) => {
  return state[NAMESPACES].city;
};

export const getAuthorizationStatus = (state) => {
  return state[NAMESPACES].isAuthorizationRequired;
};

export const getEmail = (state) => {
  return state[NAMESPACES].email;
};
