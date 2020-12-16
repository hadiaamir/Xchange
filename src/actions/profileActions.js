import http from '../utils/http';
import environment from '../utils/environment';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
} from './types';

// Profile loading
export const setProfileLoading = () => ({
  type: PROFILE_LOADING,
});

// Clear profile
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE,
});

// Get current profile
export const getCurrentProfile = () => async (dispatch) => {
  dispatch(setProfileLoading());

  try {
    const { data } = await http.get(`${environment.resolveApi().rest}/profile/me`);
    
    dispatch({
      type: GET_PROFILE,
      payload: data.profile || null,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });

    // this will set loading to false
    dispatch(clearCurrentProfile());
  }
};

// Get profile by handle
export const getProfileByHandle = handle => async (dispatch) => {
  dispatch(setProfileLoading());

  try {
    const { data } = await http.get(`${environment.resolveApi().rest}/profile/handle/${handle}`);
    dispatch({
      type: GET_PROFILE,
      payload: data.profile || null,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};


export const getSoleProfileByHandle = handle => async (dispatch) => {
  dispatch(setProfileLoading());

  try {
    const { data } = await http.get(`${environment.resolveApi().rest}/profile/sole/handle/${handle}`);
    dispatch({
      type: GET_PROFILE,
      payload: data.profile || null,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};




// Create Profile
export const createProfile = (profileData, history) => async (dispatch) => {
  try {
    await http.post(`${environment.resolveApi().rest}/profile`, profileData);
    history.push('/edit-profile');
    window.location.reload();
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

// Add experience
export const addExperience = (expData, history) => async (dispatch) => {
  try {
    await http.post(`${environment.resolveApi().rest}/profile/experience`, expData);
    history.push('/add-experience');
    window.location.reload();
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

// Add education
export const addEducation = (eduData, history) => async (dispatch) => {
  try {
    await http.post(`${environment.resolveApi().rest}/profile/education`, eduData);
    history.push('/add-experience');
    window.location.reload();
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

// Add availability
export const addAvailability = (avaData, history) => async (dispatch) => {
  try {
    await http.post(`${environment.resolveApi().rest}/profile/availability`, avaData);
    history.push('/');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

// Delete Experience
export const deleteExperience = id => async (dispatch , history) => {
  try {
    await http.delete(`${environment.resolveApi().rest}/profile/experience/${id}`);
    history.push('/');
    // window.location.reload();
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

// Delete Education
export const deleteEducation = id => async (dispatch , history) => {
  try {
    await http.delete(`${environment.resolveApi().rest}/profile/education/${id}`);
    history.push('/');
    // window.location.reload();
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch(setProfileLoading());
  try {
    const { data } = await http.get('/profile');
    dispatch({
      type: GET_PROFILES,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};


// Get all profiles for search engine
export const getSearchProfiles = () => async (dispatch) => {
  dispatch(setProfileLoading());
  try {
    const { data } = await http.get('/search_engine/sole/profile');
    dispatch({
      type: GET_PROFILES,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await http.delete('/profile');
      dispatch({
        type: SET_CURRENT_USER,
        payload: {},
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    }
  }
};
