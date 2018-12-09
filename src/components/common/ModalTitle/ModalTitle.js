import React from 'react';
import PropTypes from 'prop-types';
import { ModalTitleContainer } from './ModalTitle.styles';

const ModalTitle = ({ title }) => {
  return (
    <ModalTitleContainer>
      <h1>{title}</h1>
      <span />
    </ModalTitleContainer>
  );
};

ModalTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default ModalTitle;
