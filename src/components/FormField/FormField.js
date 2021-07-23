import React from 'react';
import './FormField.css';

import Input from '../UI/Input/Input';

const formField = (props) => (
    <div className="FormField">
        <label>{props.label}</label>
        <Input 
            inputType={props.formFieldType} 
            changed={props.changed} 
            value={props.value}
            
        />
    </div>
);

export default formField