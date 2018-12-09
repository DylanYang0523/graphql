import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

class App extends React.Component {
  constructor() {
    super();
    this.updateCurrentBookId = this.updateCurrentBookId.bind(this);
    this.state = {
      currentBookId: null,
    }
  }
  updateCurrentBookId(id) {
    this.setState({ currentBookId: id });
  }
  render() {
    const { currentBookId } = this.state;
    return (
      <ApolloProvider client={client} >
        <div className="App">
          <h1 className="App-header">Reading List</h1>
          <BookList updateCurrentBookId={this.updateCurrentBookId}/>
          <BookDetail currentBookId={currentBookId}/>
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
