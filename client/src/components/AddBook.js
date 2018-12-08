import React from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorList, addBook } from '../queries/query';

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
      }
    });
  }
  _renderAuthors() {
    const { getAuthorList } = this.props;
    if (getAuthorList.loading) {
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
        <div>
          <label>Book Name: </label>
          <input type="text" onChange={(e) => this.setState({ name: e.target.value })}/>
        </div>
        <div>
          <label>Genre: </label>
          <input type="text" onChange={(e) => this.setState({ genre: e.target.value })}/>
        </div>
        <div>
          <label>Author: </label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
            <option hidden>select</option>
            {this._renderAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorList, { name: "getAuthorList"}),
  graphql(addBook, { name: "addBook" }),
)(AddBook);
