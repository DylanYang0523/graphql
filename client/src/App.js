import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client} >
        <div className="App">
          <h1 className="App-header">
            GRAPHQL COURSE
          </h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
