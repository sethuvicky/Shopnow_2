import {LOGIN_FAIL,LOGIN_ERRORS,   UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,   UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL, LOGIN_SUCCESS,LOGIN_REQUEST,REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,REGISTER_USER_REQUEST, LOGOUT_REQUEST
    ,LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from "../constants/userConstants"
export const authReducer = (state = {user:{}},action)=>{
    switch(action.type){

        case  LOGIN_REQUEST:
        case  REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST :
    
        return{
            loading:true,
            isAuthenticated:false
        }
        case  LOGIN_SUCCESS:
            case  REGISTER_USER_SUCCESS:
            case LOAD_USER_SUCCESS :
            return{
                loading:false,
                isAuthenticated:true,
                user : action.payload
            }

            case  LOGIN_FAIL:
                case  REGISTER_USER_FAIL:
            case LOAD_USER_FAIL :

                return{
                    loading:false,
                    isAuthenticated:false,
                    user : null,
                    error:action.payload
                }

                case LOGOUT_REQUEST:
                    return {
                        loading:false,
                        isAuthenticated:true,
                        user : {}

                    }

              
        default: 
        return state ;

    }

    
}

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_REQUEST:

        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
            case UPDATE_PASSWORD_SUCCESS:

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

       
      


        case UPDATE_PROFILE_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload
            }

        

        default:
            return state;
    }
}


export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {

        case FORGOT_PASSWORD_REQUEST:
        case NEW_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                success: action.payload
            }

        case FORGOT_PASSWORD_FAIL:
        case NEW_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

     

        default:
            return state;
    }
}
