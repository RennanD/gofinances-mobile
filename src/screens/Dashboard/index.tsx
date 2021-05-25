import React from 'react';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGretting,
  UserName,
  LogoutIcon,
} from './styles';

export function Dashboard(): JSX.Element {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/rennand.png' }} />

            <User>
              <UserGretting>Olá,</UserGretting>
              <UserName>Rennan</UserName>
            </User>
          </UserInfo>
          <LogoutIcon name="power" />
        </UserWrapper>
      </Header>
    </Container>
  );
}
