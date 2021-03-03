import Navbar from './Components/Navbar';
import UserContextProvider from './Context/userContext';
import Index from './Components/Index';




import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import LogIn from './Components/LogIn';
import Register from './Components/Register';
import Report from './Components/Report';



function App() {
  return (
    <UserContextProvider>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Index/>
          </Route>
          <Route exact path="/report">
            <Report/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/login">
            <LogIn/>
          </Route>
          <Redirect to="/"/>
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
