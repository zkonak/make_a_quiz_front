import React, { Component } from 'react';

import  './Home.css';
import questionMark from '../../assets/question-mark-icon.png';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems'
import Button from '../../components/UI/Button/Button';




class Home extends Component {
   
    onClickCreateQuizHandler = () => {
      
            this.props.history.push("/create-quiz");
        
    }

    render() {
        return (
            <div>
               <NavigationItems/> 
                <div className="Home">
                   
                    {/* <p>Easiest Way to Create or Take A Quiz</p> */}

                    
                    <div className="ButtonGroup">
                        <Button clicked={this.onClickTakeQuizHandler} >Take Quiz</Button>
                        <Button clicked={this.onClickCreateQuizHandler} btnType="cta">Create Quiz</Button>
                    </div>
                </div>
              
            </div>   
          
        );
    }
}



export default Home;