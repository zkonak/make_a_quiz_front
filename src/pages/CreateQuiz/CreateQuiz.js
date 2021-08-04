import React, { Component } from 'react';
//import './CreateQuiz.css';
import CloseIcon from '../../assets/close-icon.png';
import nextIcon from '../../assets/next.png';
import prevIcon from '../../assets/Prev.png';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import Select from '../../components/UI/Select/Select';
import Alert from '../../components/UI/Alert/Alert';
import Confirm from '../../components/UI/Confirm/Confirm';

import Question from '../../components/Question/Question';
import Choices from '../../components/Choices/Choices';
import H2 from '../../components/PageHeading/PageHeading';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems'
import Picker from 'vanilla-picker';

import {quizService,questionService,choiceService} from '../../services'



class CreateQuiz extends Component {
 constructor(props){
     super(props);
      this.state = {
       id: '',
       title: '',
       userid:localStorage.getItem('userId'),
       fontcolor: '',
       backgroundcolor: '',
       scoremin: 0,
       currentQuestionNo:1,
       questions:[{  question: "",
                     choices: [],
                     answer:0,
                     score:0}],
       currentAnswer:0,
       currentQuestionValue: '',
       currentChoicesValues: [],
       message:"",
       currentScore:0
 
    };
 
   // this.onAnswerSelectHandler=this.onAnswerSelectHandler.bind(this);
    this.continueButtonClickHandler=this.continueButtonClickHandler.bind(this);
 };

   
   


    componentDidMount() {

//   const parentBasic = document.querySelector('#parent');
//   const popupBasic = new Picker(parentBasic);
//   popupBasic.onChange = function(color) {
//     parentBasic.style.backgroundColor = color.rgbaString;
//   }
       
        if(localStorage.getItem('questionsData')) {
            const questionsData = JSON.parse(localStorage.getItem('questionsData'));
        if(questionsData.length>0){
            this.setState(prevState => ({
             
                questions: questionsData.questions,
                currentQuestionValue: questionsData.questions[0].question,
                currentChoicesValues: questionsData.questions[0].choices,
                title: questionsData.title,
                fontcolor:questionsData.fontcolor,
                backgroundColor:questionsData.backgroundcolor,
                scoremin:questionsData.scoremin,
                currentQuestionNo:1,
                currentAnswer: questionsData.questions[0].answer,
                currentScore: questionsData.questions[0].score
               
            }));
           
            }

        }
    
    }
    

    async onOkButtonClickedHandler(okClicked){
       if(okClicked==1){

        try {
          
            const response =  await quizService.addQuiz(this.state.title,this.state.userid,this.state.fontcolor,this.state.backgroundcolor,this.state.scoremin,this.state.questions);
           
            this.state.questions.forEach(async (element)=>{
          
            
            try {
                console.log( this.state.questions);
                  const questionResponse=await questionService.addQuestion(response.data.id,element.question,element.score);

           
                
                element.choices.forEach( async(choice)=>{
                    try {
                           let correct=choice==element.answer?true:false
                           const choicesResponse=await choiceService.addChoice(questionResponse.data.id,choice,correct);
                    } catch (err) {
                         console.log(err);
                         this.setState({message: err.response.data.message });
                    }
             
                });
            } catch (error) {
                console.log(error)
                 this.setState({message: error.response.data.message });
            }
            });
            
            this.props.history.push('/dashboard');
        } catch(e) {
            console.log(e);
            this.setState({message: e.response.data.message });
        }





       }
    }

     onCancelButtonClickedHandler(cancelClicked){
         this.props.history.push('/dashboard');
      }
   
