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

const getBook = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
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
  getBook,
  addBook,
};
