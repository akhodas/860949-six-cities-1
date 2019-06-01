import {combineReducers} from "redux";
import {reducer as user} from "./user/user";
import {reducer as data} from "./data/data";
// import Namespace from "./namespaces";

export default combineReducers({
  //   [Namespace.GAME]: user,
  //   [Namespace.DATA]: data,
  user,
  data,
});
