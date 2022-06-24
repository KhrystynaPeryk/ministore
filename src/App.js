import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import { Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';

import Navbar from './components/Navbar/Navbar';
import CategoryPage from './components/CategoryPage/CategoryPage';
import CartPage from './components/CartPage/CartPage';
import DescriptionPage from './components/DescriptionPage/DescriptionPage';

class App extends Component {
  render() {
    return (
      <div className='main-container'>
          <Navbar />
          <Router>
            <Switch>
              <Route exact path='/' render={() => (<Redirect to='/ministore' />)} />
              <Route exact path='/ministore' component={CategoryPage} />
              <Route exact path='/ministore/product' component={DescriptionPage} />
              <Route exact path='/cart' component={CartPage} />
            </Switch>
          </Router>
      </div>
    )
  }
}

export default App;
