import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const authorQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

class AddBook extends React.Component {
  _renderAuthors() {
    const { data } = this.props;
    if (data.loading) {
      return (<option disabled>loading...</option>);
    }
    return (
      data.authors.map(author => {
        return (<option key={author.id} value={author.id}>{author.name}</option>)
      })
    );
  }
  render() {
    return (
      <form>
        <div>
          <label>Book Name: </label>
          <input type="text"/>
        </div>
        <div>
          <label>Genre: </label>
          <input type="text"/>
        </div>
        <div>
          <select>
            <option hidden>select</option>
            {this._renderAuthors()}
          </select>
        </div>
      </form>
    );
  }
}

export default graphql(authorQuery)(AddBook);
