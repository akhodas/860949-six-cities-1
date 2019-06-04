import {combineReducers} from "redux";
import {reducer as user} from "./user/user";
import {reducer as data} from "./data/data";
import Namespace from "./namespace";

export default combineReducers({
  [Namespace.USER]: user,
  [Namespace.DATA]: data,
});
