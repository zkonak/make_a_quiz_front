import React from 'react';

 
import  './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => {
    let body = null;
 
            body = (
              
               <>
                    <NavigationItem className="onlyDesktop" link="/dashboard">Dashboard</NavigationItem>
                    <NavigationItem className="onlyDesktop" link="/create-quiz">Create Quiz</NavigationItem>
                    <NavigationItem className="onlyDesktop" link="/available-quizzes">Take Quiz</NavigationItem>
                    <NavigationItem className="onlyDesktop" link="/login">Login</NavigationItem>
               </>
              
            );
   

    return (
        <ul className="NavigationItems">
            {body}
        </ul>
    );
};
    

export default navigationItems;