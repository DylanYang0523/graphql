import React from 'react';
import { graphql } from 'react-apollo';
import { getBook } from '../queries/query';

class BookDetail extends React.Component {
  _renderAuthorBookList(books) {
    return books.map(book => {
      return <li key={book.id}>{book.name}</li>;
    });
  }
  _renderAuthorInfo(author) {
    return (
      <React.Fragment>
        { author && author.name &&
          <div>Author: {author.name}</div>
        }
        { author && author.books &&
          <React.Fragment>
            <div>Other Books from {author.name} </div>
            <ul>
              {this._renderAuthorBookList(author.books)}
            </ul>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
  render() {
    const { data } = this.props;
    const { book } = data;
    if (!book) return <div>No book selected...</div>;
    const author = book.author
    return (
      <div>
        <h3>BookDetail</h3>
        <div>Name: {book.name}</div>
        <div>Genre: {book.genre}</div>
        {this._renderAuthorInfo(author)}
      </div>
    );
  }
}

export default graphql(getBook, {
  options: (props) => {
    return {
      variables: {
        id: props.currentBookId
      }
    }
  }
})(BookDetail);
