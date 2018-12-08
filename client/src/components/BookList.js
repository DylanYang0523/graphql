import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const bookQuery = gql`
  {
    books {
      name
    }
  }
`;

class BookList extends React.Component {
  render() {
    console.log('booklist', this.props);
    return (
      <React.Fragment>
        <ul id="book-list">
          <li>Book Name</li>
        </ul>
      </React.Fragment>
    );
  }
}

export default graphql(bookQuery)(BookList);
