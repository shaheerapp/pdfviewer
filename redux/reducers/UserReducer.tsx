import { SET_USER, LOGOUT, UPDATE_PROFILE } from '../actions/UserActions';


interface UserInterface {
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string,
    location: string;
    country: string;
    language: string;
}

const initialState = {
    user: {} as UserInterface,
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                user: {} as UserInterface,
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
