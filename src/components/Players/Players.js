import React, { Component } from 'react';

import Alert from '../UI/Alert/Alert';
import { Link } from 'react-router-dom';
//import './Players.css';
import {quizService,questionService,choiceService,userQuizService,userResponseService} from  '../../services';
import Table from '../../components/Table/Table';
import Input from '../../components/UI/Input/Input';
import api from '../../services/api';
import NewTabIcon from '../../assets/Eye.png';

class Players extends Component {
    state = {
        players: [],
        search:[]
       
    }

  
        componentDidMount() {
        this.fetchDataHandler();
    }

    fetchDataHandler = () => {
        
            let arrayPlayers=[];   
            
            
             api.get('/quiz/byuser/'+localStorage.getItem("userId"))
              .then( response=>{
                console.log(response)
                response.data.map((element,i) => {
                  
                userQuizService.getByQuiz(element.id).then(userQuizResponse=>{
                userQuizResponse.data.map((data,index)=>{
                  data.createdAt=data.createdAt.split('T')[0];
                  if(data.userId!=localStorage.getItem("userId")){
                     arrayPlayers[index]=data;
                }
                
                })
                 
                
                }).catch(error=>{
                   console.log(error)
                })
                

              //  if(element.userId==localStorage.getItem("userId")){
              //       response.data.remove(i);
              //   }

               
             })
              
             setTimeout(() => {
          
              this.setState(prevState =>({players:arrayPlayers,search:arrayPlayers}));
             },1000);

             console.log(this.state.players);
             
              }).catch(err=>{
            console.log(err)
             })
      
           
          
           
            
            
           
       
            
    }
    onSearchHandler = event => {
       let players=this.state.players;
       let arrayFound=[];
     
       players.find((o, i) => {
       if ((o.User.firstname.toLowerCase()+' '+o.User.lastname.toLowerCase()).match(event.target.value.toLowerCase())) {
        arrayFound.push(o);
    }
    }
    ); 
    
      
      this.setState({search:arrayFound});
       
    }

   
   render() {
       let columns;
      
        columns = (
        [
          {
        
            Header: 'Firstname',
            accessor: 'User.firstname',
          },
          {
            Header: 'Lastname',
            accessor: 'User.lastname',
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
                          <Link to={`/score/${row.row.original.id}`}><img className="icon" src={NewTabIcon} alt="see Quiz"/></Link>)
         }])

      
        
        let body = '';
         console.log( this.state.players)
            body = (
                <div >
                    <p  className={this.props.titleStyle}>{this.props.label}</p>
                     <div className="selectCont">
                        
                            <Input type="text" changed={(e)=>this.onSearchHandler(e)}   placeHolder="Search by player" />
                     </div>
                    <div className="TableCont">
                        <Table columns={columns} 
                         data={this.state.search} 
                         value="5"/>
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




export default Players;