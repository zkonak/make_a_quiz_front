import React, { Component } from 'react';
import   './Dashboard.css';
import Button from '../../components/UI/Button/Button';
import UserQuizzes from '../../components/UserQuizzes/UserQuizzes';
import H2 from '../../components/PageHeading/PageHeading';


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
                <div className="Dashboard">
                    <H2>Dashboard</H2>
                    {/* { <UserQuizzes 
                      
                        userId={this.props.userId}
                        quizViewType="created"
                        className="qc"
                        titleStyle={{ backgroundColor: '#ffd241' }}
                        label="Quiz created by You"
                        viewType="created"
                    /> }
                    { <UserQuizzes 
                      
                        userId={this.props.userId}
                        quizViewType="took"
                        className="qt"
                        label="Quiz took by You"
                        viewType="took"
                    /> } */}
                    <div className="ButtonGroup">
                        <Button clicked={this.onClickTakeQuizHandler} >Take Quiz</Button>
                        <Button clicked={this.onClickCreateQuizHandler} btnType="cta">Create Quiz</Button>
                    </div>
                </div>
            );
        }
        return body;
    }
}



export default Dashboard;