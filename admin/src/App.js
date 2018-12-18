import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import ApolloClient from 'apollo-boost';
import buildOpenCrudProvider from 'ra-data-opencrud';
import { UserList, UserEdit, UserCreate } from './users';

const client = new ApolloClient({
  uri: 'http://localhost:4466'
});

class App extends Component {
  constructor() {
    super();
    this.state = { dataProvider: null };
  }

  componentDidMount() {
    buildOpenCrudProvider({ client }).then(dataProvider =>
      this.setState({ dataProvider })
    );
  }

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return <div>Loading</div>;
    }

    return (
      <Admin dataProvider={dataProvider}>
        <Resource
          name="User"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
        />
      </Admin>
    );
  }
}

export default App;
