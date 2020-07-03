import {AsyncStorage} from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import {navigate} from "../navigationRef"; //use curly braces because it don't have default

const authReducer = (state, action) => {
    switch (action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signin':
            return {errorMessage: '', token: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        case 'signout':
            return  { token: null, errorMessage: ''};
        default:
            return state;

    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({type:'clear_error_message'})
}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({type:'signin', payload: token});
        navigate('TrackList');
    }else{
        navigate('Signup');
    }
}

const signup = (dispatch) => async ({ email, password}) => {
        //make api request to sign up with that email and passsword
        //if we sign up, modify our state, and say that we are authenticated
        //if signing up fails, we probably need to reflect an error message somewhere
        try{
            const response = await trackerApi.post('/signup', {email, password});
            // save token in async storage
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type:'signin', payload:response.data.token});

            //navigate to main flow
            navigate('TrackList');

        }catch (err) {
             // console.log(err.response.data);
            dispatch({type:'add_error', payload:'Something went wrong with sign up'});
        }
    }

const signin = (dispatch) => async ({email, password}) => {
        //Try to signin
        //Handle success by updating state
        //Handle failure by showing error message (somehow )

        try{
            const response = await trackerApi.post('/signin', {email, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type:'signin', payload:response.data.token});
            navigate('TrackList');
        }catch(err){
            console.log(err);
            dispatch({type:'add_error', payload:'Something went wrong with sign in'});
        }

    }


const signout = (dispatch) => async () => {
    //somehow sign out !!!
    await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'});
    navigate('loginFlow');
    }




export const {Provider, Context} = createDataContext(
    authReducer,
    {signin, signout, signup, clearErrorMessage, tryLocalSignin },
    {token: null, errorMessage:''}
);
