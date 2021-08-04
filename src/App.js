import React, { Component } from 'react';
import { Route, BrowserRouter,Switch, withRouter} from 'react-router-dom';
import Home from './pages/Home/Home';
import CreateQuiz from './pages/CreateQuiz/CreateQuiz';
import Login from './pages/User/Login';
import SignUp from './pages/User/SignUp';
import Dashboard from './pages/Dashboard/Dashboard'
import QuizLists from './pages/QuizLists/QuizLists';
import Quiz from './pages/Quiz/Quiz';
import Score from './pages/Score/Score';
import Preview from './pages/Preview/Preview';
import CreatePdf from './pages/CreatePdf/CreatePdf';
import PrivateRoute from './PrivateRoute';
class App extends Component {


 render() {
   return(
  
         <BrowserRouter>
   
        <Switch>
           <Route path="/" exact component={Home} />
           <PrivateRoute path="/create-quiz" exact component={CreateQuiz} />
           <Route path="/login" component={Login} />
           <Route path="/signup" component={SignUp} />
           <PrivateRoute path="/dashboard" component={Dashboard} />
           <Route path="/available-quizzes" component={QuizLists} />
           <PrivateRoute path="/quiz/:quizId" component={Quiz} />
           <PrivateRoute path="/score/:userQuizId" component={Score} />
           <PrivateRoute path="/preview/:quizId" component={Preview} />
           <PrivateRoute path="/pdf/:quizId" component={CreatePdf} />
           
          </Switch>
           </BrowserRouter>
      );
 };
}
export default App;
  