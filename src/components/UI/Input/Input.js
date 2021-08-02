import React from 'react';
//import  './Input.css';

const input = props => {
    //const classNames = [classes.Input, classes[props.className]].join(' ');
    return (
        <input 
            onChange={props.changed} 
            type={props.inputType} 
            className="Input" 
            value={props.value}
        />
    );
}

export default input;