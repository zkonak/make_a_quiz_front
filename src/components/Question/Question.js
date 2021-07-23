import React from 'react';

import  './Question.css';

import Input from '../UI/Input/Input';


const question = (props) => {
    let body = '';
  
    if(!props.viewer) {
        body = (
         
          <>
                <label>Question</label>
                <Input 
                    changed={props.changed} 
                    inputType="text"
                    value={props.value}
                ></Input>
                </>
        
        )
    } else {
        body = <p className="questionTitle">{props.questionNo}) {props.title}</p>
    }
    return (
        <div className="Question">
            {body}
        </div>
    );
}

export default question;