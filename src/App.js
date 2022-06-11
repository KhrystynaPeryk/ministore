import React, {Component} from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

import Navbar from './components/Navbar/Navbar';
import CategoryPage from './components/CategoryPage/CategoryPage';
import CartPage from './components/CartPage/CartPage';
import DescriptionPage from './components/DescriptionPage/DescriptionPage';


// class App extends Component {
//   grab = () => {
//     client
//   .query({
//     query: gql`
//       query {
//         categories{products{
//             name}
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));
//   }
//   render() {
//     return (<ApolloProvider client={client}>
//       <h1>{this.grab()}</h1>
//     </ApolloProvider>)
//   }
// }

class App extends Component {
  render() {
    return (
      <div className='main-container'>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<CategoryPage />} />
            <Route path='/products/:id' element={<DescriptionPage />} />
            <Route path='/cart' element={<CartPage />} />
          </Routes>
      </div>
    )
  }
}

export default App;
