import React from 'react';

import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  LoginButtonContainer,
} from './styles';

import AppleIcon from '../../assets/apple.svg';
import GoogleIcon from '../../assets/google.svg';
import Logo from '../../assets/logo.svg';
import { SocialLoginButton } from '../../components/SocialLoginButton';

export function Login(): JSX.Element {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {'\n'} finanças de forma {'\n'} muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>Faça seu login com uma das contas abaixo</SignInTitle>
      </Header>

      <Footer>
        <LoginButtonContainer>
          <SocialLoginButton icon={GoogleIcon} title="Entrar com Google" />
          <SocialLoginButton icon={AppleIcon} title="Entrar com Apple" />
        </LoginButtonContainer>
      </Footer>
    </Container>
  );
}
