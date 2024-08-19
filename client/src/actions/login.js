import { LOGIN, LOGOUT } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";
export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: LOGIN, data });
    history("/");
    messages.success("Login Successful");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: LOGIN, data });
    history("/");
    messages.success("Login Successful");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
export const googleLogin = (googleData, history) => async (dispatch) => {
  try {
    const { data } = await api.googleLogin(googleData);
    dispatch({ type: LOGIN, data });
    history("/");
    messages.success("Login Successful");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
export const setPassword = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.setPassword(formData);
    dispatch({ type: LOGOUT, data });
    messages.success("Password Set Was Successful");
    history("/");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
export const changePassword = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(formData);
    dispatch({ type: LOGOUT, data });
    messages.success("Password Change Was Successful");
    history("/");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
