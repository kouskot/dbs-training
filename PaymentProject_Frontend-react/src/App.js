import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import Landing from './components/Landing';
import Transaction from './components/Transaction';

function App() {
  return (
    <div className="App">
      <Router>
       <HeaderComponent /> 
      <div className="container">
            <Switch>
              <Route exact path="/" component={Landing}/>
            <Route exact path="/transaction" component={Transaction}/>
            <Route exact path="/date" component={Date} />
              {/* <Route exact path="/add-employee" component={AddEmployee}/>
              <Route path="/edit-employee/:id" component={AddEmployee} / */}
            </Switch>
      </div>
      <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
