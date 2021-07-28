import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import './QuizLists.css';
import NewTabIcon from '../../assets/open-in-new-tab.png';

import Select from '../../components/UI/Select/Select';
import Button from '../../components/UI/Button/Button';
import Alert from '../../components/UI/Alert/Alert';
import H2 from '../../components/PageHeading/PageHeading';
import Table from '../../components/Table/Table';
import {quizService,userService}  from '../../services';


class QuizLists extends Component {
    state = {
        quizzes: [],
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
       await this.fetchData(this.state.limitStart, this.state.completeSortyBy, this.state.filterBy);
    }

    fetchData =async (limitStart, orderBy, filterBy) => {
      
        try{
           const response =  await quizService.getAll();
         
        //    try{
        //        response.data.forEach(async(element) => {
                  
        //             const userResponse=await userService.getOne(element.userId);
        //             element.username=userResponse.data.name+' '+userResponse.data.lastname;
                  
        //        });

              
        //    }catch(error){
        //         console.log(error);
        //        this.setState({message: error.response.data.message });
        //    }
       setTimeout(() => {
            this.setState(prevState => ({
                    quizzes: response.data,
                    
                }));
       }, 1000);
           

                console.log(this.state.quizzes)
        } catch(e) {
            console.log(e);
            this.setState({message: e.response.data.message });
        }


     
              
    }

    filterSelectChangeHandler = event => {
        const value = event.value;
        
    }

    sortSelectChangeHandler = event => {
        const value = event.value;
        
    }

    onTableHeaderClickHandler = sortby => {
       
       
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
            accessor: 'User.firstname',
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
                          <Link to={`/quiz/${row.row.original.id}`}><img src={NewTabIcon} alt="see Quiz"/></Link>)
         }
           

        ]
       
  )



        let sortByOptions = [];
       

        let body =''
        
            body = (
                
                <>
                    <H2>Available Quizzes</H2>
                    <div className="selectCont">
                        <div>
                            <label>Filter By</label>
                            {
                                this.state.quizzes.length !== 0
                                ? <Select
                                    changed={this.filterSelectChangeHandler}
                                    defaultValue={this.state.filterBy}
                                    options={[{value: "All", label: "All"}].concat(this.state.languages)}
                                    isSearchable={true}
                                  />
                                : null
                            }
                        </div>
                        <div>
                            <label>Sort By</label>
                            <Select
                                changed={this.sortSelectChangeHandler}
                                defaultValue={this.state.completeSortyBy}
                                options={sortByOptions}
                                isSearchable={false}
                            />
                        </div>
                    </div>
                    <div className="TableCont">
                        {/* <table className="Table">
                            <thead>
                                <tr>
                                    {this.state.tableHeaders.map(head => {
                                        
                                        return <th 
                                                onClick={head !== 'Take Quiz' ? () => this.onTableHeaderClickHandler(head) : null}
                                                className='Take Quiz'
                                                key={head}
                                               
                                                >
                                                    {head.replace(/_/g, ' ')}
                                                </th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.quizzes.map(row => {
                                   
                                    let body = null;
                                   
                                    if(row['title'] === this.state.filterBy || this.state.filterBy === 'select' || this.state.filterBy === 'All') {
                                        body = (
                                            <tr key={row['id']}>
                                                <td>{row['title']}</td>
                                                <td>{row['User.firstname']+' '+row['User.lastname']}</td>
                                                <td>{row['createdAt']}</td>
                                                <td>{row['minScore']}</td>
                                                <td><Link to={`/quiz/${row['id']}`}><img src={NewTabIcon} alt="Take Quiz"/></Link></td>
                                            </tr>
                                        );
                                    }
                                    return body;
                                })}
                            </tbody>
                        </table> */}
                          <Table columns={columns} 
                         data={this.state.quizzes} />
                    </div>
                    </>
             
            );
       
        return (
            <div className="QuizLists">
            
                {body}
            </div>
        );
    }
}



export default QuizLists;