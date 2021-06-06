import React from 'react';
import { Alert } from 'react-native';

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

import { SocialLoginButton } from '../../components/SocialLoginButton';

import { useAuth } from '../../hooks/auth';

import AppleIcon from '../../assets/apple.svg';
import GoogleIcon from '../../assets/google.svg';
import Logo from '../../assets/logo.svg';

export function Login(): JSX.Element {
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleLoginWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível se conectar com a conta Google');
    }
  }

  async function handleLoginWithApple() {
    try {
      await signInWithApple();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível se conectar com a conta Apple');
    }
  }

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
          <SocialLoginButton
            onPress={handleLoginWithGoogle}
            icon={GoogleIcon}
            title="Entrar com Google"
          />
          <SocialLoginButton
            onPress={handleLoginWithApple}
            icon={AppleIcon}
            title="Entrar com Apple"
          />
        </LoginButtonContainer>
      </Footer>
    </Container>
  );
}
