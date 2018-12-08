import React from 'react';
import BookList from './components/BookList';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          GRAPHQL COURSE
        </header>
        <BookList />
      </div>
    );
  }
}

export default App;
