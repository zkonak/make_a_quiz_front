import React from 'react';
//import   './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
   
    return (
        // <li className="NavigationItem" style={props.style}>
        //     {
                 
        //          <NavLink exact={props.exact} to={props.link} activeClassName="NavigationItem"> {props.children} </NavLink>
        //     }
        // </li>
         <li className="nav__item" style={props.style}>
            {
                 
                 <NavLink className="NavLink" exact={props.exact} to={props.link} > {props.children} </NavLink>
            }
        </li>
    );
}



export default navigationItem;