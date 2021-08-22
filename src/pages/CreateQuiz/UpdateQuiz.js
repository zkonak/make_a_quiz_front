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
                     Choices: [],
                     answer:0,
                     score:0}],
       currentAnswer:0,
       currentQuestionValue: '',
       currentChoicesValues: [],
       currentQuestionId:"",
       message:"",
       currentScore:0
 
    };
 
   // this.onAnswerSelectHandler=this.onAnswerSelectHandler.bind(this);
    this.continueButtonClickHandler=this.continueButtonClickHandler.bind(this);
 };

   
   


    async componentDidMount() {

       
        if(localStorage.getItem('questionsData')) {
            const questionsData = JSON.parse(localStorage.getItem('questionsData'));
        if(questionsData.length>0){
            this.setState(prevState => ({
             
                questions: questionsData.questions,
                currentQuestionValue: questionsData.questions[0].question,
                currentChoicesValues: questionsData.questions[0].Choices,
                title: questionsData.title,
                fontcolor:questionsData.fontcolor,
                backgroundColor:questionsData.backgroundcolor,
                scoremin:questionsData.scoremin,
                currentQuestionNo:1,
                currentAnswer: questionsData.questions[0].answer,
                currentScore: questionsData.questions[0].score,
                currentQuestionId: questionsData.questions[0].id
               
            }));
           
            }

        }
           const quizId = this.props.match.params.quizId;
           this.setState(prevState =>({quizId:quizId}));
           console.log(quizId);
           await this.fetchData(quizId);
       
    
    }


        fetchData =async (quizId) => {
          
        try{
              const responseQuiz=await quizService.getOne(quizId);
           
           try{

            
             const response =await questionService.getQuestions(quizId);
            console.log(response);
            //  let arrayChoice=[];
            //  response.data[0].Choices.map(e=>{
            //      arrayChoice.push(e.choice);
            //  })

              
              this.setState(prevState =>({
                            id:responseQuiz.data.id,
                            title:responseQuiz.data.title,
                            questions: response.data,
                            currentQuestionValue: response.data[0].question,
                            currentChoicesValues: response.data[0].Choices,
                            currentQuestionId:response.data[0].id,
                            scoremin:responseQuiz.data.scoremin,
                            currentQuestionNo:1,
                            currentAnswer: response.data[0].answer,
                            currentScore: response.data[0].score
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

  

    
    

    async onOkButtonClickedHandler(okClicked){
       if(okClicked==1){
          this.setState({message:""});  
        if(this.state.title==null || this.state.title==""){
            this.setState({message:"Title is required"});
            return;
        
        } else if(this.state.questions.length==0){
            this.setState({message:"You must enter least 1 question"});
            return;
       
    }else{
         
            // this.state.questions.map((e,i)=>{
            //     let qno=i+1;
            //     // if(e.question==null || e.question==""){
            //     //     this.setState({message:"You must enter question no"+qno});
            //     // }
            //     console.log(e)
            //     if(e.answer==null || e.answer==""){
                    
            //         this.setState({message:"You must enter answer of question no "+qno});
            //         return;
            //     }
            //     if(e.score==null || e.score==""){
            //         this.setState({message:"You must enter score of question no "+qno});
            //         return;
            //     }

            // });
         
        try {
           
           if (this.state.message==""){
            const response =  await quizService.updateQuiz(this.state.id,this.state.title,this.state.userid,this.state.fontcolor,this.state.backgroundcolor,this.state.scoremin,this.state.questions);
           
            this.state.questions.forEach(async (element)=>{
          
            
            try {
                console.log( this.state.questions);
                  const questionResponse=await questionService.updateQuestion(element.id,response.data.id,element.question,element.score);

           
                
                element.Choices.forEach( async(choice)=>{
                    try {
                           //let correct=choice==element.answer?true:false
                           const choicesResponse=await choiceService.updateChoice(choice.id,questionResponse.data.id,choice.choice,choice.correct);
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
           }
        } catch(e) {
            console.log(e);
            this.setState({message: e.response.data.message });
        }
        



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
                Choices: this.state.currentChoicesValues,
                answer: this.state.currentAnswer,
                score:scoreValue,
                
            });
        } else {
            if(newQuestions.length >= this.state.currentQuestionNo) {
                newQuestions[this.state.currentQuestionNo-1] = {
                    question: this.state.currentQuestionValue,
                    Choices: this.state.currentChoicesValues,
                    answer: this.state.currentAnswer,
                    score: scoreValue,
                    id:this.state.currentQuestionId
                };
            } else {
                newQuestions[this.state.currentQuestionNo-1] = {
                    question: this.state.currentQuestionValue,
                    Choices: [],
                    answer:this.state.currentAnswer,
                    score:scoreValue,
                    id:this.state.currentQuestionId
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
                Choices: [],
                answer: {value: "0", label: "Select Answer"},
                score:0
            });
        } else {
            if(newQuestions.length >= this.state.currentQuestionNo) {
                newQuestions[this.state.currentQuestionNo-1] = {
                    question: questionValue,
                    Choices: this.state.currentChoicesValues,
                    answer: this.state.currentAnswer,
                    score: this.state.currentScore,
                    id:this.state.currentQuestionId
                };
            } else {
                newQuestions[this.state.currentQuestionNo-1] = {
                    question: questionValue,
                    Choices: [],
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

    onChoiceInputsChangedHandler = (event,object, index) => {
    
        var choiceValue = event.target.value;
        object.choice=choiceValue;
        var currentQUestionNo = this.state.currentQuestionNo;
        var newQuestions = this.state.questions.slice();
        if(newQuestions.length < currentQUestionNo) {
            newQuestions[currentQUestionNo-1] = {
                question: "",
                Choices: [],
                answer: {value: "0", label: "Select Answer"},
                score:0
            }
        }
        var newChoices = newQuestions[currentQUestionNo-1].Choices.slice();
  console.log(newChoices);
        if(newChoices[index-1] === undefined) {
            newChoices.splice(index-1, 0, object);
        } else {
            newChoices[index-1] = object;
        }

        if(newQuestions.length !== 0) {
            newQuestions[currentQUestionNo-1].Choices = newChoices;
        }
        this.setState(prevState => ({
            questions: newQuestions,
            currentChoicesValues: newChoices
        }));
   
    }

    onAnswerSelectHandler =(ca) => {
    
        var currentQuestionNo = this.state.currentQuestionNo;
        var newQuestions = this.state.questions;
        //newQuestions[currentQuestionNo-1].answer = ca;
        newQuestions[currentQuestionNo-1].Choices.find((o, i) => {
       if (o.id==ca.id) {
        newQuestions[currentQuestionNo-1].Choices[i].correct=1;
    }else{
        newQuestions[currentQuestionNo-1].Choices[i].correct=0;
    }
    });    
       console.log(newQuestions)
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
                currentChoicesValues: prevState.questions[this.state.currentQuestionNo-2].Choices,
                currentAnswer:prevState.questions[this.state.currentQuestionNo-2].answer,
                currentScore:prevState.questions[this.state.currentQuestionNo-2].score,
                currentQuestionId:prevState.questions[this.state.currentQuestionNo-2].id
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
                              console.log( this.state.questions[1]);
                                this.setState(prevState => ({
                                    currentQuestionNo: prevState.currentQuestionNo + 1,
                                    currentQuestionValue: this.state.questions[prevState.currentQuestionNo].question,
                                    currentChoicesValues: this.state.questions[prevState.currentQuestionNo].Choices,
                                    currentAnswer: this.state.questions[prevState.currentQuestionNo].answer,
                                    currentScore: this.state.questions[prevState.currentQuestionNo].score,
                                    currentQuestionId:this.state.questions[prevState.currentQuestionNo].id
                                    
                                }));
                               
                            } else {
                                 this.setState(prevState => ({
                                   message:"Last question"
                                     
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
                  
                       
                      <p class="message">{this.state.message}</p>

                          <label>Title</label>
                          <Input inputType="text" className="titleQuiz" value={this.state.title}  changed={(e)=>this.setState({ title: e.currentTarget.value })}></Input>
                        
                       
                        <div className="inputMain">
                        
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
                            update
                        
                            
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