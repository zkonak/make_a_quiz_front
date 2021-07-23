import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import  './Auth.css';
import Button from '../../components/UI/Button/Button';
import Alert from '../../components/UI/Alert/Alert';

import FormField from '../../components/FormField/FormField';
import {userService} from '../../services'
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Login extends Component {
    state = {
        email: '',
        password: '',
        message:''
    }

    onInputChangedHandler = (event, type) => {
        const value = event.target.value;
        if(type === "email"){
        this.setState({email: value})
        }else if(type === "password"){
           this.setState({password: value})
        }
    }  

    onFormSubmitHandler =async  event => {
        event.preventDefault();
        if(this.state.email !== '' && this.state.password !== '') {
           try{
                    const response=await userService.login(this.state.email,this.state.password);
                    console.log(response);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.user.id);
                    cookies.set('authcookie', response.data.token, { path: '/' });
  
                    this.props.history.push('/dashboard');
                     
             } catch(e) {
           
                 this.setState({message: e.response.data.message });
            }
        } else {
            this.setState({message:'Password and email are required' });
        }
    }

    registerLoginToggleLinkClickHandler = () => {
        this.props.history.push('./signup')
    }

    forgotPasswordClickHandler = () => {
        //to-do
    }

  

    onBackToLoginClickHandler = () => {
        this.props.onBackToLoginClick();
    }

    render() {
        let body = null;
        if(this.props.forgotPassword) {
            body = (
            //    <Aux>
            <>
                    <p className="title">Forgot Password</p>
                    <div className="ForgotPassword">
                        <form onSubmit={this.forgotPasswordSubmitHandler}>
                            <p className="errorMessage">{this.state.message}</p>
                            <FormField 
                                formFieldType="email" 
                                changed={(event) => this.onInputChangedHandler(event, "email")} 
                                label="Email" 
                            />
                            {/* {
                                this.props.loading === true
                                ? <InlineLoader style={{color: '#000'}} />
                                : <Button btnType="cta">Send Link</Button>
                            } */}
                            <p className="BackToLoginLink" onClick={this.onBackToLoginClickHandler}>back</p>
                        </form>
                    </div>
                    </>
            //    </Aux>
            );
        } else {
            let authRedirect = null;
            if(this.props.isAuth) {
                authRedirect = <Redirect to={this.props.redirectPath} />
            }
            body = (
             //   <Aux>
             <>
                    {authRedirect} 
                    <p className="title">Login</p>
                    <div className="Auth">
                        <form onSubmit={this.onFormSubmitHandler} >
                            <p className="errorMessage">{this.state.message}</p>
                            {
                                this.props.linkSent === 1
                                ? (
                                    <div className="LinkSentMessage">
                                        <p>Password Link Sent Successfully, Check your email</p>
                                    </div>
                                )
                                : null
                            }
                            <FormField 
                                formFieldType="email" 
                                changed={(event) => this.onInputChangedHandler(event, "email")} 
                                label="Email" 
                            />
                            <FormField 
                                formFieldType="password" 
                                changed={(event) => this.onInputChangedHandler(event, "password")} 
                                label="Password" 
                            />
                            <Button btnType="cta">{'Login'}</Button>
                        </form>
                        <p className="OR">OR</p>
                       
                        <div className="bottomLinks">
                            <p onClick={this.forgotPasswordClickHandler} className="forgotPasswordLink">{'Forgot Password'}</p>
                            <p onClick={this.registerLoginToggleLinkClickHandler} className="registerLoginToggleLink">{'Not a User? Register'}</p>
                        </div>
                        {/* {
                            this.props.alertMsg !== ''
                            ? <Alert alertType={this.props.alertType}>{this.props.alertMsg}</Alert>
                            : null
                        } */}
                    </div>
                    </>
             
            );
            return body;
        }

    }



        
    
}







export default Login;