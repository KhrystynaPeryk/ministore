import React, {Component} from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import CategoryPage from './components/CategoryPage/CategoryPage';
import CartPage from './components/CartPage/CartPage';
import DescriptionPage from './components/DescriptionPage/DescriptionPage';
import Checkout from './components/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div className='main-container'>
        <Navbar />
          <Switch>
            <Route exact path='/' render={() => (<Redirect to='/ministore' />)} />
            <Route exact path='/ministore' component={CategoryPage} />
            <Route path='/ministore/product/:id' component={DescriptionPage} />
            <Route exact path='/ministore/cart' component={CartPage} />
            <Route exact path='/ministore/checkout' component={Checkout} />
            <Route path="*" render={() => (<Redirect to='/ministore' />)} />
          </Switch>
      </div>
    )
  }
}

export default App;
