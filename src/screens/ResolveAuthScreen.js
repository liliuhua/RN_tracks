import React, {useEffect, useContext} from 'react';
import {Context as AuthContext} from "../context/AuthContext";

const ResolveAuthScreen = () => {
    const {tryLocalSignin} = useContext(AuthContext);

    //call some function just one time when our component sign up screen first appears on the screen
    useEffect(()=> {
        tryLocalSignin();
    }, [])

    return null;
};

export default ResolveAuthScreen;
