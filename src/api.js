import axios from 'axios';
import {ActionCreator} from './reducer/user/user';


export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/six-cities`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    switch (err.response.status) {
      case 403:
        dispatch(ActionCreator.requireAuthorization(true));
        return err.response;

      case 400:
        throw new Error(`Incorrect data!`);

      default:
        throw new Error(`Ooooppppssss!`);
    }
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
