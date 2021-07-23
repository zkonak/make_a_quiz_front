import React, { Component } from 'react';



import Alert from '../UI/Alert/Alert';

import './UserQuizzes.css';



class QuizCreateView extends Component {
    state = {
        quizzes: [],
       
    }

    componentDidMount() {
        this.fetchDataHandler();
    }

    fetchDataHandler = () => {
        //this.setState({quizzes:[{title:"title",date:"date"}]});
    }

   render() {
      
        
        let body = '';
       
            body = (
                <div className="UserQuizzes">
                    <p className="Title" style={this.props.titleStyle}>{this.props.label}</p>
                    <div className="TableCont">
                        <table 
                            content={this.state.quizzes}
                            viewType={this.props.viewType}
                        ></table>
                    </div>
                    
                </div>
            );
    
        return (
         <>
            {body}
        </>
          );
     }
    }




export default QuizCreateView;