import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  Filter,
  Create
} from 'react-admin';

const UserName = ({ record: { name } }) => (
  <span>
    User:
    {name ? `${name}` : '<unknown name>'}
  </span>
);

UserName.propTypes = {
  record: PropTypes.objectOf(PropTypes.string).isRequired
};

const UserFilter = props => (
  <Filter {...props}>
    <TextInput label="Search names" source="name_contains" alwaysOn />
  </Filter>
);

export const UserList = props => (
  <List filters={<UserFilter />} {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
    </Datagrid>
  </List>
);

export const UserEdit = props => (
  <Edit title={<UserName />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput optionText="name" source="name" />
      <TextInput optionText="email" source="email" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput optionText="name" source="name" />
      <TextInput optionText="email" source="email" />
    </SimpleForm>
  </Create>
);
