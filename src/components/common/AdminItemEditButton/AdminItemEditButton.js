import React from 'react';
import PropTypes from 'prop-types';
import { AdminItemEditButtonStyled, AddIcon } from './AdminItemEditButton.styles';

const AdminItemEditButton = ({ onClick }) => {
  return (
    <AdminItemEditButtonStyled onClick={onClick}>
      Edit
      <AddIcon icon="edit" />
    </AdminItemEditButtonStyled>
  );
};

AdminItemEditButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default AdminItemEditButton;
