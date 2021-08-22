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
import Footer from '../../components/Footer/Footer';
class Home extends Component {
    state={
        search:""
    }
   
    onClickCreateQuizHandler = () => {
      
            this.props.history.push("/create-quiz");
        
    }

    onSearchTextHandler=event=>{
        this.setState({search:event.target.value})
    }
      onSearchHandler = event => {
       
       this.props.history.push("/available-quizzes/"+this.state.search);
   
    }

    render() {
        return (
            <>
            <div>
               <NavigationItems/> 
                <div className="Home">
                <div className="container">
                    {/* <img src={image} className="img" />  */}
                   {/* <form onSubmit={this.onSearchHandler}> 
                   <Input type="text" className="txt"  changed={(e)=>this.onSearchTextHandler(e)} placeHolder="Search a quiz" />
                   <Button>Search</Button>
                   </form> */}
                  </div>
                   
                <div className="icons">
                    <article className="article">
                         <img src={iconQuiz} alt="iconQuiz"/>
                         <p>Create your new quiz.   On your dashboard,click on "Create quiz".
                            </p>
                     </article>
                    <article className="article">
                         <img src={iconPlayQuiz} alt="iconQuiz"/>
                         <p>Take your  quiz. Learn and enjoy!.
                        </p>
                    </article>
               
                </div>
                <div className="tableContainer">
                 <NewQuiz label="New Quizzes"/>
                </div>   
                   
                </div>
              
            </div>  
            <Footer/>
            </> 
          
        );
    }
}



export default Home;