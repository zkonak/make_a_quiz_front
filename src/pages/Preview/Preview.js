import React, { Component}  from 'react';

import { Redirect } from 'react-router-dom';



//import  './Preview.css';

import Question from '../../components/Question/Question';
import Choices from '../../components/Choices/Choices';
import Button from '../../components/UI/Button/Button';
import Alert from '../../components/UI/Alert/Alert';
import Confirm from '../../components/UI/Confirm/Confirm';

import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems'

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
          
        const quizId = this.props.match.params.quizId;
        
         this.setState(prevState =>({quizId:quizId}));
          await this.fetchData(quizId);
        }

         fetchData =async (quizId) => {
          
         try{
                const responseQuiz=await quizService.getOne(quizId);
               
                const response =await questionService.getQuestions(responseQuiz.data.id);
            //    response.data.forEach(async (element) => {
            //      const responseResponses =await userResponseService.getOne(userQuizId,element.id);
            //      element.selectedAnswer=responseResponses.data.choiceId;
            //      element.selectedScore=responseResponses.data.score;
            //  });
           
           // const responseQuiz=await quizService.getOne(responseUserQuiz.data.quizId);
         setTimeout(() => {
             this.setState(prevState =>({
                           // userQuiz:responseUserQuiz.data,
                            questions: response.data,
                            quiz:responseQuiz.data
                          
            })) 
            this.getCorrectChoiceId()
         }, 100);
              

           

           
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
   
        this.props.history.push('/dashboard')
    }
  

    render() {
        let body = '';
        let body2='';
        
          const items = []   

        if(this.state.questions.length !== 0  ){
          console.log(this.state.quiz);
            body = (
                
                   <div> <h2>{this.state.quiz.title} Quiz</h2>
                    </div>
                    
                    
                    );
                  
             
                  { this.state.questions.map((element,i) => {
                            let questionNo=i+1;
                    items.push(      
                            <div key={i} className="question">
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
                                answer={element.correctAnswer}
                                correct={element.correctAnswer}
                                score="1"
                                />  
                               
                                </div>
                       )})
                       }
                      
                             
                       
                 
                  
           
           
       }

    
        return (
          <>
          <NavigationItems/>
            <div className="Quiz">
                {body}
                <div className="Body">
                {items}
                </div>
                {/* <Confirm onOkClicked={this.onOkButtonClickedHandler}>{this.props.confirmMsg}</Confirm>
                   */}
                    <button className="button primary save confirm" onClick={this.onOkButtonClickedHandler} >Go To Dashboard</button> 
                
            </div>
            </>
        );
    }
}




export default Score;