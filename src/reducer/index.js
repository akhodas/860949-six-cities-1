import {combineReducers} from "redux";
import {reducer as user} from "./user/user";
import {reducer as data} from "./data/data";
import Namespaces from "./namespaces";

export default combineReducers({
  [Namespaces.USER]: user,
  [Namespaces.DATA]: data,
});
