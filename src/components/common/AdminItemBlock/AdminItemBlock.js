import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ListItemBlockStyled } from './AdminItemBlock.styles';

const AdminItemBlock = ({ title, value, noSpan, isInline }) => {
  return (
    <Fragment>
      <ListItemBlockStyled isInline={isInline}>
        <h2>{title}</h2>
        <p>{value}</p>
      </ListItemBlockStyled>
      {!noSpan && <span />}
    </Fragment>
  );
};

AdminItemBlock.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  noSpan: PropTypes.bool
};

export default AdminItemBlock;
