import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Alert from '../../components/UI/Alert/Alert';

import FormField from '../../components/FormField/FormField';
import Input from '../../components/UI/Input/Input';
import {userService} from '../../services';
import logo from "../../assets/logo2.png";
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems'
import Footer from '../../components/Footer/Footer';
class SignUp extends Component {
    state = {
        register: false,
        email: '',
        password: '',
        username:'',
        firstname:'',
        lastname:'',
        message:''
    }

    onInputChangedHandler = (event, type) => {
        const value = event.target.value;
        if(type === "email"){
        this.setState({email: value})
        }else if(type === "username"){
           this.setState({username: value})
        }
        else if(type === "lastname"){
           this.setState({lastname: value}) 
        }
        else if(type === "firstname"){
           this.setState({firstname: value}) 
        }
        else if(type === "password"){
           this.setState({password: value})
        }

    }

    nullController(firstname,lastname,username,email,password){
        
        if(firstname==null || firstname==''){
             return 'Firstname is required'

        }
        if(lastname==null || lastname==''){
            return 'lastname is required'

        }
       
        if(email==null || email==''){
            return 'email is required'

        }
         if(email==null || email==''){
            return 'email is required'

        }
        if(password==null || password==''){
            return 'password is required'
        }
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(!password.match(passw)) {
            return 'Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter'

        }

        
        
        
    }

    onFormSubmitHandler = async event => {
        event.preventDefault();
        let nullField=this.nullController(this.state.firstname,this.state.lastname,this.state.username,this.state.email,this.state.password);

        if(!nullField){
             try{
                    const response=await userService.addUser(this.state.firstname,this.state.lastname,this.state.username,this.state.email,this.state.password,'N');
                    this.setState({message:'User created.You are redirected to the login page..'});
                    setTimeout(this.props.history.push('/login'),2000);
                     console.log(response);
             } catch(e) {
            console.log(e.response)
            this.setState({message: e.response.data.description });
            }
        }else{
             this.setState({message: nullField });
        }
       
           
    }

   registerLoginToggleLinkClickHandler=()=>{

       this.props.history.push('./login')

   }

   

  

    onBackToLoginClickHandler = () => {
        this.props.onBackToLoginClick();
    }

    render() {
        let body = null;
        
          
            body = (
             //   <Aux>
             <>
                   
                  <NavigationItems/>
                    <div className="center-item">
                        <form onSubmit={this.onFormSubmitHandler} >
                        <h3>SIGN UP</h3>
                            <p className="errorMessage">{this.state.message}</p>
                            
                            <Input className="input"
                                inputType="email" 
                                changed={(event) => this.onInputChangedHandler(event, "email")} 
                                label="Email"  
                                placeHolder="Enter Email"
                            />
                            <Input className="input"
                                inputType="password" 
                                changed={(event) => this.onInputChangedHandler(event, "password")} 
                                label="Password" 
                                placeHolder="Enter Password"
                            />

                             <Input className="input"
                                inputType="text" 
                                changed={(event) => this.onInputChangedHandler(event, "firstname")} 
                                label="Firstname" 
                                placeHolder="Enter Firstname"
                            />
                              <Input className="input"
                                inputType="text" 
                                changed={(event) => this.onInputChangedHandler(event, "lastname")} 
                                label="Lastname"
                                placeHolder="Enter Lastname" 
                            />

                            <button  className="button" btnType="cta">Sign Up</button>
                        </form>
                        <p className="OR">OR</p>
                       
                        <div className="bottomLinks">
                        
                             <p onClick={this.registerLoginToggleLinkClickHandler} className="registerLoginToggleLink">{'Already a user? Login'}</p>
                        </div>
                        {/* {
                            this.props.alertMsg !== ''
                            ? <Alert alertType={this.props.alertType}>{this.props.alertMsg}</Alert>
                            : null
                        } */}
                    </div>
                    <Footer/>
                    </>
             
            );
            return body;
        }

    }



        
    








export default SignUp;