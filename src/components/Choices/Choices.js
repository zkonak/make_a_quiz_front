import React,{ useEffect, useState} from 'react';


//import './Choices.css'
import api from '../../services/api';

import Input from '../UI/Input/Input';
import {choiceService} from  '../../services';
import Checkbox from 'react-checkbox-component'
const Choices = (props) => {
   
    let choices = ''
    let checked = props.answer !== 0 ? true : false;
    let answer=React.useState(props.answer);
    let titleArray=["0","A","B","C","D"];
    //let selectedAnswer=React.useState(props.selectedAnswer);
  


        // let arrayChoices=[];
        //     let promises=[];
        //     useEffect(()=> {     
            
        //     api.get('/option/question/'+ props.choices)
        //     .then((res) => {  setArray(res.data); 
        // });

        //     }
            
        //     ,[]); 


console.log(props)

    if(!props.viewer) {
      
     
   
        console.log(props.answer);
        choices = [1, 2, 3, 4].map(i => {
            return (
                <div key={i}>
                  <p >{titleArray[i]})</p>

                    <Input 
                        inputType="text" 
                        changed={(event) => props.changed(event, i)}
                        value={props.value.length >= i ? props.value[i-1] : ""}
                    />
                {/* <Input inputType="checkbox" key={i} changed={() => props.clicked(i)}  checked={i==props.answer? true : false} value={i}/>
                     */}
                    <Checkbox size="small" className="checkbox" isChecked={props.value[i-1]==props.answer? true : false} onChange={() => props.clicked(props.value.length >= i ? props.value[i-1] : "")} value={props.value.length >= i ? props.value[i-1] : ""}
                      />
                   
{/*                 
                     <Input inputType="checkbox"
                     changed={() => props.clicked(i)}
                     value={i}
                     id={props.answer}
                     name={props.answer}
                     checked={i==answer? true : false}
                     
                    
                    
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
      
         choices = props.choices.map((choice) => {
            // const classNames = props.selected === choice
            //                     ? [classes.Choice, classes.selected].join(' ')
            //                     : classes.Choice;
           
           
             let isCheck=false;
             if(choice.id==props.answer){
                    isCheck=true;
                }
               
             let backgroundcolor="#FFFFFF";
             if(props.score){
            
             if(choice.id==props.correct){
                 backgroundcolor="#7CFC00";
             }
             else if(props.answer!=props.correct && choice.id==props.answer){
                 backgroundcolor="#FF0000";
             }
             else{
                  backgroundcolor="#FFFFFF";
             }
             
            
               } 
                
            return (
                <div className="viewChoice">
                {/* <Input inputType="checkbox"/> */
               
                }
                <Checkbox size="small" className="form-check" isChecked={isCheck} backgroundColor={backgroundcolor}   onChange={() => props.clicked(choice.id,props.questionIndex)}/>
                <p  style={{backgroundColor:backgroundcolor}} key={choice.id} className="Choices">{titleArray[sno++]}) {choice.choice}</p>
              
           </div>
            );
        });
    }
    return (
        <div className="Choices">
            {/* {!props.viewer ? <label>Choices</label> : null } */}
            {choices}
        </div>
    );
    
}

export default Choices;