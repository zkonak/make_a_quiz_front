import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Alert from '../../components/UI/Alert/Alert';

import FormField from '../../components/FormField/FormField';
import {userService} from '../../services';



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
        if(username==null || username==''){
            return 'username is required'

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
                    this.setState({message:'user created'});
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
                   
                    <p className="title">Sign Up</p>
                    <div className="Auth">
                        <form onSubmit={this.onFormSubmitHandler} >
                            <p className="errorMessage">{this.state.message}</p>
                            <FormField 
                                formFieldType="text" 
                                changed={(event) => this.onInputChangedHandler(event, "username")} 
                                label="Username"  
                            />
                           
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

                             <FormField 
                                formFieldType="text" 
                                changed={(event) => this.onInputChangedHandler(event, "firstname")} 
                                label="Firstname" 
                            />
                              <FormField 
                                formFieldType="text" 
                                changed={(event) => this.onInputChangedHandler(event, "lastname")} 
                                label="Lastname" 
                            />

                            <Button btnType="cta">Sign Up</Button>
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
                    </>
             
            );
            return body;
        }

    }



        
    








export default SignUp;