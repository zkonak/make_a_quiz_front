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
        body =<div> <p className="questionTitle">{props.questionNo}) {props.title}</p>
               <p>({props.score} point)</p></div>
        
    }
    return (
        <div className="Question">
            {body}
        </div>
    );
}

export default question;