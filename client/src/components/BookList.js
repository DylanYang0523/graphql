import React from 'react';
import { graphql } from 'react-apollo';
import { getBookList } from '../queries/query';

class BookList extends React.Component {
  _renderBooks() {
    const { data, updateCurrentBookId } = this.props;
    if (data.loading || !data.books) {
      return (<div>Loading...</div>);
    }
    return (
      data.books.map(book => {
        return (
          <li key={book.id} onClick={() => updateCurrentBookId(book.id)}>{book.name}</li>
        )
      })
    );
  }
  render() {
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
