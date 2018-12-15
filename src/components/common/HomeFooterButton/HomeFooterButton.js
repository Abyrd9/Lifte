import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Icon, AddButton } from './HomeFooterButton.styles';

const HomeFooterButton = () => {
  return (
    <Container>
      <Link to="admin">
        <AddButton>
          <Icon icon="edit" />
        </AddButton>
      </Link>
    </Container>
  );
};

export default HomeFooterButton;
