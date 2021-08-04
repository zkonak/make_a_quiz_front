import React from 'react';
import logo from "../../../assets/logo2.png";
 
//import  './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => {
    let body = null;
 
            body = (
              
            //    <>
            //        <img className="logo" src={logo} alt="logo"/>
            //         <NavigationItem className="onlyDesktop" link="/dashboard">Dashboard</NavigationItem>
            //         <NavigationItem className="onlyDesktop" link="/create-quiz">Create Quiz</NavigationItem>
            //         <NavigationItem className="onlyDesktop" link="/available-quizzes">Take Quiz</NavigationItem>
            //         <NavigationItem className="onlyDesktop" link="/login">Login</NavigationItem>
            //    </>
               
  <div class="wrapper site-header__wrapper">
    <a href="/" class="brand"> <img className="logo" src={logo} alt="logo"/></a>
    <nav class="nav">
      
      <ul class="nav__wrapper">
                  
                    <NavigationItem className="onlyDesktop" link="/dashboard">Dashboard</NavigationItem>
                    <NavigationItem className="onlyDesktop" link="/create-quiz">Create Quiz</NavigationItem>
                    <NavigationItem className="onlyDesktop" link="/available-quizzes">Take Quiz</NavigationItem>
                    <NavigationItem className="onlyDesktop" link="/login">Login</NavigationItem>
               </ul>
    </nav>
  </div>

              
            );




   

    return (
       // <ul className="NavigationItems">
        <header class="site-header">
            {body}
    </header>
       // </ul>
    );
};
    

export default navigationItems;