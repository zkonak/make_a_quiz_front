import React, { Component,useEffect, useState}  from 'react';

import { Redirect } from 'react-router-dom';



import  './Quiz.css';
import PreQuizIcon from '../../assets/pre-quiz-header-icon.png';
import CounterCompleteIcon from '../../assets/times-up-icon.png';

import Question from '../../components/Question/Question';
import Choices from '../../components/Choices/Choices';
import Button from '../../components/UI/Button/Button';

import Alert from '../../components/UI/Alert/Alert';
import Confirm from '../../components/UI/Confirm/Confirm';


import {quizService,questionService,choiceService} from  '../../services';



class Quiz extends Component {
constructor(props){
 super(props);
    this.state = {
        quizId: '',
        title: '',
        timer: '',
        questions: [],
        currentSelectedAnswer: '',
        currentSelectedQuestionId: '',
        currentQuestionsNumber:0,
        preQuizInfo: [
                ],
        message:''
    }
    }


       
          

 
       async componentDidMount(){
          
        const quizId = this.props.match.params.quizId;
       
         await this.fetchData(quizId);
       
     
       
        }

        fetchData =async (quizId) => {
          
        try{
              const responseQuiz=await quizService.getOne(quizId);
           
           try{

            console.log(quizId);
             const response =await questionService.getQuestions(quizId);
             response.data.forEach(async (element) => {
                 const responseChoices =await choiceService.getChoices(element.id);
                 element.choices=responseChoices.data;
                 console.log(element)
             });
             
         
              this.setState(prevState =>({
                            timer: parseFloat(responseQuiz.data.timelimit),
                            questions: response.data,
            }));  

            console.log(response);    
        }catch(error){
            console.log(error);
         //  this.setState({message: error.responseChoices.data.message });
        }

          

         }catch(err){
                console.log(err);
             //  this.setState({message: err.response.data.message });
           }

     }

  

     onButtonContinueClickedHandler = () => {
       
    }

    onAnswerSelectedHandler = selected => {
        let arrayQuestions=this.state.questions;
        arrayQuestions[this.state.currentQuestionsNumber].selectedAnswer=selected;
        this.setState(prevState => ({
            currentSelectedAnswer: selected,
            currentSelectedQuestionId: prevState.questions[this.state.currentQuestionsNumber].questionId,
            questions:arrayQuestions
        }));

        
       
    }




    onQuitButtonClickHandler = () => {
        this.props.onShowConfirm('Please Confirm to Quit the Quiz');
    }

     onSeeScoreButtonClick = () => {
        this.props.onSeeScore(this.props.answers, this.props.quizId, this.props.userId);
    }

     onCompleteCounterHandler = (event) => {
        this.props.onCounterComplete();
    }

    render() {
        let body = '';
        let body2='';
        
          const items = []       
        if(this.state.questions.length !== 0  ){
        
            body = (
                
                    <p className="Language">{this.state.title} Quiz</p>);
                    
                      
               
                    
             
                  { this.state.questions.map((element,i) => {
                            let questionNo=i+1;
                    items.push(      
                            <div key={i}>
                            <Question 
                                viewer 
                                title={element.question} 
                                questionNo={questionNo}
                                className="questionViewer" /> 

                              <Choices 
                                viewer 
                                choices={element.id} 
                                className="choicesViewer" />  
                               
                                </div>
                       )})
                       }
                      
                             
                       
                 
                  
           
           
       }

    
        return (
            <div className="Quiz">
                {body}
                <div className="Body">
                {items}
                </div>
                 <div className="ButtonGroup">
                        <Button btnType="nimp" clicked={this.onQuitButtonClickHandler} >Quit</Button>
                        <Button btnType="cta" clicked={this.onButtonContinueClickedHandler} >Continue</Button>
                    </div>
               
                    <Confirm>{this.props.confirmMsg}</Confirm>
                  
                
            </div>
        );
    }
}




export default Quiz;