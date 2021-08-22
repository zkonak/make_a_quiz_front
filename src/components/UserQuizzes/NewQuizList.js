import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';


import NewTabIcon from '../../assets/open-in-new-tab.png';

import Select from '../../components/UI/Select/Select';
import Button from '../../components/UI/Button/Button';
import Alert from '../../components/UI/Alert/Alert';
import Input from '../../components/UI/Input/Input';
import H2 from '../../components/PageHeading/PageHeading';
import Table from '../../components/Table/Table';
import {quizService,userService}  from '../../services';
import Footer from '../../components/Footer/Footer';
class NewQuizList extends Component {
    state = {
        quizzes: [],
        searchQuizzes: [],
        //search:"",
        filterBy: 'select',
        sortBy: 'title',
        completeSortyBy: 'latest',
        tableHeaders: ['title', 'created_by', 'created_at', 'passing_score','Take Quiz'],
        currentOrder: {
            'title': '',
            'created_at': 'desc',
            
            
        },
        
    }

   async componentDidMount() {
      // this.setState({search:this.props.match.params.search})
       await this.fetchData(this.state.limitStart, this.state.completeSortyBy, this.state.filterBy);
     //  console.log(this.state.search);
     

       
    }

    fetchData =async (limitStart, orderBy, filterBy) => {
      
        try{
           const response =  await quizService.getAll();
            response.data.map((e,i)=>{
              e.createdAt=e.createdAt.split('T')[0];
            // if(localStorage.getItem("userId")){
            //     if(e.userId==localStorage.getItem("userId")){
            //         response.data.remove(i);
            //     }
            // }
              
            })
         
        
       setTimeout(() => {
            this.setState(prevState => ({
                    quizzes: response.data,
                    searchQuizzes: response.data,
                    
                }));
       }, 1000);
           

               
        } catch(e) {
            console.log(e);
            //this.setState({message: e.response.data.message });
        }


     
              
    }

    filterSelectChangeHandler = event => {
        const value = event.value;
        
    }

    sortSelectChangeHandler = event => {
        const value = event.value;
        
    }

    onSearchHandler = event => {
       let quizzes=this.state.quizzes;
       let arrayFound=[];
       
       quizzes.find((o, i) => {
       if (o.title.toLowerCase().match(event.target.value.toLowerCase())) {
        arrayFound.push(o);
    }
    });    
      
      this.setState({searchQuizzes:arrayFound});
       
    }

    

    render() {

    const     columns = (
        [
          {
        
            Header: 'Quiz Title',
            accessor: 'title',
          },
           {
            Header: 'Owner',
            accessor: 'User.lastname',
          },
          {
            Header: 'Creation Date',
            accessor: 'createdAt',
          },
          {
            Header: 'Passing Score',
            accessor: 'scoremin',
          },
           {
             // <img src={NewTabIcon} alt="see Quiz"/>
            Header: "Take Quiz",
            Cell: row => (
                          <Link to={`/quiz/${row.row.original.id}`}><img className="icon" src={NewTabIcon} alt="see Quiz"/></Link>)
         }
           

        ]
       
  )



        let sortByOptions = [];
       

        let body =''
        
            body = (
                
                <>
               
                <div>
                     <p className={this.props.titleStyle}>{this.props.label}</p>
                    <div className="selectCont">
                        
                            <Input type="text" changed={(e)=>this.onSearchHandler(e)}   placeHolder="Search a quiz" />
                    </div>
                    <div className="TableCont">
                      
                          <Table columns={columns} 
                         data={this.state.searchQuizzes} />
                    </div>
                    </div>
                {!this.props.dashboard ? (
                    <Footer/>):null}
                
                
                
                    </>

             
            );
       
        return (
            <>
           
            
                {body}
                
            
            
            </>
        );
    }
}



export default NewQuizList;