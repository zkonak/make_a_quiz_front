import React, { Component } from 'react';

import Alert from '../UI/Alert/Alert';
import { Link } from 'react-router-dom';
//import './Players.css';
import {quizService,questionService,choiceService,userQuizService,userResponseService} from  '../../services';
import Table from '../../components/Table/Table';
import api from '../../services/api';
import NewTabIcon from '../../assets/open-in-new-tab.png';

class NewQuiz extends Component {
    state = {
        quizzes: [],
       
    }

  
        componentDidMount() {
        this.fetchDataHandler();
    }

    fetchDataHandler = async() => {
        
            let arrayPlayers=[];   
            const response =  await quizService.getAll();
            response.data.map((e)=>{
              e.createdAt=e.createdAt.split('T')[0];
            })
            this.setState(prevState =>({quizzes:response.data}));
            console.log(response.data)
       
    }

   
   render() {
       let columns;
      
        columns = (
        [
          {
        
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Created By',
            accessor: 'User.lastname',
          },
          {
            Header: 'Created At',
            accessor: 'createdAt',
          },
          
          {
             // <img src={NewTabIcon} alt="see Quiz"/>
            Header: " Take Quiz",
            Cell: row => (
                          <Link to={`/quiz/${row.row.original.id}`}><img className="icon" src={NewTabIcon} alt="see Quiz"/></Link>)
         }])

      
        
        let body = '';
         
            body = (
                <div className="NewQuiz">
                    <p className="Title" style={this.props.titleStyle}>{this.props.label}</p>
                    <div className="TableCont">
                        <Table columns={columns} 
                         data={this.state.quizzes} />
                       
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




export default NewQuiz;