import React from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorList, addBook, getBookList } from '../queries/query';

class AddBook extends React.Component {
  constructor() {
    super();
    this._submitForm = this._submitForm.bind(this);
    this.state = {
      name: null,
      genre: null,
      authorId: null,
    };
  }
  _submitForm(e) {
    e.preventDefault();
    const { addBook } = this.props;
    const { name, genre, authorId } = this.state;
    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{
        query: getBookList
      }]
    });
  }
  _renderAuthors() {
    const { getAuthorList } = this.props;
    if (getAuthorList.loading || !getAuthorList.authors) {
      return (<option disabled>loading...</option>);
    }
    return (
      getAuthorList.authors.map(author => {
        return (<option key={author.id} value={author.id}>{author.name}</option>)
      })
    );
  }
  render() {
    return (
      <form id="add-book" onSubmit={this._submitForm}>
        <div className="basic-input">
          <label>book name: </label>
          <input placeholder="enter a book name..." type="text" onChange={(e) => this.setState({ name: e.target.value })}/>
        </div>
        <div className="basic-input">
          <label>genre: </label>
          <input placeholder="enter genre type..." type="text" onChange={(e) => this.setState({ genre: e.target.value })}/>
        </div>
        <div className="basic-input">
          <label>author: </label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
            <option hidden>select an author...</option>
            {this._renderAuthors()}
          </select>
        </div>
        <button id="add-btn">+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorList, { name: "getAuthorList"}),
  graphql(addBook, { name: "addBook" }),
)(AddBook);
