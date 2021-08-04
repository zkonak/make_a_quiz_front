import React from 'react';
//import '../../assets/Button.css';

const button = (props) => {
    const disabled = props.disabled === true ? "disabled" : null
   
    return (
        <button 
            style={props.style} 
            className={props.className !== undefined ? "Button" : props.className} 
            onClick={props.clicked !== undefined ? props.clicked : null}
            disabled={disabled}
        >{props.children}</button>
    );
}

export default button;