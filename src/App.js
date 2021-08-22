import React, { Component } from 'react';
import { Route, BrowserRouter,Switch, withRouter} from 'react-router-dom';
import Home from './pages/Home/Home';
import CreateQuiz from './pages/CreateQuiz/CreateQuiz';
import UpdateQuiz from './pages/CreateQuiz/UpdateQuiz';
import Login from './pages/User/Login';
import Logout from './pages/User/Logout';
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
           <Route path="/login" component={Login} />
           <Route path="/signup" component={SignUp} />
           <Route path="/available-quizzes" component={QuizLists} />
           <PrivateRoute path="/create-quiz"  component={CreateQuiz} />
           <PrivateRoute path="/update-quiz/:quizId"  component={UpdateQuiz} />
           <PrivateRoute path="/dashboard" component={Dashboard} />
           <PrivateRoute path="/quiz/:quizId" component={Quiz} />
           <PrivateRoute path="/score/:userQuizId" component={Score} />
           <PrivateRoute path="/preview/:quizId" component={Preview} />
           <PrivateRoute path="/pdf/:quizId" component={CreatePdf} />
           <PrivateRoute path="/logout" component={Logout} />
          </Switch>
           </BrowserRouter>
      );
 };
}
export default App;
  