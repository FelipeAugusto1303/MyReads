import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom';
import Home from './components/Home/Home';
import Search from './components/Search/Search';

const App = () => {

  return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/search' component={Search}/>
            <Redirect to='/'/>
          </Switch>
        </Router>
        
      </div>
    )
  
}

export default App
