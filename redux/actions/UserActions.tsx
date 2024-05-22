export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';


export const setUserDetails = (user: any) => ({
    type: SET_USER,
    payload: user,
});

export const logoutUser = () => ({
    type: LOGOUT,
});

export const updateProfile = (user: any) => ({
    type: UPDATE_PROFILE,
    payload: user,
});
