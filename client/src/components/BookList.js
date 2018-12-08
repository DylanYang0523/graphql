import React from 'react';
import { graphql } from 'react-apollo';
import { getBookList } from '../queries/query';

class BookList extends React.Component {
  _renderBooks() {
    const { data } = this.props;
    if (data.loading) {
      return (<div>Loading...</div>);
    }
    return (
      data.books.map(book => {
        return (
          <li key={book.id}>{book.name}</li>
        )
      })
    );
  }
  render() {
    console.log('booklist', this.props);
    return (
      <React.Fragment>
        <ul id="book-list">
          {this._renderBooks()}
        </ul>
      </React.Fragment>
    );
  }
}

export default graphql(getBookList)(BookList);
