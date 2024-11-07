import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const LogOut = () => {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        Cookies.remove('role');
        Cookies.remove('user_id');
        navigate('/')
    })

}

export default LogOut