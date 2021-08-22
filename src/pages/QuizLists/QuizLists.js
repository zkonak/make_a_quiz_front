import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';


import NewTabIcon from '../../assets/open-in-new-tab.png';

import NewQuizList from '../../components/UserQuizzes/NewQuizList'
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems'

class QuizLists extends Component {
   

   async componentDidMount() {
      // this.setState({search:this.props.match.params.search})
      // await this.fetchData(this.state.limitStart, this.state.completeSortyBy, this.state.filterBy);
     //  console.log(this.state.search);
     

       
    }

  

    

    render() {

   

        let body =''
        
            body = (
                
                <>
                <NavigationItems/>
                <div class="QuizLists">
                   <NewQuizList/>
                    </div>
                    </>
             
            );
       
        return (
            <div>
            
                {body}
            </div>
        );
    }
}



export default QuizLists;