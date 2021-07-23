import React, { Component } from 'react';
import './CreateQuiz.css';
import CloseIcon from '../../assets/close-icon.png';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import Select from '../../components/UI/Select/Select';
import Alert from '../../components/UI/Alert/Alert';
import Confirm from '../../components/UI/Confirm/Confirm';

import Question from '../../components/Question/Question';
import Choices from '../../components/Choices/Choices';
import H2 from '../../components/PageHeading/PageHeading';

import {quizService,questionService,choiceService} from '../../services'



class CreateQuiz extends Component {
 constructor(props){
     super(props);
      this.state = {
       id: '',
       title: '',
       userid:localStorage.getItem('userId'),
       active: {value:"A", label: "Active"},
       fontcolor: '',
       backgroundimage: '',
       icon: '',
       public: 'Y',
       scoremin: 0,
       timelimit: 0,
       currentQuestionNo:1,
       questions:[{  question: "",
                choices: [],
                answer: {value: "0", label: "Select Answer"}}],
       currentAnswer: {value: "0", label: "Select Answer"},
       currentQuestionValue: '',
       currentChoicesValues: [],
       message:""
     
    };
    this.onAnswerSelectHandler=this.onAnswerSelectHandler.bind(this);
    this.continueButtonClickHandler=this.continueButtonClickHandler.bind(this);
    this.options=[{value: "A", label: "Active"},{value: "P", label: "Passive"}];

     
 }  
   
   

    componentDidMount() {
       
        if(localStorage.getItem('questionsData')) {
            const questionsData = JSON.parse(localStorage.getItem('questionsData'));
        if(questionsData.length>0){
            this.setState(prevState => ({
             
                questions: questionsData.questions,
                currentQuestionValue: questionsData.questions[0].question,
                currentChoicesValues: questionsData.questions[0].choices,
                title: questionsData.title,
                active:questionsData.active,
                fontcolor:questionsData.fontcolor,
                backgroundimage:questionsData.backgroundimage,
                icon:questionsData.icon,
                public:questionsData.public,
                scoremin:questionsData.scoremin,
                timelimit: questionsData.timelimit,
                currentQuestionNo:1,
                currentAnswer: questionsData.questions[0].answer
               
            }));
           
            }

        }
    
    }
    

