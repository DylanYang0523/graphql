import { gql } from 'apollo-boost';

const getAuthorList = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getBookList = gql`
  {
    books {
      name
      id
    }
  }
`;

const addBook = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export {
  getAuthorList,
  getBookList,
  addBook,
};
