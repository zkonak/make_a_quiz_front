import React, { Component } from 'react';

//import  './Home.css';
import questionMark from '../../assets/question-mark-icon.png';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems'
import Button from '../../components/UI/Button/Button';
import image from "../../assets/jason-leung-D4YrzSwyIEc-unsplash.jpg";
import Input from '../../components/UI/Input/Input';
import iconQuiz from '../../assets/pre-quiz-header-icon.png';
import iconPlayQuiz from '../../assets/play-quiz-icon.png';
import NewQuiz from  '../../components/NewQuizzes/NewQuiz'

class Home extends Component {
   
    onClickCreateQuizHandler = () => {
      
            this.props.history.push("/create-quiz");
        
    }

    render() {
        return (
            <div>
               <NavigationItems/> 
                <div className="Home">
                <div className="container">
                    <img src={image} className="img" /> 
                   
                   <Input type="text" className="txt" placeHolder="Search a quiz" />
                  </div>
                   
                <div className="icons">
                    <article className="article">
                         <img src={iconQuiz} alt="iconQuiz"/>
                         <p>Create your new quiz.   On your dashboard,click on "Create quiz".
                            </p>
                     </article>
                    <article className="article">
                         <img src={iconPlayQuiz} alt="iconQuiz"/>
                         <p>Create your new quiz.   On your dashboard,click on "Create quiz".
                        </p>
                    </article>
               
                </div>
                <div className="tableContainer">
                 <NewQuiz label="New Quizzes"/>
                </div>   
                   
                </div>
              
            </div>   
          
        );
    }
}



export default Home;