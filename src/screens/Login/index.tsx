import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components';

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
  const [isConnecting, setIsConnecting] = useState(false);

  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  async function handleLoginWithGoogle() {
    setIsConnecting(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível se conectar com a conta Google');
      console.log(error);
      setIsConnecting(false);
    }
  }

  async function handleLoginWithApple() {
    setIsConnecting(true);
    try {
      await signInWithApple();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível se conectar com a conta Apple');
      setIsConnecting(false);
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
          {Platform.OS === 'ios' && (
            <SocialLoginButton
              onPress={handleLoginWithApple}
              icon={AppleIcon}
              title="Entrar com Apple"
            />
          )}
        </LoginButtonContainer>

        {isConnecting && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}
