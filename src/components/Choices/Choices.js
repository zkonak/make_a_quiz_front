import React,{ useEffect, useState} from 'react';


import './Choices.css'
import api from '../../services/api';

import Input from '../UI/Input/Input';
import {choiceService} from  '../../services';
const Choices = (props) => {
   
    let choices = ''
    let checked = props.answer !== 0 ? true : false;

  
   const [array, setArray] = useState([]); 


        let arrayChoices=[];
            let promises=[];
            useEffect(()=> {     
            
            api.get('/option/question/'+ props.choices)
            .then((res) => {  setArray(res.data); 
        });

            }
            
            ,[]); 





    if(!props.viewer) {
      
     
   
         
        choices = [1, 2, 3, 4].map(i => {
            return (
                <div key={i}>
                  <p >{i})</p>
                    <Input 
                        inputType="text" 
                        changed={(event) => props.changed(event, i)}
                        value={props.value.length >= i ? props.value[i-1] : ""}
                    />
                    
                  
                
                    {/* <Input inputType="checkbox"
                     changed={() => props.clicked(i)}
                     value={i}
                     id={props.answer}
                     name={props.answer}
                     checked={checked}
                     
                   
                    
               /> */}
                     
                    {/* <p 
                        className={props.answer === i ? classes.answer : ''} 
                        onClick={() => props.clicked(i)}
                        data-tip="Click it for choosing the correct answer"
                    >
                    ca</p> */}
                    
                </div>
            );


          
        });
    } else {

        
        let sno = 1;
      
        choices = array.map(choice => {
            // const classNames = props.selected === choice
            //                     ? [classes.Choice, classes.selected].join(' ')
            //                     : classes.Choice;
            return (
                <div>
                <Input inputType="checkbox"/>
                <p key={choice.option} id={choice.option} className="Choices" onClick={() => props.clicked(choice.option)} >{sno++}) <span>{choice.option}</span></p>
            </div>
            );
        });
    }
    return (
        <div className="Choices">
            {!props.viewer ? <label>Choices</label> : null }
            {choices}
        </div>
    );
}

export default Choices;