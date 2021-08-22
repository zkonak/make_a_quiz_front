import React, { Component } from 'react';
import  { Redirect } from 'react-router';

import { Link } from 'react-router-dom';
import ReactDom from 'react-dom';
import NewTabIcon from '../../assets/open-in-new-tab.png';
import DeleteIcon from '../../assets/Delete.png';
import UpdateIcon from '../../assets/Edit.png';
import EyeIcon from '../../assets/Eye.png';
import Alert from '../UI/Alert/Alert';

//import './UserQuizzes.css';
import {quizService,questionService,choiceService,userQuizService,userResponseService} from  '../../services';
import Table from '../../components/Table/Table';
import Input from '../../components/UI/Input/Input';
import api from '../../services/api';
import Popup from 'react-popup';

ReactDom.render(
    <Popup  className="mm-popup"
    btnClass="mm-popup__btn"
    closeBtn={true}
    closeHtml={null}
    defaultOk="Ok"
    defaultCancel="Cancel"
    wildClasses={false}
    escToClose={true} />,
    document.getElementById('popupContainer')
);
class QuizCreateView extends Component {
  constructor(props){
    super(props);
    this.props=props;
    this.state = {
        quizzes: [],
        searchQuizzes: [],
       
    }
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
                   
                 element.createdAt=element.createdAt.split('T')[0];
           
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
              this.setState(prevState =>({quizzes:response.data, searchQuizzes:response.data}));
             },1000);
             
              }).catch(err=>{
            console.log(err)
             })
      
           
          
           
            
             }else{
               userQuizService.getByUsername()
               .then( response=>{
                 response.data.map((e)=>{
                  e.createdAt=e.createdAt.split('T')[0];
                });
                 this.setState(prevState =>({quizzes:response.data, searchQuizzes:response.data})); 
               })
                
                // setTimeout(() => {
               
                //  },1000); 
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
      if(average){

      
      return parseFloat(average/data.length).toFixed(2).toString();
      }
      return 0;
    }

     onDelete(){
    
      <Redirect push to="/dashboard"/>
    }
    onSearchHandler = event => {
       let quizzes=this.state.quizzes;
       let arrayFound=[];
      if(this.props.viewType=="created"){
       quizzes.find((o, i) => {
       if (o.title.toLowerCase().match(event.target.value.toLowerCase())) {
        arrayFound.push(o);
    }
    }); 
      }else{
         quizzes.find((o, i) => {
       if (o.Quiz.title.toLowerCase().match(event.target.value.toLowerCase())) {
        arrayFound.push(o);
    }
    }); 
      } 
      
      this.setState({searchQuizzes:arrayFound});
       
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
            Header: "View Quiz",
            Cell: row => (
                          <Link to={`/preview/${row.row.original.id}`}><img className="icon" src={EyeIcon} alt="see Quiz"/></Link>)
         },
         {
             // <img src={NewTabIcon} alt="see Quiz"/>
            Header: "Update Quiz",
            Cell: row => (
                          <Link to={`/update-quiz/${row.row.original.id}`}><img  className="icon" src={UpdateIcon} alt="see Quiz"/></Link>)
         },
         {
             // <img src={NewTabIcon} alt="see Quiz"/>
            Header: "Delete Quiz",
            Cell: row => (
                          <p onClick={(e)=>
                               Popup.create({
                         title: 'Warning!',
                      content: 'Are you sure you want to delete this Quiz? All plays belonging to this Quiz will be deleted.',
    buttons: {
        left: [{
            text: 'Cancel',
            className: 'danger',
            action: function () {
               Popup.close();
            }
        }],
        right: [ {
            text: 'Delete',
            className: 'success',
            action: async function () {
              const response=await quizService.delete(row.row.original.id);
              console.log(response)
             
            
              
              Popup.close();
               window.location.reload();

              
            
            
              
            }
        }]
    }
})}><img className="icon" src={DeleteIcon} alt="see Quiz"/></p>)
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
                          <Link to={`/score/${row.row.original.id}`}><img className="icon" src={EyeIcon} alt="see Quiz"/></Link>)
         }

        ]
       
  )
 }
      
        
        let body = '';
         
            body = (
                <div >
                    <p className={this.props.titleStyle}>{this.props.label}</p>
                     <div className="selectCont">
                        
                            <Input type="text" changed={(e)=>this.onSearchHandler(e)}   placeHolder="Search by title" />
                     </div>
                    <div className="TableCont">
                        <Table columns={columns} 
                         data={this.state.searchQuizzes}
                         value="5" />
                       
                        
                     
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