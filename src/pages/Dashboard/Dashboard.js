import React, { Component } from 'react';
//import   './Dashboard.css';
import Button from '../../components/UI/Button/Button';
import UserQuizzes from '../../components/UserQuizzes/UserQuizzes';
import H2 from '../../components/PageHeading/PageHeading';
import Players from '../../components/Players/Players';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems'
import NewQuizList from '../../components/UserQuizzes/NewQuizList';
import Footer from '../../components/Footer/Footer';
class Dashboard extends Component {
    

    onClickTakeQuizHandler = () => {
        this.props.history.push("/available-quizzes");
    }

    onClickCreateQuizHandler = () => {
        this.props.history.push("/create-quiz");
    }

    render() {
        let body = '';
        if(!this.props.newUser) {
            body = (
                <>
                <NavigationItems/>
                <div className="Dashboard">
                    
                    <div className="userQuizzes">
                      <div className="userQuiz1">
                    {  <UserQuizzes 
                       quizViewType="created"
                        titleStyle="qc"
                        label="Quiz created by You"
                        viewType="created"
                    /> }
                    </div>
                     <div className="userQuiz2">
                    { <UserQuizzes 
                        titleStyle="qt"
                        quizViewType="took"
                        
                        label="Quiz taken by You"
                        viewType="took"
                    /> } 
                     </div>
                    </div>
                    <div className="Players">
                    <div className="Players1">
                    { <Players 
                      
                        titleStyle="pt"
                        label="Players"
                       
                    /> }
                    </div>
                     <div className="QuizList">
                    { <NewQuizList 
                      
                        titleStyle="pt"
                        label="Available Quizzes"
                        dashboard
                    /> }
                    </div> 
                    </div> 
                    
                    {/* <div className="ButtonGroup">
                        <Button clicked={this.onClickTakeQuizHandler} >Take Quiz</Button>
                        <Button clicked={this.onClickCreateQuizHandler} btnType="cta">Create Quiz</Button>
                    </div> */}
                </div>
                {/* <Footer/> */}
                </>
            );
        }
        return body;
    }
}



export default Dashboard;