const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

// // dummy data
// var books = [
//   { name: 'name1', genre: 'genre1', id: '1', authorId: '2' },
//   { name: 'name2', genre: 'genre2', id: '2', authorId: '2' },
//   { name: 'name3', genre: 'genre3', id: '3', authorId: '1' },
//   { name: 'name4', genre: 'genre4', id: '4', authorId: '3' },
//   { name: 'name5', genre: 'genre5', id: '5', authorId: '3' },
// ];
// var authors = [
//   { name: 'John', age: 33, id: '1' },
//   { name: 'Dylan', age: 27, id: '2' },
//   { name: 'Cynthia', age: 26, id: '3' },
// ];

// models
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        return Author.findById({ _id: parent.authorId });
      }
    }
  })
});
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
        return Book.find({ authorId: parent._id });
      }
    }
  })
});

// the real query from user (interface)
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // code to get data from db / other source
        // return _.find(books, { id: args.id });
        return Book.findById({ _id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById({ _id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  // what does this name prop do?
  name: 'Mutationlala',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let authorInstance = new Author({
          name: args.name,
          age: args.age,
        });
        return authorInstance.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let bookInstance = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return bookInstance.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
