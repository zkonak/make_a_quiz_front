import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NewTabIcon from '../../assets/open-in-new-tab.png';
import Alert from '../UI/Alert/Alert';

//import './UserQuizzes.css';
import {quizService,questionService,choiceService,userQuizService,userResponseService} from  '../../services';
import Table from '../../components/Table/Table';
import api from '../../services/api';

class QuizCreateView extends Component {
    state = {
        quizzes: [],
       
    }

  
        componentDidMount() {
        this.fetchDataHandler();
    }

    fetchDataHandler = async() => {
        try{
                      
            if(this.props.viewType=="created"){
             //quizService.getByUsername()
             api.get('/quiz/byuser/'+localStorage.getItem("userId"))
              .then( response=>{

                response.data.forEach((element) => {
                userQuizService.getAll(element.id).then(userQuizResponse=>{
                
                if(userQuizResponse.data){
                element.average=this.getAverageScore(userQuizResponse.data);
                }else{
                    element.average=0;
                }
                element.numbersofPlayers=userQuizResponse.data.length;
                }).catch(error=>{
                   console.log(error)
                })
               
               
             })
             setTimeout(() => {
              this.setState(prevState =>({quizzes:response.data}));
             },1000);
             
              }).catch(err=>{
            console.log(err)
             })
      
           
          
           
            
             }else{
               let  response=await userQuizService.getByUsername();
                this.setState(prevState =>({quizzes:response.data}));  
             }
           
        }catch(error){
            console.log(error);
        }
            
    }

    getAverageScore(data){
      let average=0;
      for (let index = 0; index < data.length; index++) {
        average = average+data[index].totalscore;
        
      }
      return (average/data.length).toString();
    }

   render() {
       let columns;
      if(this.props.viewType=="created"){
        columns = (
        [
          {
        
            Header: 'Quiz Title',
            accessor: 'title',
          },
          {
            Header: 'Number of players',
            accessor: 'numbersofPlayers',
          },
          {
            Header: 'Average Score',
            accessor: 'average',
          },
           {
             // <img src={NewTabIcon} alt="see Quiz"/>
            Header: "Quiz",
            Cell: row => (
                          <Link to={`/preview/${row.row.original.id}`}><img src={NewTabIcon} alt="see Quiz"/></Link>)
         }
           

        ]
       
  )
 }else{
       columns = (
        [
          {
        
            Header: 'Quiz Title',
            accessor: 'Quiz.title',
          },
          {
            Header: 'Score',
            accessor: 'totalscore',
          },
          {
            Header: 'Date',
            accessor: 'createdAt',
          },
             {
             // <img src={NewTabIcon} alt="see Quiz"/>
            Header: "Quiz",
            Cell: row => (
                          <Link to={`/score/${row.row.original.id}`}><img src={NewTabIcon} alt="see Quiz"/></Link>)
         }

        ]
       
  )
 }
      
        
        let body = '';
         console.log( this.state.quizzes)
            body = (
                <div className="UserQuizzes">
                    <p className="Title" style={this.props.titleStyle}>{this.props.label}</p>
                    <div className="TableCont">
                        <Table columns={columns} 
                         data={this.state.quizzes} />
                        {/* <Table> 
                            content={this.state.quizzes}
                            viewType={this.props.viewType}
                        </Table> */
                        
                        }
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