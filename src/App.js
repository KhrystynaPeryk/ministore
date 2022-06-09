import React, {Component} from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {gql} from '@apollo/client';

import Navbar from './components/Navbar/Navbar';
import CategoryPage from './components/CategoryPage/CategoryPage';
import CartPage from './components/CartPage/CartPage';
import DescriptionPage from './components/DescriptionPage/DescriptionPage';

const errorLink = onError(({graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      alert(`Graphql error ${message}`)
    });
  }
});
const link = from([
  errorLink,
  new HttpLink({uri: 'http://localhost:4000'})
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

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
        <ApolloProvider client={client}>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<CategoryPage />} />
            <Route path='/products/:id' element={<DescriptionPage />} />
            <Route path='/cart' element={<CartPage />} />
          </Routes>
      </ApolloProvider>
      </div>
    )
  }
}

export default App;
