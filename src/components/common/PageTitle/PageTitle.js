import React from 'react';
import { AdminTitleStyled } from './PageTitle.styles';
import { Divider } from '../LayoutElements';

const AdminTitle = ({ isHalf, title }) => (
  <React.Fragment>
    <AdminTitleStyled>{title}</AdminTitleStyled>
    <Divider isHalf={isHalf} />
  </React.Fragment>
);

export default AdminTitle;