    async onOkButtonClickedHandler(okClicked){
       if(okClicked==1){

        try {
          
            const response =  await quizService.addQuiz(this.state.title,this.state.userid,this.state.active.value,this.state.fontcolor,this.state.scoremin,this.state.timelimit,this.state.questions);
            
           
            this.state.questions.forEach(async (element)=>{
          
            
            try {
                console.log( this.state.questions);
                  const questionResponse=await questionService.addQuestion(response.data.id,1,1,element.question);

           
                
                element.choices.forEach( async(choice)=>{
                    try {
                           const choicesResponse=await choiceService.addChoice(questionResponse.data.id,choice,1);
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
   


    onQuestionInputChangedHandler = event => {
        let questionValue = event.target.value;
        let newQuestions = this.state.questions.slice();
        if(newQuestions.length === 0) {
            newQuestions.push({
                question: questionValue,
                choices: [],
                answer: {value: "0", label: "Select Answer"}
            });
        } else {
            if(newQuestions.length >= this.state.currentQuestionNo) {
                newQuestions[this.state.currentQuestionNo-1] = {
                    question: questionValue,
                    choices: this.state.currentChoicesValues,
                    answer: this.state.currentAnswer
                };
            } else {
                newQuestions[this.state.currentQuestionNo-1] = {
                    question: questionValue,
                    choices: [],
                    answer: {value: "0", label: "Select Answer"}
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
                answer: {value: "0", label: "Select Answer"}
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
    
        var currentQuestionNo = this.state.currentQuestionNo;
        var newQuestions = this.state.questions;
        newQuestions[currentQuestionNo-1].answer = ca.value;
        this.setState(prevState => ({
            currentAnswer: ca.value,
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
                                    
                                }));
                               
                            } else {
                                 this.setState(prevState => ({
                                     currentQuestionNo: prevState.currentQuestionNo + 1,
                                     currentQuestionValue: '',
                                     currentChoicesValues: [],
                                     currentAnswer:{value: "0", label: "Select Answer"},
                                     
                                }));
                              
                             
                               
                         }
                           
                      
                        this.saveQuestions({
                                    questions: this.state.questions,
                                    userid: this.props.userid,
                                    id: this.state.id,
                                    title:this.state.title,
                                    active:this.state.active,
                                    fontcolor:this.state.fontcolor,
                                    backgroundimage:this.state.backgroundimage,
                                    icon:this.state.icon,
                                    public:this.state.public,
                                    scoremin: this.state.scoremin,
                                    timelimit: this.state.timelimit,
                        });
             
        }
        
    }

    onCloseIconClickHandler = () => {
       
    }

    render() {
       let body;
       
                body = (
                  
                  <>
                        <H2>Create Quiz</H2>
                        <div className="selectCont">
                         <p className="errorMessage">{this.state.message}</p>
                           

                        <label>Title</label>
                          <Input inputType="text" value={this.state.title}  changed={(e)=>this.setState({ title: e.currentTarget.value })}></Input>
                        <label>Active/ Passive</label>
                         <Select options={this.options}
                                 //defaultValue={this.state.active}
                                  defaultValue={this.state.active}
                                  changed={this.handleChangeSelect}
                                
                                    
                        />
                       
                        <label >Font Color</label>
                            <Input inputType="text" value={this.state.fontcolor} changed={(e)=>this.setState({ fontcolor: e.currentTarget.value })}></Input>
                     
                       
                            <label htmlFor="">BackGround Image</label>
                            <Input inputType="text" value={this.state.backgroundimage} changed={(e)=>this.setState({ backgroundimage: e.currentTarget.value })}></Input>
                        
                       
                            <label htmlFor="">Icon</label>
                            <Input inputType="text" value={this.state.icon} changed={(e)=>this.setState({ icon: e.currentTarget.value })}></Input>
                             <label htmlFor="">Score Minimum</label>
                            <Input inputType="text" value={this.state.scoremin} changed={(e)=>this.setState({ scoremin: e.currentTarget.value })}></Input>
                             <label htmlFor="">Time Limit</label>
                            <Input inputType="text" value={this.state.timelimit} changed={(e)=>this.setState({ timelimit: e.currentTarget.value })}></Input>
                           
                        </div>
                     
           
                        {this.state.currentQuestionNo !== 0 ? <p className="questionSNo">Q. <span>{this.state.currentQuestionNo}</span>/<span>{this.state.noOfQuestions}</span></p> : null}
                   
                        <Question
                            changed={this.onQuestionInputChangedHandler} 
                            value={this.state.currentQuestionValue}
                        />
                        <Choices
                            changed={this.onChoiceInputsChangedHandler} 
                            //clicked={this.onAnswerSelectHandler} 
                            // answer={this.state.currentAnswer}
                            value={this.state.currentChoicesValues}
                            
                        />
                        <Select options={[{value: "0", label: "Select Answer"},{value: "1", label: "1"},{value: "2", label: "2"},{value: "3", label: "3"},{value: "4", label: "4"}]}
                                
                                defaultValue={this.state.currentAnswer} 
                                changed={e => this.onAnswerSelectHandler(e)}
                                    
                        />
                     </>
                   
                );
            
    

        return (
           
            <>
               
                <div className="CreateQuiz">
                    {body}
                    {
                     
                         <div className="Buttons">
                           
                            <Button btnType="cta" clicked={this.continueButtonClickHandler} className="quiz-continue-btn" >Continue</Button>
                            <Button disabled={this.state.currentQuestionNo > 0 ? false : true} btnType="cta" clicked={this.previousButtonClickHandler} className="quiz-prev-btn" >Previous</Button>
                    </div>
                  
                    }
                </div>
               
                 <Confirm onOkClicked={()=>this.onOkButtonClickedHandler(1)} onCancelClicked={()=>this.onCancelButtonClickedHandler(1)}>{this.props.confirmMsg}</Confirm>
                   
                
                </>
            
        );
    }
}





export default CreateQuiz;