import React, { Component } from 'react';
import { Route, BrowserRouter,Switch, withRouter} from 'react-router-dom';
import Home from './pages/Home/Home';
import CreateQuiz from './pages/CreateQuiz/CreateQuiz';
import Login from './pages/User/Login';
import SignUp from './pages/User/SignUp';
import Dashboard from './pages/Dashboard/Dashboard'
import QuizLists from './pages/QuizLists/QuizLists';
import Quiz from './pages/Quiz/Quiz';
class App extends Component {


 render() {
   return(
  
         <BrowserRouter>
   
        <Switch>
           <Route path="/" exact component={Home} />
           <Route path="/create-quiz" exact component={CreateQuiz} />
           <Route path="/login" component={Login} />
           <Route path="/signup" component={SignUp} />
           <Route path="/dashboard" component={Dashboard} />
           <Route path="/available-quizzes" component={QuizLists} />
           <Route path="/quiz/:quizId" component={Quiz} />
           
          </Switch>
           </BrowserRouter>
      );
 };
}
export default App;
  