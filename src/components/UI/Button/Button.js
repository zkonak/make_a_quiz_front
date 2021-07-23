import React from 'react';
import './Button.css';

const button = (props) => {
    const disabled = props.disabled === true ? "disabled" : null
   
    return (
        <button 
            style={props.style} 
            className="Button" 
            onClick={props.clicked !== undefined ? props.clicked : null}
            disabled={disabled}
        >{props.children}</button>
    );
}

export default button;