import React, { Component}  from 'react';

import { Redirect } from 'react-router-dom';



import  './Score.css';

import Question from '../../components/Question/Question';
import Choices from '../../components/Choices/Choices';
import Button from '../../components/UI/Button/Button';
import Alert from '../../components/UI/Alert/Alert';
import Confirm from '../../components/UI/Confirm/Confirm';


import {quizService,questionService,choiceService,userQuizService,userResponseService} from  '../../services';



class Score extends Component {
constructor(props){
 super(props);
    this.state = {
        userQuiz:{},
        questions: [],
        message:'',
        userQuizId:'',
        quiz:{}
    }
    }


       
    
    getCorrectChoiceId = ()=> {
         let arrayQuestions=this.state.questions;
          arrayQuestions.map((element,i)=>{
              const foundCorrect = element.Choices.find(correct => correct.correct===1);
              arrayQuestions[i].correctAnswer=foundCorrect.id;
          });

        
         this.setState(prevState => ({
               questions:arrayQuestions
       
         }));
    }  

 
       async componentDidMount(){
          
        const userQuizId = this.props.match.params.userQuizId;
        console.log(userQuizId);
         this.setState(prevState =>({userQuizId:userQuizId}));
          await this.fetchData(userQuizId);
        }

         fetchData =async (userQuizId) => {
          
         try{
               const responseUserQuiz=await userQuizService.getOne(userQuizId);
               
               const response =await questionService.getQuestions(responseUserQuiz.data.quizId);
               response.data.forEach(async (element) => {
                 const responseResponses =await userResponseService.getOne(userQuizId,element.id);
                 element.selectedAnswer=responseResponses.data.choiceId;
                 element.selectedScore=responseResponses.data.score;
             });
           
            const responseQuiz=await quizService.getOne(responseUserQuiz.data.quizId);
         
              this.setState(prevState =>({
                            userQuiz:responseUserQuiz.data,
                            questions: response.data,
                            quiz:responseQuiz
                          
            })); 

            this.getCorrectChoiceId(); 

           
        // }catch(error){
        //     console.log(error);
        //  //  this.setState({message: error.responseChoices.data.message });
        // }

          

         }catch(err){
                console.log(err);
             //  this.setState({message: err.response.data.message });
           }

     }

     

 

  




    onOkButtonClickedHandler=()=>{
  
        this.props.history.push('/dashboard');
    

    }
  

    render() {
        let body = '';
        let body2='';
        
          const items = []   

        if(this.state.questions.length !== 0  ){
          console.log(this.state.questions);
            body = (
                
                   <div> <p className="Language">{this.state.quiz.title} Quiz</p>
                    <p className="Language"> Your total score is {this.state.userQuiz.totalscore}</p></div>
                    
                    
                    );
                  
             
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
                                className="choicesViewer"
                                questionIndex={i}
                                //clicked={this.onAnswerSelectedHandler}
                                answer={element.selectedAnswer}
                                correct={element.correctAnswer}
                                score="1"
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




export default Score;