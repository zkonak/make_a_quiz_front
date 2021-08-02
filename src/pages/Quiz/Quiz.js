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


import {quizService,questionService,choiceService,userQuizService,userResponseService} from  '../../services';



class Quiz extends Component {
constructor(props){
 super(props);
    this.state = {
        quizId: '',
        title: '',
        questions: [],
        message:''
    }
    }


       
          

 
       async componentDidMount(){
          
        const quizId = this.props.match.params.quizId;
        this.setState(prevState =>({quizId:quizId}));
         await this.fetchData(quizId);
       
     
       
        }

        fetchData =async (quizId) => {
          
        try{
              const responseQuiz=await quizService.getOne(quizId);
           
           try{

            
             const response =await questionService.getQuestions(quizId);
            //  response.data.forEach(async (element) => {
            //      const responseChoices =await choiceService.getChoices(element.id);
            //      element.choices=responseChoices.data;
            //      console.log(element)
            //  });
             
         
              this.setState(prevState =>({
                         
                            questions: response.data,
            }));  

           
        }catch(error){
            console.log(error);
         //  this.setState({message: error.responseChoices.data.message });
        }

          

         }catch(err){
                console.log(err);
             //  this.setState({message: err.response.data.message });
           }

     }

  

    

    onAnswerSelectedHandler = (selected,questionIndex)=> {
        let arrayQuestions=this.state.questions;
        arrayQuestions[questionIndex].selectedAnswer=selected;
        this.setState(prevState => ({
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

    onOkButtonClickedHandler=async()=>{
       const userQuiz={userId:localStorage.getItem("userId"),quizId:this.state.quizId};
       const userResponse=new Array();
       let scoreTotal=0;
        this.state.questions.map((element,i)=>{
            const foundCorrect = element.Choices.find(correct => correct.correct===1);
            
            userResponse.push({questionId:element.id});
            userResponse[i].choiceId=element.selectedAnswer;
           
            if(foundCorrect.id==element.selectedAnswer){
              
                scoreTotal=scoreTotal+element.score;
                element.correct=true;
                userResponse[i].score=element.score;
            }
            else{
               
                element.correct=false;
                userResponse[i].score=0;

            }
            userQuiz.totalscore=scoreTotal;

            
           
          
            
        })
         try{
                  const responseUserQuiz=await userQuizService.add(userQuiz);
                  
                   userResponse.map(async (element)=>{
                       element.userQuizId=responseUserQuiz.data.id;
                      

                         const responseUserResponse=await userResponseService.add(element);
                   });

                    this.props.history.push('/score/'+responseUserQuiz.data.id);

                


            }catch(error){
                console.log(error);
            }


         

    }
    onCancelButtonClickedHandler=()=>{
        this.props.history.push('/dashboard');
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
                                className="questionViewer"
                                score={element.score} /> 

                              <Choices 
                                viewer 
                                choices={element.Choices} 
                                className="form-check"
                                questionIndex={i}
                                clicked={this.onAnswerSelectedHandler}
                                answer={element.selectedAnswer}
                                />  
                               
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
                <Confirm onOkClicked={this.onOkButtonClickedHandler} onCancelClicked={this.onCancelButtonClickedHandler}>{this.props.confirmMsg}</Confirm>
                  
                
            </div>
        );
    }
}




export default Quiz;