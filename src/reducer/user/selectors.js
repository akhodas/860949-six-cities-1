import Namespaces from "../namespaces";

const NAMESPACES = Namespaces.USER;


export const getCity = (state) => {
  return state[NAMESPACES].city;
};
