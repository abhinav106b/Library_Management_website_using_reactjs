import React,{Component} from 'react';
import './App.css';
import Main from './Components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Redirect} from 'react-router-dom'



class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="main-bg">
            <Switch>
              <Route path='/' component={Main} />
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
