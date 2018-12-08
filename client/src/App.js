import React from 'react';
import BookList from './components/BookList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client} >
        <div className="App">
          <header className="App-header">
            GRAPHQL COURSE
          </header>
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
