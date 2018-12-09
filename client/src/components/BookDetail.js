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
          <div className="term"><label>author:</label> {author.name}</div>
        }
        { author && author.books &&
          <React.Fragment>
            <div className="term">other books from {author.name} </div>
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
    if (!book) return <div className="hint">select a book from the list to check the detail...</div>;
    const author = book.author
    return (
      <div className="book-detail-ctn">
        <div className="term"><label>name:</label> {book.name}</div>
        <div className="term"><label>genre:</label> {book.genre}</div>
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