    onQuestionScoreChangedHandler= event => {
         let scoreValue = event.target.value;
        let newQuestions = this.state.questions.slice();
        if(newQuestions.length === 0) {
            newQuestions.push({
                question: this.state.currentQuestionValue,
                choices: this.state.currentChoicesValues,
                answer: this.state.currentAnswer,
                score:scoreValue
            });
        } else {
            if(newQuestions.length >= this.state.currentQuestionNo) {
                newQuestions[this.state.currentQuestionNo-1] = {
                    question: this.state.currentQuestionValue,
                    choices: this.state.currentChoicesValues,
                    answer: this.state.currentAnswer,
                    score: scoreValue
                };
            } else {
                newQuestions[this.state.currentQuestionNo-1] = {
                    question: this.state.currentQuestionValue,
                    choices: [],
                    answer:this.state.currentAnswer,
                    score:scoreValue
                };
            }
        }
        this.setState(prevState => ({
            currentScore: scoreValue,
            questions: newQuestions
        }));
       

    }

    onQuestionInputChangedHandler = event => {
        let questionValue = event.target.value;
        let newQuestions = this.state.questions.slice();
        if(newQuestions.length === 0) {
            newQuestions.push({
                question: questionValue,
                choices: [],
                answer: {value: "0", label: "Select Answer"},
                score:0
            });
        } else {
            if(newQuestions.length >= this.state.currentQuestionNo) {
                newQuestions[this.state.currentQuestionNo-1] = {
                    question: questionValue,
                    choices: this.state.currentChoicesValues,
                    answer: this.state.currentAnswer,
                    score: this.state.currentScore
                };
            } else {
                newQuestions[this.state.currentQuestionNo-1] = {
                    question: questionValue,
                    choices: [],
                    answer: this.state.currentAnswer,
                    score:0
                };
            }
        }
        this.setState(prevState => ({
            currentQuestionValue: questionValue,
            questions: newQuestions
        }));
       
    }

    onChoiceInputsChangedHandler = (event, index) => {
     
        var choiceValue = event.target.value;
        var currentQUestionNo = this.state.currentQuestionNo;
        var newQuestions = this.state.questions.slice();
        if(newQuestions.length < currentQUestionNo) {
            newQuestions[currentQUestionNo-1] = {
                question: "",
                choices: [],
                answer: {value: "0", label: "Select Answer"},
                score:0
            }
        }
        var newChoices = newQuestions[currentQUestionNo-1].choices.slice();

        if(newChoices[index-1] === undefined) {
            newChoices.splice(index-1, 0, choiceValue);
        } else {
            newChoices[index-1] = choiceValue;
        }

        if(newQuestions.length !== 0) {
            newQuestions[currentQUestionNo-1].choices = newChoices;
        }
        this.setState(prevState => ({
            questions: newQuestions,
            currentChoicesValues: newChoices
        }));
   
    }

    onAnswerSelectHandler =(ca) => {
    console.log(ca);
        var currentQuestionNo = this.state.currentQuestionNo;
        var newQuestions = this.state.questions;
        newQuestions[currentQuestionNo-1].answer = ca;
        this.setState(prevState => ({
            currentAnswer: ca,
            questions: newQuestions
        }));
       
    
    }

    previousButtonClickHandler = () => {
        if(this.state.currentQuestionNo >= 2) {
            this.setState(prevState => ({
                currentQuestionNo: prevState.currentQuestionNo - 1,
                currentQuestionValue: prevState.questions[this.state.currentQuestionNo-2].question,
                currentChoicesValues: prevState.questions[this.state.currentQuestionNo-2].choices,
                currentAnswer:prevState.questions[this.state.currentQuestionNo-2].answer,
                currentScore:prevState.questions[this.state.currentQuestionNo-2].score
            }));
          }
    }

    saveQuestions = questionsData => {
        localStorage.setItem('questionsData', JSON.stringify(questionsData));
    }




