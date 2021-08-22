import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import  './Auth.css';
import Button from '../../components/UI/Button/Button';
import Alert from '../../components/UI/Alert/Alert';

import FormField from '../../components/FormField/FormField';
import Input from '../../components/UI/Input/Input';
import {userService} from '../../services'

import logo from "../../assets/logo2.png";
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Logout extends Component {
    state = {
        email: '',
        password: '',
        message:''
    }

    componentDidMount(){
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        cookies.remove("authcookie");
        this.props.history.push("/");
      
    }

    render() {
        return null;
               }

    }



        
    








export default Logout;