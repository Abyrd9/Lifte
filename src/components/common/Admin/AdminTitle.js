import React from 'react';
import styled, { css } from 'styled-components';
import { Divider } from '../Layout';

const AdminTitleStyled = styled.h1`
  ${props => {
    const { theme } = props;
    return css`
      ${theme.font(20, 800)};
      color: ${theme.colors.black};
      text-align: center;
    `;
  }}
`;

const AdminTitle = ({ isHalf, title }) => (
  <React.Fragment>
    <AdminTitleStyled>{title}</AdminTitleStyled>
    <Divider isHalf={isHalf} />
  </React.Fragment>
);

export default AdminTitle;
