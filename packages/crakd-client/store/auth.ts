import { Socket } from 'socket.io-client';
import { UserRole } from '../constants';

export interface AuthUser {
    _id: string;
    role: UserRole;
    email?: string;
    username?: string;
    gamertag?: string;
    fullName?: string;
    facebookId?: string;
    googleId?: string;
    city?: string;
    state?: string;
    country?: string;
    tournaments: any[];
    isOnline: boolean;
    image?: string;
    imagePublicId?: string;
    coverImage?: string;
    coverImagePublicId?: string;
}

export enum PopupType {
    Sign_Up = 'SIGN_UP',
    Log_In = 'LOG_IN',
    Forgot_Password = 'FORGOT_PASSWORD',
}

export interface AuthState {
    user: AuthUser | null;
    socket: Socket | null;
    token: string | null;
    isPopupOpen: boolean;
    popupType: null | PopupType;
}

export const SET_AUTH_USER = 'SET_AUTH_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_SOCKET = 'SET_SOCKET';
export const CLEAR_AUTH_USER = 'CLEAR_AUTH_USER';
export const OPEN_AUTH_POPUP = 'OPEN_AUTH_POPUP';
export const CLOSE_AUTH_POPUP = 'CLOSE_AUTH_POPUP';
export const ADD_USER_IMAGE = 'ADD_USER_IMAGE';
export const ADD_USER_COVER = 'ADD_USER_COVER';

export interface setAuthUserAction {
    type: typeof SET_AUTH_USER;
    payload: AuthUser;
}

export interface clearAuthUserAction {
    type: typeof CLEAR_AUTH_USER;
}

export interface setTokenAction {
    type: typeof SET_TOKEN;
    payload: string;
}

export interface setSocketAction {
    type: typeof SET_SOCKET;
    payload: Socket;
}

export interface openAuthPopupAction {
    type: typeof OPEN_AUTH_POPUP;
    payload: PopupType;
}

export interface closeAuthPopupAction {
    type: typeof CLOSE_AUTH_POPUP;
}

export interface addUserImageAction {
    type: typeof ADD_USER_IMAGE;
    payload: any;
}

export interface addUserCoverAction {
    type: typeof ADD_USER_COVER;
    payload: any;
}

export type AuthActionTypes =
    | setAuthUserAction
    | setTokenAction
    | clearAuthUserAction
    | openAuthPopupAction
    | closeAuthPopupAction
    | setSocketAction
    | addUserImageAction
    | addUserCoverAction;

export function setAuthUser(user: AuthUser): AuthActionTypes {
    return {
        type: SET_AUTH_USER,
        payload: user,
    };
}

export function setToken(token: string): AuthActionTypes {
    return {
        type: SET_TOKEN,
        payload: token,
    };
}

export function setSocket(socket: Socket): AuthActionTypes {
    return {
        type: SET_SOCKET,
        payload: socket,
    };
}

export function clearAuthUser(): AuthActionTypes {
    return {
        type: CLEAR_AUTH_USER,
    };
}

export function openAuthPopup(popupType: PopupType): AuthActionTypes {
    return {
        type: OPEN_AUTH_POPUP,
        payload: popupType,
    };
}

export function closeAuthPopup(): AuthActionTypes {
    return {
        type: CLOSE_AUTH_POPUP,
    };
}

export function addUserImage({ image: image, imagePublicId: imagePublicId }): AuthActionTypes {
    return {
        type: ADD_USER_IMAGE,
        payload: { image, imagePublicId },
    };
}

export function addUserCover({ coverImage: coverImage, coverImagePublicId: coverImagePublicId }): AuthActionTypes {
    return {
        type: ADD_USER_COVER,
        payload: { coverImage, coverImagePublicId },
    };
}

const initialState: AuthState = {
    user: null,
    token: null,
    socket: null,
    isPopupOpen: false,
    popupType: null,
};

export function authReducer(state = initialState, action: AuthActionTypes): AuthState {
    switch (action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                user: action.payload,
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case CLEAR_AUTH_USER:
            return {
                ...state,
                user: null,
            };
        case SET_SOCKET:
            return {
                ...state,
                socket: action.payload,
            };
        case OPEN_AUTH_POPUP:
            return {
                ...state,
                isPopupOpen: true,
                popupType: action.payload,
            };
        case CLOSE_AUTH_POPUP:
            return {
                ...state,
                isPopupOpen: false,
            };
        case ADD_USER_IMAGE:
            return {
                ...state,
                user: {
                    ...state.user,
                    image: action.payload.image,
                    imagePublicId: action.payload.imagePublicId,
                },
            };
        case ADD_USER_COVER:
            return {
                ...state,
                user: {
                    ...state.user,
                    coverImage: action.payload.coverImage,
                    coverImagePublicId: action.payload.coverImagePublicId,
                },
            };
        default:
            return state;
    }
}