    continueButtonClickHandler = () => {
       
           
           
           
           
            if(this.state.currentQuestionNo === 0) {
                this.setState({
                    ...this.state,
                    creatingQuiz: true,
                    currentQuestionNo: 1,
                   


                });
                
            } else {
                if(this.state.questions.length > this.state.currentQuestionNo) {
                             
                                this.setState(prevState => ({
                                    currentQuestionNo: prevState.currentQuestionNo + 1,
                                    currentQuestionValue: this.state.questions[prevState.currentQuestionNo].question,
                                    currentChoicesValues: this.state.questions[prevState.currentQuestionNo].choices,
                                    currentAnswer: this.state.questions[prevState.currentQuestionNo].answer,
                                    currentScore: this.state.questions[prevState.currentQuestionNo].score
                                    
                                }));
                               
                            } else {
                                 this.setState(prevState => ({
                                     currentQuestionNo: prevState.currentQuestionNo + 1,
                                     currentQuestionValue: '',
                                     currentChoicesValues: [],
                                     currentAnswer:0,
                                     currentScore:0
                                     
                                }));
                              
                             
                               
                         }
                           
                      
                        this.saveQuestions({
                                    questions: this.state.questions,
                                    userid: this.props.userid,
                                    id: this.state.id,
                                    title:this.state.title,
                                  
                                    fontcolor:this.state.fontcolor,
                                    backgroundcolor:this.state.backgroundcolor,
                                  
                                    scoremin: this.state.scoremin
                                   
                        });
             
        }
        
    }

    onCloseIconClickHandler = () => {
       
    }

    render() {
       let body;
       
                body = (
                  
                  <>
                  
                       
                      

                          <label>Title</label>
                          <Input inputType="text" className="titleQuiz" value={this.state.title}  changed={(e)=>this.setState({ title: e.currentTarget.value })}></Input>
                        
                       
                        <div className="inputMain">
                         <p className="errorMessage">{this.state.message}</p>
                            <div class="inputs">  
                            <label htmlFor="">Score Minimum</label>
                            <Input inputType="text" value={this.state.scoremin} changed={(e)=>this.setState({ scoremin: e.currentTarget.value })}></Input>
                          </div> 
                         {/* 
                        <div class="inputs">  
                        <label >Font Color</label>

                            <Input inputType="text" value={this.state.fontcolor} changed={(e)=>this.setState({ fontcolor: e.currentTarget.value })}></Input>
                         
                        
                        
       
      
                         </div>
                        <div class="inputs">  
                       
                            <label htmlFor="">BackGround Color</label>
                             <Input inputType="text" value={this.state.backgroundcolor} changed={(e)=>this.setState({ backgroundcolor: e.currentTarget.value })}></Input> 

                          
       
     
                         </div>*/}
                          
                        </div>
                     
           
                      
                   <div className="questionMain">
                   
                    <button disabled={this.state.currentQuestionNo > 0 ? false : true} btnType="cta" onClick={this.previousButtonClickHandler} className="prev" ></button>
                        <div className="question">
                          {this.state.currentQuestionNo !== 0 ? <p className="questionSNo">Question. <span>{this.state.currentQuestionNo}</span>/<span>{this.state.noOfQuestions}</span></p> : null}
                        <Question
                            changed={this.onQuestionInputChangedHandler} 
                            value={this.state.currentQuestionValue}
                        />
                        <Choices
                            changed={this.onChoiceInputsChangedHandler} 
                            clicked={this.onAnswerSelectHandler.bind(this)} 
                            answer={this.state.currentAnswer}
                            value={this.state.currentChoicesValues}
                            correct={this.state.CurrentCorrects}
                        
                            
                        />
                         <label >Question Score</label>
                            <Input inputType="text" className="score" value={this.state.currentScore} changed={this.onQuestionScoreChangedHandler}></Input>
                     </div>
                      <button btnType="cta" onClick={this.continueButtonClickHandler} className="next" ></button>
                     </div>
                        
                     </>
                   
                );
            
    

        return (
           
            <>
               <NavigationItems/>
                <div className="CreateQuiz">
                    {body}
                    {
                     
                    //      <div className="Buttons">
                           
                    //         <button btnType="cta" onClick={this.continueButtonClickHandler} className="next" ></button>
                    //         <button disabled={this.state.currentQuestionNo > 0 ? false : true} btnType="cta" onClick={this.previousButtonClickHandler} className="prev" ></button>
                    // </div>
                  
                    }

                 <Confirm className="confirm" onOkClicked={()=>this.onOkButtonClickedHandler(1)} onCancelClicked={()=>this.onCancelButtonClickedHandler(1)}>{this.props.confirmMsg}</Confirm>
                
                </div>
                  
                
                </>
            
        );
    }
}





export default CreateQuiz;